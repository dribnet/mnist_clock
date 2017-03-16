/*
 * us p5.js to draw a clock on a 960x500 canvas
 */ 

/* size of square */
var s = 30

var numbers = [
  // 0
  [
    [2, 1],
    [3, 1],
    [1, 2],
    [4, 2],
    [1, 3],
    [4, 3],
    [1, 4],
    [4, 4],
    [2, 5],
    [3, 5],
  ],
  // 1
  [
    [2, 2],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [3, 5]
  ],
  // 2
  [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 2],
    [4, 3],
    [3, 3],
    [2, 4],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5]
  ],
  [ // 3
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 2],
    [3, 3],
    [2, 3],
    [4, 4],
    [3, 5],
    [2, 5],
    [1, 5]
  ],
  [ // 4
    [1, 1],
    [3, 1],
    [1, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [3, 4],
    [3, 5]
  ],
  [ // 5
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 4],
    [3, 5],
    [2, 5],
    [1, 5]
  ],
  [ // 6
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [1, 3],
    [2, 3],
    [3, 3],
    [1, 4],
    [4, 4],
    [2, 5],
    [3, 5],
  ], //7
  [
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
    [4, 2],
    [3, 3],
    [3, 4],
    [3, 5],
  ],
  [ // 8
    [2, 1],
    [3, 1],
    [1, 2],
    [4, 2],
    [2, 3],
    [3, 3],
    [1, 4],
    [4, 4],
    [2, 5],
    [3, 5],
  ],
  [ // 9
    [2, 1],
    [3, 1],
    [4, 1],
    [1, 2],
    [4, 2],
    [2, 3],
    [3, 3],
    [4, 3],
    [4, 4],
    [4, 5]
  ],
]

function draw_number(num, x, y) {
  /* this resets any previous translations */
  resetMatrix();
  translate(x, y);
  var pixels = numbers[num%numbers.length];
  for(var i=0; i<13; i++) {
    var cur_pixel = pixels[i%pixels.length];
    rect(cur_pixel[0] * s, cur_pixel[1] * s, s, s);
  }
}

function draw_clock(hour, minute, second, millis, alarm) {
  background(204);
  draw_number(0, 10, 10);
  draw_number(1, 10 + 6 * s, 10);
  draw_number(2, 10 + 12 * s, 10);
  draw_number(3, 10 + 18 * s, 10);
  draw_number(4, 10 + 24 * s, 10);

  draw_number(5, 10, 10 + 7 * s);
  draw_number(6, 10 + 6 * s, 10 + 7 * s);
  draw_number(7, 10 + 12 * s, 10 + 7 * s);
  draw_number(8, 10 + 18 * s, 10 + 7 * s);
  draw_number(9, 10 + 24 * s, 10 + 7 * s);
}
