var pal = [];
var buf = [];

function b_plot(x, y, c) {
  if ((x >= 0) && (y >= 0) && (x < WIN_X) && (y < WIN_Y))
    buf[round(x) + round(y) * WIN_X] = c;
}

function b_cls() {
  for (let i = 0; i < WIN_X*WIN_Y; i++) {
    buf[i] = 0;
  }
}

function b_test() {
  for (let x = 0; x < WIN_X; x++) {
    for (let y = 0; y < WIN_Y; y++) {
      b_plot(x, y, (x + y) % 256);
    }
  }
}


function b_circle(x, y, radius, c)
{
  let a, b;
  for (let angle = 0; angle < 45; angle += 0.3)
    {
      a = radius * cos(angle);
      b = radius * sin(angle);
      
      b_plot(x + a, y + b, c);
      b_plot(x - a, y + b, c);
      b_plot(x + a, y - b, c);
      b_plot(x - a, y - b, c);

      b_plot(x + b, y + a, c);
      b_plot(x - b, y + a, c);
      b_plot(x + b, y - a, c);
      b_plot(x - b, y - a, c);

    }
}

function b_circle_thick(x, y, radius, thickness, col)
{
  for (let i = 0; i < thickness; i += 1)
    {
      b_circle(x, y, radius - i, col);
    }
}


function init_pal() {
  for (let i = 0; i < 32; i++)
    {
      //   0 blue   (  0,  0,255) --> purple (255,  0,255)  31
      //  32 purple (255,  0,255) --> red    (255,  0,  0)  63
      //  64 red    (255,  0,  0) --> orange (255,128,  0)  95
      //  96 orange (255,128,  0) --> yellow (255,255,  0) 127
      // 128 yellow (255,255,  0) --> white  (255,255,255) 159
      // 160 white  (255,255,255) --> lime   (  0,255,  0) 191
      // 192 lime   (  0,255,  0) --> blue sky (0,255,255) 223
      // 224 blue sky (0,255,255) --> blue   (  0,  0,255) 255

      pal[i]       = color(i * 8, 0, 255);
      pal[i +  32] = color(255, 0, 255 - (i * 8));
      pal[i +  64] = color(255, i * 4, 0);
      pal[i +  96] = color(255, 128 + i * 4, 0);
      pal[i + 128] = color(255, 255, i * 8);
      pal[i + 160] = color(255-(i * 8), 255, 255 - (i * 8));
      pal[i + 192] = color(0, 255, i * 8);
      pal[i + 224] = color(0, 255 - (i * 8), 255);
    
    }

  // black
  
  pal[0] = color(0, 0, 0);
}

function blit(deca) {
  loadPixels();
  for (let i = 0; i < (WIN_X * WIN_Y); i++) {
    let addr, col_idx, col;
    
    col_idx = buf[i];
    if (col_idx > 0) {
      col = pal[1 + ((col_idx + deca) % 255)].levels;
    }
    else {
      col = pal[0].levels;
    }
    addr = i * 4;
    pixels[addr + 0] = col[0];
    pixels[addr + 1] = col[1];
    pixels[addr + 2] = col[2];
  }
  updatePixels();
}
