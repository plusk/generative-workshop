let PALETTES, COLORS, BG;

/* Enable to make a canvas suitable for A2 paper */
const PRINT_MODE = false;

/* Get a random palette or choose a specific one from palettes.json */
const RANDOM_PALETTE = false;
const PALETTE_NAME = "stronk";

const STROKE_WEIGHT = size(10);
const DIAMETER = size(300);

/*

  CONFIG END

*/

// Helper function to scale sizes with print mode
function size(original) {
  return PRINT_MODE ? (original * 4960) / 1000 : original;
}

function preload() {
  PALETTES = loadJSON("palettes.json");
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
  //stroke(random(COLORS));
  fill(random(COLORS));
  background(BG);
}

function draw() {
  /* Inspiration can be found here: https://p5js.org/examples/ */
  /* Documentation can be found here: https://p5js.org/reference/*/
  circle(width / 2, height / 2, DIAMETER);
}

function clickOnSave() {
  saveCanvas();
}
