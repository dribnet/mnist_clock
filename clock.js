/*
 * us p5.js to draw a clock on a 960x500 canvas
 */ 

// in browser, URLs can be relative or absolute
const model = new KerasJS.Model({
  filepaths: {
    model: 'mnist_06_110_decoder.json',
    weights: 'mnist_06_decoder_weights_weights.buf',
    metadata: 'mnist_06_decoder_weights_metadata.json'
  },
  gpu: true
})

var concept_vecs = [
  [-0.097372,  0.598627, -0.427888, -0.388575, -0.447317,  0.543890, -0.420167, -0.526876],
  [ 0.482085, -0.421570,  0.156896,  0.101969,  0.710080, -0.315153,  0.189396, -0.628475],
  [ 0.199009,  0.302628, -0.304984,  0.743103, -0.321666, -0.196440,  0.837206, -0.164660],
  [ 0.702927,  0.061100,  0.391677,  0.078674, -0.263728,  0.399588, -0.117211,  0.555933],
  [-0.887413,  0.153023,  0.637169, -0.192469,  0.257092, -0.610011,  0.369441,  0.231632],
  [ 0.216774, -0.898855,  0.178582, -0.546435, -0.145294,  0.506996,  0.026063,  0.054160],
  [ 0.154096,  0.222272,  0.355234, -0.828151, -0.295889, -0.548858,  0.320933, -0.284068],
  [-0.004918, -0.491446,  0.105555,  0.905816, -0.065926,  0.348899, -0.759633, -0.242949],
  [-0.026785,  0.249264, -0.292006, -0.133150,  0.454588,  0.370761,  0.128081,  0.253320],
  [-0.478251,  0.057617, -0.203836, -0.186867,  0.461135,  0.025850, -0.784070, -0.052860]
];

var curAnchor = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
var curDAnchor = [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6];

var curModelImages = [null, null, null, null, null, null];
var curConceptVecs = [null, null, null, null, null, null];
var digitPositions = [null, null, null, null, null, null];

var MODEL_LOADING = 0;
var MODEL_READY = 1;
var MODEL_LOAD_ERROR = 2;
var MODEL_WORKING = 3;
var modelStatus = MODEL_LOADING;

function local_setup() {
  model.ready()
    .then(() => {
      print("Model says it is ready")
      modelStatus = MODEL_READY;
      // redraw();
    })
    .catch(err => {
      // handle error
      print("Model says LOAD_ERROR")
      modelStatus = MODEL_LOAD_ERROR;
      // redraw();
    })

  for(var i=0; i<6; i++) {
    curModelImages[i] = createImage(56, 56);
  }
  for(var i=0; i<8; i++) {
    curDAnchor[i] = random(0.01, 0.05);
  }

  var s = 24;
  var hour_pos = [80, height/2 - 2 * s];
  digitPositions[0] = [hour_pos[0] + 0.0 * 5 * s, hour_pos[1]];
  digitPositions[1] = [hour_pos[0] + 1.0 * 5 * s, hour_pos[1]];
  digitPositions[2] = [hour_pos[0] + 2.5 * 5 * s, hour_pos[1]];
  digitPositions[3] = [hour_pos[0] + 3.5 * 5 * s, hour_pos[1]];
  digitPositions[4] = [hour_pos[0] + 5.0 * 5 * s, hour_pos[1]];
  digitPositions[5] = [hour_pos[0] + 6.0 * 5 * s, hour_pos[1]];
}

