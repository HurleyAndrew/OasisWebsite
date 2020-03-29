var serial; // variable to hold an instance of the serialport library
var portName = "/dev/tty.usbmodem14201"; // fill in your serial port name here
var inData; // variable to hold the input data from Arduino
var outData = 0; // variable to hold the output data to Arduino

let actualVal;
let setLimitButton;

function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);

  var x = (windowWidth - width) / 2;

  //set up communication port
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  cnv.position(x, 0);

  setLimitButton = createButton("Set Value");
  setLimitButton.position(19, 19);
  setLimitButton.mousePressed(setLimits);
}

let highSet = false;
let lowSet = false;
let lowEnd = 0;
let highEnd = 0;

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

let time;

function draw() {
  // if the high and low set are not actually set do not run anything in draw
  if (highSet && lowSet == true) {
    // map the high and low end of the live data to 0 to 1000 to keep all values similar, no surprises
    actualVal = map(inData, lowEnd, highEnd, 0, 1000, true);

    background(255, 20);
    textSize(32);
    text("Low: " + lowEnd, 300, 300);
    text("High: " + highEnd, 600, 300);
    text("Current: " + actualVal, 900, 300);

    // print the fps and other debug stuff
    printDiagnostics();
  }
  time += 0.01;
}

function printDiagnostics() {
  push();
  textSize(16);
  fill(255);
  rect(0, 0, 200, 75);
  fill(0);
  text(frameRate(), 50, 50);
  pop();
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
