let PALETTES, COLORS, BG;

/* Enable to make a canvas suitable for A2 paper */
const PRINT_MODE = false;

/* Get a random palette or choose a specific one from palettes.json */
const RANDOM_PALETTE = false;
const PALETTE_NAME = "speis";

/* Shape size will be a random number between these bounds */
const MIN_SIZE = size(2);
const MAX_SIZE = size(100);

/* Shape opacity will be selected based on size, scaled to these bounds */
const MIN_OPACITY = 0.1;
const MAX_OPACITY = 1;

/* The shape will be randomly selected from the following object */
/* The random selection is weighted based on the integer values */
/* Example: 1 is a normal amount, 2 is double, 0 would be none of that type */
/* The values are weighed in relation to each other, so 1 2 3 = 2 4 6 */
const SHAPE_WEIGHTS = [
  { type: "CIRCLE", weight: 1 },
  { type: "TRIANGLE", weight: 1 },
  { type: "SQUARE", weight: 1 },
];
const WEIGHTED_SHAPES = [];

/*

  CONFIG END

*/

// Helper function to scale sizes with print mode
function size(original) {
  return PRINT_MODE ? (original * 4960) / 1000 : original;
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
  background(BG);
  noStroke();

  /* Initialize weighted shapes */
  for (let s = 0; s < SHAPE_WEIGHTS.length; s++) {
    const shape = SHAPE_WEIGHTS[s];
    for (let w = 0; w < shape.weight; w++) {
      WEIGHTED_SHAPES.push(shape.type);
    }
  }
}

function draw() {
  /* Select a random size between the given bounds */
  const size = random(MIN_SIZE, MAX_SIZE);

  /* Set color opacity based on the selected of the shape */
  const fillColor = random(COLORS);
  fillColor.setAlpha(1 + MIN_OPACITY - size / MAX_SIZE);
  fill(fillColor);

  drawRandomShape(random(width), random(height), size);
}

function drawRandomShape(x, y, size) {
  /* Move to the given coordinates in order to rotate properly */
  translate(x, y);
  rotate(random(TWO_PI));

  /* Select a shape and draw it */
  const shape = random(WEIGHTED_SHAPES);
  if (shape == "CIRCLE") {
    circle(x, y, size);
  } else if (shape == "SQUARE") {
    square(x, y, size);
  } else if (shape == "TRIANGLE") {
    drawTriangle(x, y, size);
  }
}

/* Draw an equilateral triangle */
function drawTriangle(x, y, size) {
  const x1 = x + (cos((1 * TWO_PI) / 3) * size) / 2;
  const y1 = y + (sin((1 * TWO_PI) / 3) * size) / 2;
  const x2 = x + (cos((2 * TWO_PI) / 3) * size) / 2;
  const y2 = y + (sin((2 * TWO_PI) / 3) * size) / 2;
  const x3 = x + (cos((3 * TWO_PI) / 3) * size) / 2;
  const y3 = y + (sin((3 * TWO_PI) / 3) * size) / 2;
  triangle(x1, y1, x2, y2, x3, y3);
}

function clickOnSave() {
  saveCanvas();
}
