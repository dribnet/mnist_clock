/*
 * us p5.js to draw a clock on a 960x500 canvas
 */ 

/* size of square */
var s = 20

function draw_number(num, x, y) {
  /* this resets any previous translations */
  resetMatrix();
  translate(x, y);
  if (num === 1) {
    rect(s * 3, s * 2, s, s);
    rect(s * 4, s * 1, s, s);
    rect(s * 4, s * 2, s, s);
    rect(s * 4, s * 3, s, s);
    rect(s * 4, s * 4, s, s);
    rect(s * 4, s * 5, s, s);
  }
  else if (num === 2) {
    rect(s * 1, s * 1, s, s);
    rect(s * 2, s * 1, s, s);
    rect(s * 3, s * 1, s, s);
    rect(s * 4, s * 2, s, s);
    rect(s * 4, s * 3, s, s);
    rect(s * 3, s * 3, s, s);
    rect(s * 2, s * 4, s, s);
    rect(s * 1, s * 5, s, s);
    rect(s * 2, s * 5, s, s);
    rect(s * 3, s * 5, s, s);
    rect(s * 4, s * 5, s, s);
  }
  else if (num === 3) {
    rect(s * 1, s * 1, s, s);
    rect(s * 2, s * 1, s, s);
    rect(s * 3, s * 1, s, s);
    rect(s * 4, s * 1, s, s);
    rect(s * 4, s * 2, s, s);
    rect(s * 4, s * 3, s, s);
    rect(s * 3, s * 3, s, s);
    rect(s * 2, s * 3, s, s);
    rect(s * 4, s * 4, s, s);
    rect(s * 4, s * 5, s, s);
    rect(s * 3, s * 5, s, s);
    rect(s * 2, s * 5, s, s);
    rect(s * 1, s * 5, s, s);
  }
}

function draw_clock(hour, minute, second, millis, alarm) {
  background(204);
  draw_number(1, 10, 10);
  draw_number(2, 130, 10);
  draw_number(3, 250, 10);
}
