let WIN_X = 1200;
let WIN_Y = 600;
let SHAPE_SIZE  = 120; //120;
let SHAPE_THICK = 30;//30;

let WIN_MARGIN  = 5 + SHAPE_SIZE / 2;
let WIN_CENTER_X = (WIN_X / 2);
let WIN_CENTER_Y = (WIN_Y / 2);
let WIN_SIZE_X = ((WIN_X - SHAPE_SIZE) / 2 - WIN_MARGIN);
let WIN_SIZE_Y = ((WIN_Y - SHAPE_SIZE) / 2 - WIN_MARGIN);

var g_col_idx = 0;
var g_angle = 0;


function setup() {
  pixelDensity(1);
  angleMode(DEGREES);
  createCanvas(WIN_X, WIN_Y);
  p = createP();
  background(220);
  init_pal();
  b_cls();
}

function draw() {
  let x, y;
  
  if (g_col_idx >= 255) g_col_idx = 1;
  x = round((sin(g_angle*180/130) * cos((g_angle + 90)*180/200)) * WIN_SIZE_X) + (WIN_CENTER_X);
  y = round((sin(g_angle) * cos((g_angle + 45)*180/84)) * WIN_SIZE_Y) + (WIN_CENTER_Y);
  b_circle_thick(x, y, SHAPE_SIZE, SHAPE_THICK, g_col_idx);
  blit(255 - g_col_idx);
  g_col_idx++;
  g_angle += 1;
  p.html("FPS: " + round(frameRate()));
}