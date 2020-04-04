let musicFile, amplitude, fft;

// Canvases
let cnv;
let bgCnv;
let menu;

// Arrays
let tapperButtonArr = [];
let tapTargetArr = [];
let pixelArr = [];
let shapeArr = [];
let vertArray = [];
let songOptionsArr = [];

let time = 0;

let isStarted = false;
let waitingForStart = true;
let timerPlayed = false;
let stutter = 20;

// Scoring
let score = 0;
let perfectCounter = 0;
let greatCounter = 0;
let goodCounter = 0;
let okCounter = 0;
let oofCounter = 0;
// Arrows
let upArrowImg;
let downArrowImg;
let leftArrowImg;
let rightArrowImg;
let upControl;
let downControl;
let leftControl;
let rightControl;

let rubik;
let noiseImg;

// JSON
let benJSON;

function preload() {
  // musicFile1 = loadSound("bensound-happyrock.mp3");
  // musicFile2 = loadSound("bensound-memories.mp3");
  // musicFile = loadSound("catempire.mp3");

  benJSON = loadJSON("benNotes.json");
  happytogetherJSON = loadJSON("happytogether.json");
  harryJSON = loadJSON("harryNotes.json");

  // musicFile = loadSound("dasher.mp3");
  benSong = loadSound("bensound-happyrock.mp3");
  happytogetherSong = loadSound("happytogether.mp3");
  harrySong = loadSound("harry.mp3");

  upArrowImg = loadImage("upArrow.png");
  downArrowImg = loadImage("downArrow.png");
  leftArrowImg = loadImage("leftArrow.png");
  rightArrowImg = loadImage("rightArrow.png");
  controlArrowImg = loadImage("controlArrow.png");

  upControl = loadImage("upControl.png");
  downControl = loadImage("downControl.png");
  leftControl = loadImage("leftControl.png");
  rightControl = loadImage("rightControl.png");

  noiseImg = loadImage("noise.png");

  rubik = loadFont("rubik.ttf");
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  bgCnv = createGraphics(windowWidth, windowHeight);

  benSong.onended(songFinished);
  happytogetherSong.onended(songFinished);
  harrySong.onended(songFinished);
  benSong.setVolume(0.2);
  happytogetherSong.setVolume(0.2);
  harrySong.setVolume(0.2);

  frameRate(60);

  for (let i = 0; i < 500; i++)
    shapeArr.push(new bgShape(random(width), random(height)));

  // amplitude = new p5.Amplitude();
  //   Setup tap buttons
  for (let i = 0; i < 4; i++) {
    tapperButtonArr.push(
      new tapperButton(
        62,
        i * 110 + (height / 2 - 3 * 90 + 90),
        90,
        random(1, 360),
        i
      )
    );
  }

  songOptionsArr.push(
    new songButton(
      width / 2,
      height / 3,
      "Watermelon Sugar",
      harrySong,
      harryJSON
    )
  );
  songOptionsArr.push(
    new songButton(
      width / 2,
      height / 3 + 150,
      "Happy Together",
      happytogetherSong,
      happytogetherJSON
    )
  );
  songOptionsArr.push(
    new songButton(width / 2, height / 3 + 300, "Happy Rock", benSong, benJSON)
  );

  menu = new Menu();
  //   analyze sounds and create tap target at certain points to be used in draw function
  // tapTarget(yStart,yEnd,targetRail,timing,alive);
  //   Lets try analyzing the song and dividing it into parts before load then print it on draw
}

let noteArrayLen;
let songTime = 0;

let menuIsOpen = true;

