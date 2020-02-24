var inc = 0.1;
var scl = 20;
var cols;
var rows;
var zoff = 0;
var particleObject = 2000;
var particles = [];
var flowField;

var serial; // variable to hold an instance of the serialport library
var portName = "/dev/tty.usbmodem14201"; // fill in your serial port name here
var inData; // variable to hold the input data from Arduino
var outData = 0; // variable to hold the output data to Arduino

let slider;
let val;
let lowEnd;
let highEnd;

let actualVal;
function setup() {
  lowEnd = random(0, 200);
  highEnd = random(300, 1000);
  let randsliderval = random(300, 1000);
  slider = createSlider(0, 1000, 500);
  slider.position(10, 10);
  slider.style("width", "80px");
  var cnv = createCanvas(windowWidth, windowHeight);

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  //set up communication port
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing
  background(0, 0, 0, 100);
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  cnv.position(x, 0);

  noStroke();
  colorMode(HSB, 100);

  cols = floor(width / scl);
  rows = floor(height / scl);

  flowField = new Array(cols * rows);

  for (var i = 0; i < particleObject; i++) {
    particles[i] = new Particle(random(0, 2));
  }
}
let time = 0;
function draw() {
  val = slider.value();
  actualVal = map(val, lowEnd, highEnd, 0, 1000, true);
  // console.log("ends:" + lowEnd + " " + highEnd);
  // console.log(actualVal);

  background(50, 237, 244, 0.1);
  // background(232, 237, 244, 20);
  // fill(100, 45, 67, inData / 10);
  // push();
  // serial.readStringUntil("/n");
  // push();
  // ellipse(width / 2, height / 2, inData * 1.5, inData * 1.5);
  // pop();

  // console.log(val);
  time++;

  if (time > windowWidth) {
    time = 0;
  }

  // background(color("rgba(232, 237, 244, .01)"));
  // background(color("rgba(232, 237, 244)"));
  beginShape();

  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      // var angle = noise(xoff, yoff, zoff) * TWO_PI;
      // var angle = 1000 / (noise(xoff, yoff, zoff) * inData);
      var angle = 1000 / (noise(xoff, yoff, zoff) * actualVal);
      // var angle = noise(xoff, yoff, zoff) * (actualVal / 100);
      var v = p5.Vector.fromAngle(angle);
      // v.setMag(1);
      v.setMag(1);
      flowField[index] = v; //store all of the vectors calculated into flow field
      //push();
      //translate(x*scl,y*scl)
      //rotate(angle);
      //strokeWeight(1);
      //stroke(0,5);
      //line(0,0,scl,0);
      //pop();
      xoff += inc;
    }
    yoff += inc;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowField);
    particles[i].edges();
    particles[i].show();
    particles[i].update();
  }
  fill(255);
  rect(0, 0, 200, 200);
  fill(0);
  text(frameRate(), 50, 50);
}

function Particle(randVal) {
  this.colorRand = randVal;
  this.pos = createVector(random(width), random(height));
  // this.pos = createVector(random(mouseX), random(mouseY));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = randVal;
  this.c;
  if (randVal < 1) {
    this.c = color(20, 0, 255, 5);
  } else {
    this.c = color(0, 0, 0, 5);
  }
  // this.maxspeed = inData / 10000;
  this.prePos = this.pos.copy();
  this.update = function() {
    this.vel.add(this.acc);
    // this.vel.limit(inData / 5);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    // this.pos.add(this.vel + inData / 100);
    // this.pos.add(actualVal / 100);
    this.acc.mult(0);
    // if (mouseIsPressed) {
    //   this.vel.sub(this.acc / 1.2);
    //   this.pos.sub(this.vel / 1.2);
    //   this.maxspeed = actualVal / 50;
    // }
  };
  this.applyForce = function(force) {
    this.acc.add(force);
    // this.acc.add(actualVal / 10);
  };
  this.show = function() {
    // c = color("rgba(132, 164, 246, 1)");
    // fill();

    // console.log("rand val for color: " + this.colorRand);
    // stroke(200, 90, actualVal / 100);
    // fill(actualVal / 10, 20, 20);
    // fill(200, 55, 30);
    fill(this.c);

    // stroke(50, 200, actualVal / 100);
    // strokeWeight(3);
    // fill(0);
    if (this.colorRand < 1) {
      rotate(this.colorRand * 10);
      rect(
        this.pos.x,
        this.pos.y,
        actualVal / map(this.colorRand, 0, 3, 10, 70),
        actualVal / map(this.colorRand, 0, 3, 10, 70)
      );
    } else {
      ellipse(
        this.pos.x,
        this.pos.y,
        actualVal / map(this.colorRand, 0, 3, 10, 70),
        actualVal / map(this.colorRand, 0, 3, 10, 70)
      );
    }

    // line(this.pos.x, this.pos.y, this.prePos.x, this.prePos.y);
    this.updatePrev();
  };
  this.updatePrev = function() {
    this.prePos.x = this.pos.x;
    this.prePos.y = this.pos.y;
  };
  this.edges = function() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
  };
  this.follow = function(vectors) {
    var x = floor(this.pos.x / scl); //position in relationship to scale "vector" unit or grid"
    var y = floor(this.pos.y / scl);
    // console.log(x);

    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  };
  // pop();

  // text("BRIGHTNESS LEVEL: " + inData, 30, 50); // displaying the input

  //
  // outData = rightBrightness;
  // serial.write(outData);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// --white: #f5f8fc;
// --red: #d2290a;
// --light-blue: #c0d1fc;
// --medium-blue: #84a4f6;
// --dark-blue: #304fa1;
// --darker-blue: #283e82;
// --light-gray: #dadfe8;
// --medium-gray: #9dacca;
// --dark-gray: #111e47;

/*
References for these codes:
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print("connected to server.");
}

function portOpen() {
  print("the serial port opened.");
}

function serialEvent() {
  // inData = Number(serial.read());
  inData = serial.readStringUntil("\n");
  // inData = serial.readString();
}

function serialError(err) {
  print("Something went wrong with the serial port. " + err);
}

function portClose() {
  print("The serial port closed.");
}
