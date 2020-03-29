var serial; // variable to hold an instance of the serialport library
var portName = "/dev/tty.usbmodem14201"; // fill in your serial port name here
var inData; // variable to hold the input data from Arduino
var outData = 0; // variable to hold the output data to Arduino

let actualVal;

let setLimitButton;

function setup() {
  colorMode(HSB, 100);
  lowEnd = 10;
  highEnd = 200;
  let randsliderval = random(300, 1000);
  slider = createSlider(0, 1000, 500);
  slider.position(10, 10);
  slider.style("width", "80px");
  var cnv = createCanvas(windowWidth, windowHeight);

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  // blendMode(DIFFERENCE);
  //set up communication port
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing
  // background(0, 0, 0, 100);
  // background(255, 255, 255, 100);
  background(214, 5, 96, 100);
  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  cnv.position(x, 0);

  noStroke();

  setLimitButton = createButton("Set Value");
  setLimitButton.position(19, 19);
  setLimitButton.mousePressed(setLimits);
}
let highSet = false;
let lowSet = false;
function setLimits() {
  if (lowSet == false) {
    lowEnd = inData;
    console.log("lowEnd: " + lowEnd);
    lowSet = true;
  } else if (highSet == false) {
    highEnd = inData;
    console.log("highEnd: " + highEnd);
    highSet = true;
  }
}
let time = 0;

let cellSize = 50;
let cellCount = 100;

let xoff = 0.0;
let xincrement = 10;
let yoff = 1;
let yincrement = 80;

function draw() {
  fill(10, 23, 120, 2);
  // background(255);
  rect(0, 0, windowWidth, windowHeight);
  // translate(windowWidth / 2, windowHeight / 2);

  if (highSet && lowSet == true) {
    // val = slider.value();

    actualVal = map(inData, lowEnd, highEnd, 0, 1000, true);
    // cellSize = actualVal / 10;
    for (let x = 0; x < windowWidth; x += width / cellSize) {
      for (let y = 0; y < windowHeight; y += height / cellSize) {
        let nx = noise(xoff) * (actualVal / 8);
        let ny = noise(yoff) * (actualVal / 8);
        fill(random(255), random(255), random(255), 100);
        stroke(0);
        strokeWeight(5);
        translate(x + width / 2, y + height / 2);
        rect(nx, ny, cellSize / 2, cellSize / 2);
        xoff += xincrement;
        yoff += yincrement;
      }
    }

    console.log(inData);
  }
  time += 1;
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