function move_anchor() {
  for(var i=0; i<8; i++) {
    var next = curAnchor[i] + curDAnchor[i];
    if(next > 0.5) {
      curDAnchor[i] = random(-0.01, -0.03);
      next = curAnchor[i] + curDAnchor[i];
    }
    else if(next < -0.5) {
      curDAnchor[i] = random(0.01, 0.03);
      next = curAnchor[i] + curDAnchor[i];
    }
    curAnchor[i] = next;
  }
  // print(curAnchor);
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

function interp_vec(frac, v1, v2) {
  var v = new Array(8);
  for(var i=0; i<8; i++) {
    v[i] = lerp(v1[i], v2[i], frac)
  }
  return v;
}

function add_vec(v1, v2) {
  var v = new Array(8);
  for(var i=0; i<8; i++) {
    v[i] = v1[i] + v2[i];
  }
  return v;  
}

// numbers waiting to be drawn
var pendingOutput = [null, null, null, null, null, null];
var digit_in_flight = false;

function firePrediction() {
  var predict_map = [];
  for(var i=0; i<6; i++) {
    predict_map.push({ input_1: curConceptVecs[i] })
  }
  modelStatus = MODEL_WORKING;
  Promise.mapSeries(curConceptVecs, arr => model.predict({ input_1: arr }))
  .then(outputs => {
    for(var i=0; i<6; i++) {
      pendingOutput[i] = outputs[i]['convolution2d_5']
    }
    modelStatus = MODEL_READY;
  })

  // const inputData = { input_1: new Float32Array(v_sum) };
  // model.predict(inputData).then(outputData => {
  //   pendingOutput[ix] = outputData['convolution2d_5'];
  //   digit_in_flight[ix] = false;
  // });
}

function get_cur_concept_vec(frac, num1, num2) {
  var v1 = concept_vecs[num1];
  var v2 = concept_vecs[num2];
  var v_interp = interp_vec(frac, v1, v2);
  var v_sum = add_vec(curAnchor, v_interp);
  return new Float32Array(v_sum);
}

var first_time = true;

function draw_clock(hour, minute, second, millis, alarm) {
  if(first_time) {
    local_setup();
    first_time = false;
    background(0);
  }

  move_anchor();

  // is alarm going off?
  /*
  if (alarm == 0) {
    if (second % 2 == 0) {
      background(0,0,100);      
    }
    else {
      background(100,100,0);      
    }
  }
  else {
    background(0);
  }
  */
  // background(0);
  blendMode(BLEND);
  fill(0, 0, 0, 96);
  rect(0, height/3, width, 2*height/3);
  blendMode(ADD);

  // draw what digits we have
  var one_was_pending = false;
  for(var d=0;d<6;d++) {
    if(pendingOutput[d] != null) {
      one_was_pending = true;
      var curOutput = pendingOutput[d];
      pendingOutput[d] = null;

      curModelImages[d].loadPixels();
      for (var i = 0; i < 27; i++) {
        for (var j = 0; j < 27; j++) {
          var val = (255 * curOutput[j*27 + i]);
          if(val == null || curModelImages[d] == null) {
            print("Found error at " + d + ":" + val +"," + curModelImages[d]);
          }
          else {
            // print(val);
            var c = color(val);
            curModelImages[d].set(i*2, j*2, c);
            curModelImages[d].set(i*2+1, j*2, c);
            curModelImages[d].set(i*2, j*2+1, c);
            curModelImages[d].set(i*2+1, j*2+1, c);
          }
        }
      }
      curModelImages[d].updatePixels();
    }
    if(curModelImages[d] != null) {
      image(curModelImages[d], digitPositions[d][0], digitPositions[d][1]);
    }
  }
  if(digit_in_flight && modelStatus == MODEL_READY && !one_was_pending) {
    digit_in_flight = false;
  }

  // see if we should compute a new set of digits
  if(modelStatus == MODEL_READY && digit_in_flight == false) {
    digit_in_flight = true;
    var precise_s = second + millis / 1000.0;
    print(hour, minute, precise_s);

    // HOURS
    next_hour = (hour + 1) % 24;
    digits1 = digits_from_num(hour);
    digits2 = digits_from_num(next_hour);
    if(second >= 50 && minute == 59 && 
        (hour == 9 || hour == 19 || hour == 23)) {
      // minute_fraction_tens = millis  / 1000.0;
      seconds_left = (second - 50) + millis / 1000.0;
      hour_fraction_tens = seconds_left  / 10.0;
    }
    else {
      hour_fraction_tens = 0;
    }
    curConceptVecs[0] = get_cur_concept_vec(hour_fraction_tens, digits1[0], digits2[0]);

    if(second >= 55 && minute == 59) {
      // minute_fraction_tens = millis  / 1000.0;
      seconds_left = (second - 55) + millis / 1000.0;
      hour_fraction_ones = seconds_left  / 5.0;
    }
    else {
      hour_fraction_ones = 0;
    }
    curConceptVecs[1] = get_cur_concept_vec(hour_fraction_ones, digits1[1], digits2[1]);

    // MINUTES
    next_minute = (minute + 1) % 60;
    digits1 = digits_from_num(minute);
    digits2 = digits_from_num(next_minute);
    if(second >= 58 && digits1[1] === 9) {
      // minute_fraction_tens = millis  / 1000.0;
      seconds_left = (second - 58) + millis / 1000.0;
      minute_fraction_tens = seconds_left  / 2.0;
    }
    else {
      minute_fraction_tens = 0;
    }
    curConceptVecs[2] = get_cur_concept_vec(minute_fraction_tens, digits1[0], digits2[0]);


    if(second === 59) {
      minute_fraction_ones = millis  / 1000.0;
    }
    else {
      minute_fraction_ones = 0;
    }
    curConceptVecs[3] = get_cur_concept_vec(minute_fraction_ones, digits1[1], digits2[1]);

    // SECONDS
    next_second = (second + 1) % 60;
    second_fraction = millis / 1000.0;
    digits1 = digits_from_num(second);
    digits2 = digits_from_num(next_second);


    if(digits1[1] === 9 && millis > 500) {
      second_fraction_tens = (millis - 500) / 500.0;
    }
    else {
      second_fraction_tens = 0;
    }
    // draw the 10 second position
    curConceptVecs[4] = get_cur_concept_vec(second_fraction_tens, digits1[0], digits2[0]);

    if(millis > 750) {
      second_fraction_ones = (millis-750) / 250.0;
    }
    else {
      second_fraction_ones = 0;
    }
    // draw the 1 second position
    curConceptVecs[5] = get_cur_concept_vec(second_fraction_ones, digits1[1], digits2[1]);
    firePrediction();
  }
}
