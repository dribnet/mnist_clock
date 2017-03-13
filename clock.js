/*
 * us p5.js to draw a clock on a 960x500 canvas
 */ 
function draw_clock(hour, minute, second, millis, alarm) {
  background(204);

  background(255,255,200); // My favorite pink
  fill(128,100,100);
  text("Hour: "   + hour, 10, 22);
  text("Minute: " + minute, 10, 42);
  text("Second: " + second, 10, 62);
  text("Millis: " + millis, 10, 82);

  var hourBarWidth   = map(hour, 0, 23, 0, width);
  var minuteBarWidth = map(minute, 0, 59, 0, width);
  var secondBarWidth = map(second, 0, 59, 0, width);
  var millisBarWidth = map(millis, 0, 1000, 0, width);

  // Make a bar which *smoothly* interpolates across 1 minute.
  // We calculate a version that goes from 0...60, 
  // but with a fractional remainder:
  var secondBarWidthChunky  = map(second, 0, 60, 0, width);
  var secondsWithFraction   = second + (millis / 1000.0);
  var secondBarWidthSmooth  = map(secondsWithFraction,   0, 60, 0, width);

  noStroke();
  fill(40);
  rect(0, 100, hourBarWidth, 50);
  fill(80);
  rect(0, 150, minuteBarWidth, 50);
  fill(120)
  rect(0, 200, secondBarWidth, 50);
  fill(160)
  rect(0, 250, millisBarWidth, 50);
  fill(200)
  rect(0, 350, secondBarWidthChunky, 50);
  fill(240)
  rect(0, 400, secondBarWidthSmooth, 50);
}