let selectedSong;
let selectedJSON;
function draw() {
  // console.log(songTime);

  // noteArrayLen = benJSON["note"].length;

  // hop through each note
  //if it's time
  //send it out according to its note
  // else
  // ignore it

  push();
  image(bgCnv, 0, 0);
  fill(10, 14, 128, 100);
  rect(0, 0, width, height);
  // blendMode(DIFFERENCE);

  bgCnv.background(0, 20);
  for (let i = 0; i < shapeArr.length; i++) {
    shapeArr[i].update();
    shapeArr[i].display();
  }

  if (menuIsOpen) {
    for (let i = 0; i < songOptionsArr.length; i++) {
      songOptionsArr[i].display();
      if (songOptionsArr[i].isOverlapping(mouseX, mouseY) && mouseIsPressed) {
        selectedSong = songOptionsArr[i].getSong();
        selectedJSON = songOptionsArr[i].getJSON();
        songOptionsArr[i].close();
        menuIsOpen = false;
      }
    }
  } else {
    // noteGenV1();

    // for (let i = 0; i < noteArrayLen; i++) {
    // console.log(benJSON["note"][i].timestamp);

    // console.log();

    // do not play the song until the first point reaches the mark

    // let arrowAnswer = benJSON["note"].find(x => x.timestamp === songTime).arrow;
    // let lastSecond;
    // console.log(songTime);
    let arrowAnswer = "";
    let timeAnswer;
    timeAnswer = selectedJSON["note"].filter(
      x => (timeAnswer = x.timestamp === ` ${songTime}`)
    );

    if (timeAnswer == undefined || timeAnswer.length < 1) {
      console.log("oops");
    } else {
      arrowAnswer = timeAnswer[0].arrow;
    }
    console.log(songTime);
    if (arrowAnswer == "rightArrow") {
      tapTargetArr.push(new tapTarget(0, 0, 0, 0, true));
    } else if (arrowAnswer == "upArrow") {
      tapTargetArr.push(new tapTarget(0, 0, 1, 0, true));
    } else if (arrowAnswer == "leftArrow") {
      tapTargetArr.push(new tapTarget(0, 0, 2, 0, true));
    } else if (arrowAnswer == "downArrow") {
      tapTargetArr.push(new tapTarget(0, 0, 3, 0, true));
    }

    // if (benJSON["note"][i].timestamp == songTime) {
    //   // console.log("hit time");
    //   if (benJSON["note"][i].arrow == "rightArrow") {
    //     // console.log("hit: " + i);
    //     tapTargetArr.push(new tapTarget(0, 0, 0, 0, true));
    //   } else if (benJSON["note"][i].arrow == "upArrow") {
    //     // console.log("hit: " + i);
    //     tapTargetArr.push(new tapTarget(0, 0, 1, 0, true));
    //   } else if (benJSON["note"][i].arrow == "leftArrow") {
    //     // console.log("hit: " + i);
    //     tapTargetArr.push(new tapTarget(0, 0, 2, 0, true));
    //   } else if (benJSON["note"][i].arrow == "downArrow") {
    //     // console.log("hit: " + i);
    //     tapTargetArr.push(new tapTarget(0, 0, 3, 0, true));
    //   }
    // }

    // console.log("hit time");
    // if (
    //   benJSON["note"].find(x => x.timestamp === songTime).arrow ==
    //   "rightArrow"
    // )
    // console.log();
    // benJSON["note"].filter(x => x.timestamp === "45");

    // benJSON["note"].find(x => x.timestamp === songTime);

    // if (
    //   benJSON["note"][i].timestamp == songTime &&
    //   benJSON["note"][i].arrow == "rightArrow"
    // ) {
    //   // console.log("hit: " + i);
    //   tapTargetArr.push(new tapTarget(0, 0, 0, 0, true));
    // } else if (
    //   benJSON["note"][i].timestamp == songTime &&
    //   benJSON["note"][i].arrow == "upArrow"
    // ) {
    //   // console.log("hit: " + i);
    //   tapTargetArr.push(new tapTarget(0, 0, 1, 0, true));
    // } else if (
    //   benJSON["note"][i].timestamp == songTime &&
    //   benJSON["note"][i].arrow == "leftArrow"
    // ) {
    //   // console.log("hit: " + i);
    //   tapTargetArr.push(new tapTarget(0, 0, 2, 0, true));
    // } else if (
    //   benJSON["note"][i].timestamp == songTime &&
    //   benJSON["note"][i].arrow == "downArrow"
    // ) {
    //   // console.log("hit: " + i);
    //   tapTargetArr.push(new tapTarget(0, 0, 3, 0, true));
    // }
    // }

    // console.log(benJSON["note"][i]);

    fill(color("#0A080A"));
    rect(0, 0, 125, height);
    for (let i = 0; i < tapperButtonArr.length; i++) {
      tapperButtonArr[i].update();
      tapperButtonArr[i].display();
    }

    for (let i = 0; i < tapTargetArr.length; i++) {
      tapTargetArr[i].update();
      tapTargetArr[i].display();
      if (tapTargetArr[i].isDead()) {
        tapTargetArr.splice(i, 1);
      }
    }

    time += 1;
  }

  pop();
  push();
  blendMode(OVERLAY);
  image(noiseImg, 0, 0);
  pop();
  displayScore(score);

  // if (frameCount % 60 == 0) {
  songTime++;
  // }
}

