let PALETTES, COLORS, STROKE, BG;

/* Enable to make a canvas suitable for A2 paper */
const PRINT_MODE = false;

/* Get a random palette or choose a specific one from palettes.json */
const RANDOM_PALETTE = false;
const PALETTE_NAME = "symmeblu";

const STROKE_WEIGHT = size(2);
const OPACITY = 1;

/* The amount of walkers that will be actively drawing each frame */
/* Reducing increases performance, while increasing will fill in faster */
const WALKER_COUNT = 500;

/* The smoothness of the noise, makes a big difference */
/* Lower values result in more gradual angle adjustments, a bit like zooming in */
/* Higher values will lead to often more jagged lines, walkers gathering up more */
const NOISE_ZOOM = inverseSize(0.0015);

/* Disabling means every walker will have its own color */
/* Enable to color the walkers based on their location / angle */
/* Matching the stroke noise with the noise zoom make them mostly aligned */
/* However, making the noise zooms slightly different offer more layered textures */
const NOISED_STROKE = true;
const STROKE_NOISE_ZOOM = inverseSize(0.015);

/* The amount of steps a walker will take before being respawned */
/* Longer steps will often lead to being able to gather more */
/* Shorter steps will give a rougher or more hairy texture */
/* A wider range also means more random respawns, and a more textured look */
const MIN_STEPS = 50;
const MAX_STEPS = 100;
/* Shorter steps make smoother lines, while longer ones may be more jagged */
const STEP_SIZE = STROKE_WEIGHT + 1;

/* Enable to clip the flow field by adding a big circle on it */
/* Disabling reveals the flow field of the full canvas */
const CLIP_CONTENT = true;
const CLIP_RADIUS = size(300);

/* Enable to round angles to their nearest ANGLE_STEP */
/* This effectively divides the flow field into angles based */
const ROUNDED_ANGLES = false;
const ANGLE_STEP = Math.PI / 2;

/* Noise will naturally lean towards an angle */
/* Enable this to vary where the angle is, or disable and specify your own */
const RANDOM_ANGLE_BIAS = true;
let ANGLE_BIAS = Math.PI / 2;

/* Enable for adding "erasers" that draw more background on the noise */
/* Disabling or reducing will likely lead to a less textured result*/
const ERASERS_ENABLED = true;
const ERASER_SPAWN_CHANCE = 0.5;

/* Instead of lines, draw strings of dots */
/* Works well with very high step sizes */
const DOT_LINES = false;

/*

  CONFIG END

*/

const ACTIVE_WALKERS = [];

// Helper function to scale sizes with print mode
function size(original) {
  return PRINT_MODE ? (original * 4960) / 1000 : original;
}

function inverseSize(original) {
  return PRINT_MODE ? (original / 4960) * 1000 : original;
}

function preload() {
  PALETTES = loadJSON("/palettes.json");
}

function setup() {
  const cnv = PRINT_MODE ? createCanvas(4960, 7016) : createCanvas(1000, 1000);
  cnv.mouseClicked(clickOnSave);
  pixelDensity(1);

  /* Get colors from the palettes */
  const PALETTE_KEYS = Object.keys(PALETTES);
  const RANDOM_PALETTE_NAME =
    PALETTE_KEYS[(PALETTE_KEYS.length * Math.random()) << 0];
  const PALETTE = !RANDOM_PALETTE
    ? PALETTES[PALETTE_NAME]
    : PALETTES[RANDOM_PALETTE_NAME];
  if (RANDOM_PALETTE) {
    console.log("Palette name: ", RANDOM_PALETTE_NAME);
  }

  colorMode(HSL);
  COLORS = PALETTE["colors"].map((col) => color(col));
  BG = color(PALETTE.bg);

  /* Sketch-specific setup */
  strokeWeight(STROKE_WEIGHT);
  STROKE = random(COLORS);
  background(BG);

  for (let c = 0; c < COLORS.length; c++) {
    COLORS[c].setAlpha(OPACITY);
  }

  /* Randomize the order of the colors so they equate to different angles each run */
  for (let i = COLORS.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [COLORS[i], COLORS[j]] = [COLORS[j], COLORS[i]];
  }

  /* Not really meant for configration as it is real confusing */
  /* Determines the amount of noise layers and their effect on the final field */
  noiseDetail(3, 0.75);

  if (RANDOM_ANGLE_BIAS) ANGLE_BIAS = random(TWO_PI);

  /* Intiialize all walkers into the ACTIVE_WALKER list */
  for (let i = 0; i < WALKER_COUNT; i++) {
    respawnWalker(i);
  }
}

