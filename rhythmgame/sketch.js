let musicFile, amplitude, fft;

let tapperButtonArr = [];
let tapTargetArr = [];

let cnv;

let menu;

// Arrows
let upArrowImg;
let downArrowImg;
let leftArrowImg;
let rightArrowImg;

function preload() {
  // musicFile1 = loadSound("bensound-happyrock.mp3");
  // musicFile2 = loadSound("bensound-memories.mp3");
  musicFile = loadSound("catempire.mp3");
  upArrowImg = loadImage("upArrow.png");
  downArrowImg = loadImage("downArrow.png");
  leftArrowImg = loadImage("leftArrow.png");
  rightArrowImg = loadImage("rightArrow.png");
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);

  musicFile.setVolume(0.2);
  amplitude = new p5.Amplitude();
  //   Setup tap buttons
  for (let i = 0; i < 4; i++) {
    tapperButtonArr.push(
      new tapperButton(
        100,
        i * 110 + (height / 2 - 3 * 90 + 90),
        90,
        random(1, 360),
        i
      )
    );
  }
  menu = new Menu();
  //   analyze sounds and create tap target at certain points to be used in draw function
  // tapTarget(yStart,yEnd,targetRail,timing,alive);
  //   Lets try analyzing the song and dividing it into parts before load then print it on draw
}

let time = 0;
let score = 0;
let isStarted = false;
let waitingForStart = true;
let timerPlayed = false;
let stutter = 20;
function draw() {
  push();
  fill(color("#0A0E80"));
  rect(0, 0, width, height);
  blendMode(DIFFERENCE);

  if (menu.isOpen) {
    menu.display();
    if (menu.isOverlapping(mouseX, mouseY) && mouseIsPressed) {
      menu.close();
      // console.log("closemenu");
    }
  } else {
    if (!menu.isOpen && !timerPlayed) {
      musicFile.play();
      timerPlayed = true;
    }

    //   Get amplitude levels
    // background(255, 255, 255, 34);

    let level = amplitude.getLevel();
    let size = map(level, 0, 1, 0, 2000);

    // console.log(level);
    if (time % 40 == 0) {
      stutter = floor(random(20, 30));
    }

    if (time % stutter == 0) {
      if (level >= 0.05 && level < 0.07) {
        // constructor(yStart,yEnd,targetRail,timing,alive)
        tapTargetArr.push(new tapTarget(0, 0, 0, 0, true, level));
        // ellipse(50, height - 150, size, size);
      } else if (level >= 0.035 && level < 0.05) {
        // constructor(yStart,yEnd,targetRail,timing,alive)
        tapTargetArr.push(new tapTarget(0, 0, 1, 0, true, level));
        // ellipse(50, height - 150, size, size);
      } else if (level >= 0.02 && level < 0.035) {
        tapTargetArr.push(new tapTarget(0, 0, 2, 0, true, level));
        // ellipse(150, height - 150, size, size);
      } else if (level >= 0.001 && level < 0.02) {
        tapTargetArr.push(new tapTarget(0, 0, 3, 0, true, level));
        // ellipse(250, height - 150, size, size);
      }
    }

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

      // tapTargetArr[i].display();
    }

    displayScore(score);
    time += 1;
  }

  pop();
}
function displayScore() {
  push();
  textSize(32);
  text(score, 100, 100);
  pop();
}

function keyPressed() {
  // console.log("mouse pressed");
  // Check over each note with each button
  // left = 0
  // up = 1
  // right = 2
  // if a key is pressed what key is it if key and rail match and is overlapping go

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
          tapTargetArr.splice(j, 1);
          tapperButtonArr[i].isTapped();

          score += 10;
        }

        if (keyCode === UP_ARROW && tapTargetArr[j].targetRail == 1) {
          tapTargetArr.splice(j, 1);
          tapperButtonArr[i].isTapped();

          score += 10;
        }

        if (keyCode === LEFT_ARROW && tapTargetArr[j].targetRail == 2) {
          tapTargetArr.splice(j, 1);
          tapperButtonArr[i].isTapped();

          score += 10;
        }
        if (keyCode === DOWN_ARROW && tapTargetArr[j].targetRail == 2) {
          tapTargetArr.splice(j, 1);
          tapperButtonArr[i].isTapped();

          score += 10;
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

  // console.log("mouse pressed");
  // Check over each note with each button
  for (let i = 0; i < tapperButtonArr.length; i++) {
    for (let j = 0; j < tapTargetArr.length; j++) {
      // console.log("hello")
      if (
        tapperButtonArr[i].isOverlapping(
          tapTargetArr[j].xPos,
          tapTargetArr[j].yPos
        )
      ) {
        if (tapperButtonArr[i].isOverlapping(mouseX, mouseY)) {
          tapTargetArr.splice(j, 1);
          tapperButtonArr[i].isTapped();
          // console.log(
          //   "overlapped and mouse pressed" + tapTargetArr[j].targetRail
          // );
          score += 10;
        }
      }
    }
  }
}

/*
ToDo:
- Analyze song
- Use that data to emit touch events
- Accept touches at right time
- Make a touch object that animated to the tapperButton at a certain points; What params?
- Param(xStart, xEnd, whichTarget, when does it start);
*/

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function windowResized() {
  centerCanvas();
}