function displayScore() {
  push();
  fill(255);
  strokeWeight(5);
  stroke(color("#1C94D8"));
  textFont(rubik);
  textSize(32);
  text("Score: " + score, 180, 100);

  // text("Score: " + frameRate(), 100, 100);
  pop();
}

function keyPressed() {
  // console.log("mouse pressed");
  // Check over each note with each button
  // left = 0
  // up = 1
  // right = 2
  // if a key is pressed what key is it if key and rail match and is overlapping go
  if (
    keyCode === RIGHT_ARROW ||
    keyCode === UP_ARROW ||
    keyCode === LEFT_ARROW ||
    keyCode === DOWN_ARROW
  ) {
    for (let i = 0; i < tapperButtonArr.length; i++) {
      for (let j = 0; j < tapTargetArr.length; j++) {
        // console.log("hello")
        if (
          tapperButtonArr[i].isOverlapping(
            tapTargetArr[j].xPos,
            tapTargetArr[j].yPos
          )
        ) {
          if (keyCode === RIGHT_ARROW && tapTargetArr[j].targetRail == 0) {
            playOnFirstTime();
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();
              // score += 10;
            }
            tapTargetArr.splice(j, 1);
          }

          if (keyCode === UP_ARROW && tapTargetArr[j].targetRail == 1) {
            playOnFirstTime();
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();

              // score += 10;
            }
            tapTargetArr.splice(j, 1);
          }

          if (keyCode === LEFT_ARROW && tapTargetArr[j].targetRail == 2) {
            playOnFirstTime();
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();
              // score += 10;
            }
            tapTargetArr.splice(j, 1);
          }

          if (keyCode === DOWN_ARROW && tapTargetArr[j].targetRail == 3) {
            playOnFirstTime();
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();
              // score += 10;
            }

            tapTargetArr.splice(j, 1);
          }
        }
      }
    }
  }
}

function mousePressed() {
  if (getAudioContext().state !== "running") {
    getAudioContext().resume();
  }
  // rect(width / 2, height / 2, 50, 50);
  if (menu.isOverlapping(mouseX, mouseY)) {
    menu.close();
  }
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  bgCnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}

class bgShape {
  constructor(x, y) {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.x = x;
    this.y = y;
    this.h = 3;
    this.l = random(50);
    this.r = random(-360, 360);
  }

  update() {
    this.x += 1;
    this.r += 0.001;

    if (this.r > 360) {
      this.r = this.r % 360;
    }

    if (this.x > bgCnv.width) {
      this.y = -20;
      this.x = random(bgCnv.width);
    }

    if (this.y > bgCnv.height) {
      this.x = -20;
      this.y = random(bgCnv.height);
    }
  }

  display() {
    bgCnv.push();
    bgCnv.noStroke();
    bgCnv.colorMode(HSB, 255, 255, 255);
    bgCnv.fill(this.r, this.g, this.b);
    bgCnv.rotate(this.r);
    bgCnv.translate(this.x, this.y);
    bgCnv.rect(0, 0, this.l, this.h);
    bgCnv.pop();
  }
}

function songFinished() {
  selectedSong.pause();
  menuIsOpen = true;
}

function noteGenV1() {
  //   Get amplitude levels
  // background(255, 255, 255, 34);

  let level = amplitude.getLevel();

  // console.log(level);
  if (time % 40 == 0) {
    // stutter = floor(random(20, 30));
    stutter = 20;
  }
  stutter = 20;
  if (time % stutter == 0) {
    if (level >= 0.05 && level < 0.07) {
      // constructor(yStart,yEnd,targetRail,timing,alive)
      tapTargetArr.push(new tapTarget(0, 0, 0, 0, true));
      // ellipse(50, height - 150, size, size);
    } else if (level >= 0.035 && level < 0.05) {
      // constructor(yStart,yEnd,targetRail,timing,alive)
      tapTargetArr.push(new tapTarget(0, 0, 1, 0, true));
      // ellipse(50, height - 150, size, size);
    } else if (level >= 0.02 && level < 0.035) {
      tapTargetArr.push(new tapTarget(0, 0, 2, 0, true));
      // ellipse(150, height - 150, size, size);
    } else if (level >= 0.001 && level < 0.02) {
      tapTargetArr.push(new tapTarget(0, 0, 3, 0, true));
      // ellipse(250, height - 150, size, size);
    }
  }
}

let firstTimeAround = true;
function playOnFirstTime() {
  if (firstTimeAround == true) {
    selectedSong.play();
    firstTimeAround = false;
  }
}
