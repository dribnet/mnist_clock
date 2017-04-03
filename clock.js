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
  [    
    -0.09737270167360451,
    0.5986274878118574,
    -0.4278880038502145,
    -0.38857510848801724,
    -0.4473179041380722,
    0.5438906097266436,
    -0.4201674315262017,
    -0.5268768137397521
  ],
  [
    0.48208519848493225,
    -0.4215702919596129,
    0.15689678014782305,
    0.10196998907086836,
    0.7100806173651516,
    -0.3151531186691279,
    0.18939639201542602,
    -0.6284750268933443
  ],
  [
    0.19900939026533573,
    0.3026281952779707,
    -0.30498481503430647,
    0.7431038587542311,
    -0.3216668045922871,
    -0.1964407165256964,
    0.8372064730968508,
    -0.1646608990000133
  ],
  [
    0.7029272975953468,
    0.06110093566709743,
    0.3916778278047489,
    0.07867443930630548,
    -0.26372889618736883,
    0.3995885960618714,
    -0.11721144445358585,
    0.5559338849589509
  ],
  [
    -0.8874132657471768,
    0.15302366936215686,
    0.637169534055157,
    -0.1924694908274042,
    0.2570928849680335,
    -0.6100119647969781,
    0.3694417288009968,
    0.23163206501586883
  ],
  [
    0.21677451063948475,
    -0.8988553268370365,
    0.17858221012651543,
    -0.5464353964295422,
    -0.14529446601998094,
    0.5069969478951437,
    0.026063310696437757,
    0.0541602023718525
  ],
  [
    0.1540965614716258,
    0.2222720562132366,
    0.3552340718520449,
    -0.8281517835266454,
    -0.29588947910471136,
    -0.5488589067772693,
    0.3209337238167958,
    -0.28406811625593337
  ],
  [
    -0.004918133894249873,
    -0.4914464861512043,
    0.10555535536114423,
    0.9058167338462783,
    -0.06592620804890158,
    0.3488998754186003,
    -0.7596334734606238,
    -0.24294942191219202
  ],
  [
    -0.026785210452841535,
    0.24926487728533545,
    -0.2920063389003027,
    -0.13315000004284647,
    0.4545883262521254,
    0.3707611935429487,
    0.1280817233512236,
    0.253320920333817
  ],
  [
    -0.47825139221944213,
    0.057617403162805364,
    -0.20383606071894725,
    -0.186867837758488,
    0.4611357845409811,
    0.025850590648261042,
    -0.7840709234840955,
    -0.05286096452832721
  ]
];

var concept_vecs_mean = [
  [
    -0.15575783166683693,
    0.6715468615202949,
    -0.2703317873614627,
    -0.3798132954149395,
    -0.7575329040711412,
    0.45534726617613613,
    -0.2537297127554611,
    -0.33736644228332086
  ],
  [
    0.5274477160162312,
    -0.3560755940137533,
    0.23627669067644863,
    0.15614054380398978,
    0.7330468260768396,
    -0.29052659791010105,
    0.2152022640990442,
    -0.5711892142778376
  ],
  [
    0.4444602574690076,
    0.3688747151054527,
    -0.2748966499189337,
    0.7402129792045562,
    -0.32900858648470266,
    -0.22502250750298985,
    0.7282471908111052,
    -0.013091004830741658
  ],
  [
    0.8152854064151499,
    -0.015388612275810995,
    -0.014355099469755536,
    0.02106383030829312,
    -0.27756899983466937,
    0.3330231248362203,
    0.028544900716433147,
    0.5959242085620524
  ],
  [
    -1.1490817270268086,
    0.12570799478714395,
    0.20639211160521773,
    -0.16028461138228953,
    0.28965906529613206,
    -0.5780396402984582,
    0.01214517061020609,
    0.24421330861215274
  ],
  [
    0.12252270171343152,
    -0.7904128594794092,
    0.15231740475937192,
    -0.5846666994366029,
    -0.1858538879493709,
    0.5389232889504229,
    0.31975334662439414,
    0.18751565855333815
  ],
  [
    0.10493579832079314,
    0.1423753723728598,
    0.10680704404010231,
    -0.8653863024620805,
    -0.4430244558183576,
    -0.5641604869747479,
    0.2813091634300249,
    -0.2690744101986417
  ],
  [
    -0.08426115368091514,
    -0.3716632920584483,
    0.04393677232270633,
    0.9644920782151004,
    0.1119422881402877,
    0.17149032613350007,
    -0.8279120106515887,
    -0.17477783022760712
  ],
  [
    0.002853304103824006,
    0.2484543568482835,
    -0.12367715528799374,
    -0.13412030979227618,
    0.369189544717203,
    0.4203718818316839,
    0.17228688139747017,
    0.3909215561579514
  ],
  [
    -0.7174249242808994,
    -0.01867623192794978,
    -0.078239553877598,
    0.12056024370784138,
    0.39656447700277037,
    -0.20520236232535408,
    -0.6352531658483698,
    0.02770098866583029
  ]
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
  var hour_pos = [70, height/2 - 2 * s];
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
  background(0);

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

    if(millis > 900) {
      second_fraction_ones = (millis-900) / 100.0;
    }
    else {
      second_fraction_ones = 0;
    }
    // draw the 1 second position
    curConceptVecs[5] = get_cur_concept_vec(second_fraction_ones, digits1[1], digits2[1]);
    firePrediction();
  }

/*
  for(var d=0;d<6;d++) {
    if(pendingOutput[d] != null) {
      var curOutput = pendingOutput[d];
      var curPos = pendingPos[d];
      pendingOutput[d] = null;

      curModelImages[d].loadPixels();
      for (var i = 0; i < 27; i++) {
        for (var j = 0; j < 27; j++) {
          var val = (255 * curOutput[j*27 + i]);
          if(val == null || curModelImages[d] == null) {
            print("Found error at " + d + ":" + val +"," + curModelImages[d]);
          }
          else {
            // print(val, curOutput);
            curModelImages[d].set(i*2, j*2, color(val));
            curModelImages[d].set(i*2+1, j*2, color(val));
            curModelImages[d].set(i*2, j*2+1, color(val));
            curModelImages[d].set(i*2+1, j*2+1, color(val));
          }
        }
      }
      curModelImages[d].updatePixels();
    }
    if(curModelImages[d] != null && pendingPos[d] != null) {
      image(curModelImages[d], pendingPos[d][0], pendingPos[d][1]);
    }
  }
*/
}