function draw() {
  /* Iterate through all walkers */
  for (let i = 0; i < WALKER_COUNT; i++) {
    /* If on the first frame, initialize all walkers (happens only once) */
    const walker = ACTIVE_WALKERS[i];

    /* If the walker has met the end of its lifespawn, respawn it */
    /* If not, have the walker take another step */
    if (walker.steps > walker.step_cap) {
      respawnWalker(i);
    } else {
      /* Determine angle based on noise at its current point in the field */
      let a = noise(walker.x * NOISE_ZOOM, walker.y * NOISE_ZOOM) * TWO_PI;

      if (ROUNDED_ANGLES) a = round(a / ANGLE_STEP) * ANGLE_STEP;

      /* Effectively rotate the canvas to the angle bias */
      a += PI + ANGLE_BIAS;

      stroke(walker.color);
      const x2 = walker.x + STEP_SIZE * cos(a);
      const y2 = walker.y + STEP_SIZE * sin(a);

      /* Draw a line from the old to the new point, signifying a step */
      if (DOT_LINES) point(walker.x, walker.y);
      else line(walker.x, walker.y, x2, y2);
      walker.steps++;

      /* Update the walker coordinates */
      walker.x = x2;
      walker.y = y2;

      /* A dumb amount of code that basically says one single thing: */
      /* If the walker hits an edge, loop to the other side of the screen */
      if (!CLIP_CONTENT) {
        if (walker.x > width) walker.x = 0 - STEP_SIZE;
        if (walker.x < 0) walker.x = width + STEP_SIZE;
        if (walker.y > height) walker.y = 0 - STEP_SIZE;
        if (walker.y < 0) walker.y = height + STEP_SIZE;
      } else {
        /* Constraint start and end of screen to be the clipped field */
        const xStart = width / 2 - CLIP_RADIUS;
        const xEnd = width / 2 + CLIP_RADIUS;
        const yStart = height / 2 - CLIP_RADIUS;
        const yEnd = height / 2 + CLIP_RADIUS;

        /* Walkers can get stuck, so hide them just out of view */
        if (walker.x > xEnd) walker.x = xStart - STEP_SIZE;
        if (walker.x < xStart) walker.x = xEnd + STEP_SIZE;
        if (walker.y > yEnd) walker.y = yStart - STEP_SIZE;
        if (walker.y < yStart) walker.y = yEnd + STEP_SIZE;
      }
    }
  }
  /* After all walkers have been drawn for the frame, add a clipping circle if desired */
  if (CLIP_CONTENT) drawClipCircle();
}

/* Set new coordinates, a random amount of steps, and a color for the walker */
function respawnWalker(i) {
  let x = CLIP_CONTENT
    ? random(width / 2 - CLIP_RADIUS, width / 2 + CLIP_RADIUS)
    : random(0, width);
  let y = CLIP_CONTENT
    ? random(height / 2 - CLIP_RADIUS, height / 2 + CLIP_RADIUS)
    : random(0, height);

  ACTIVE_WALKERS[i] = {
    x: x,
    y: y,
    steps: 0,
    step_cap: random(MIN_STEPS, MAX_STEPS),
    color: selectWalkerColor(x, y),
  };
}

/* Set the color of a walker based on their location, or just randomly */
function selectWalkerColor(x, y) {
  /* If erasers are enabled, determine if the walker will become an eraser */
  if (ERASERS_ENABLED && random() < ERASER_SPAWN_CHANCE) {
    return BG;
  }
  if (NOISED_STROKE) {
    /* Set walker color based on the noise value at its coordinates, meaning the angle */
    const colorNoise = noise(x * STROKE_NOISE_ZOOM, y * STROKE_NOISE_ZOOM);

    /* Limit the color selection to the size of the given palette */
    const maxIndex = COLORS.length - 1;
    let noisedIndex = round(colorNoise * maxIndex);
    if (noisedIndex > maxIndex) {
      noisedIndex = maxIndex;
    }
    return COLORS[noisedIndex];
  } else {
    return random(COLORS);
  }
}

function drawClipCircle() {
  /* Stroke grows in both directions, leading to some wonky diameter calculation */
  const CLIP_STROKE = width + CLIP_RADIUS * 2;
  const CLIP_DIAMETER = CLIP_STROKE + CLIP_RADIUS * 2;

  /* Make the circle content transparent so the flow field is visible through the clip */
  noFill();

  /* Set stroke, draw circle, and reset the stroke weight back to normal */
  stroke(BG);
  strokeWeight(CLIP_STROKE);
  circle(width / 2, height / 2, CLIP_DIAMETER);
  strokeWeight(STROKE_WEIGHT);
}

function clickOnSave() {
  saveCanvas();
}
