/*
 * us p5.js to draw a clock on a 960x500 canvas
 */ 

/* size of square */
var s = 24

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

function digits_from_num(num) {
  digits = []
  if (num < 10) {
    digits.push(0);
  }
  else {
    n1 = Math.floor(num / 10);
    digits.push(n1);
  }
  n2 = Math.floor(num % 10);
  digits.push(n2);
  return digits;
}

function draw_clock(hour, minute, second, millis, alarm) {
  var hour_pos = [20, height/2 - 3.5 * s];

  background(204);
  digits = digits_from_num(hour);
  draw_number(digits[0], hour_pos[0], hour_pos[1]);
  draw_number(digits[1], hour_pos[0] + 1.0 * 5 * s, hour_pos[1]);

  digits = digits_from_num(minute);
  draw_number(digits[0], hour_pos[0] + 2.5 * 5 * s, hour_pos[1]);
  draw_number(digits[1], hour_pos[0] + 3.5 * 5 * s, hour_pos[1]);

  digits = digits_from_num(second);
  draw_number(digits[0], hour_pos[0] + 5.0 * 5 * s, hour_pos[1]);
  draw_number(digits[1], hour_pos[0] + 6.0 * 5 * s, hour_pos[1]);
}
