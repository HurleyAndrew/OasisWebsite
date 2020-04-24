let musicFile, amplitude, fft;

// Canvases
let cnv;
let bgCnv;
// let menu;

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
let upArrowImg, downArrowImg, leftArrowImg, rightArrowImg;
let upControl, downControl, leftControl, rightControl;
// highscores
let song1_highscore = 0;
let song2_highscore = 0;
let song3_highscore = 0;

let rubik;
let noiseImg;

// JSON
let song1_JSON, song2_JSON, song3_JSON;
// Audio
let song1_audio, song2_audio, song3_audio;

function preload() {
  song1_JSON = loadJSON("./data/friends.json");
  song2_JSON = loadJSON("./data/harryNotes.json");
  song3_JSON = loadJSON("./data/happytogether.json");

  // musicFile = loadSound("dasher.mp3");
  song1_audio = loadSound("./audio/friends.mp3");
  song2_audio = loadSound("./audio/harry.mp3");
  song3_audio = loadSound("./audio/happytogether.mp3");

  upArrowImg = loadImage("./graphics/upArrow.png");
  downArrowImg = loadImage("./graphics/downArrow.png");
  leftArrowImg = loadImage("./graphics/leftArrow.png");
  rightArrowImg = loadImage("./graphics/rightArrow.png");
  controlArrowImg = loadImage("./graphics/controlArrow.png");

  upControl = loadImage("./graphics/upControl.png");
  downControl = loadImage("./graphics/downControl.png");
  leftControl = loadImage("./graphics/leftControl.png");
  rightControl = loadImage("./graphics/rightControl.png");

  noiseImg = loadImage("./graphics/noise.png");

  rubik = loadFont("rubik.ttf");
}

let analyzer;
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  bgCnv = createGraphics(windowWidth, windowHeight);

  analyzer = new p5.Amplitude();

  frameRate(60);

  if (storageAvailable("localStorage")) {
    if (localStorage.getItem("song1_highscore") == null) {
      localStorage.setItem("song1_highscore", 0);
      song1_highscore = localStorage.getItem("song1_highscore");
    }
    if (localStorage.getItem("song2_highscore") == null) {
      localStorage.setItem("song2_highscore", 0);
      song2_highscore = localStorage.getItem("song2_highscore");
    }
    if (localStorage.getItem("song3_highscore") == null) {
      localStorage.setItem("song3_highscore", 0);
      song3_highscore = localStorage.getItem("song3_highscore");
    }

    song1_highscore = localStorage.getItem("song1_highscore");
    song2_highscore = localStorage.getItem("song2_highscore");
    song3_highscore = localStorage.getItem("song3_highscore");
  } else {
    // Too bad, no localStorage for us
  }

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
      "We're Going To Be Friends\n- The White Stripes",
      song1_audio,
      song1_JSON,
      song1_highscore,
      1,
      "#38B381"
    )
  );
  songOptionsArr.push(
    new songButton(
      width / 2,
      height / 3 + 150,
      "Watermelon Sugar\n- Harry Styles",
      song2_audio,
      song2_JSON,
      song2_highscore,
      2,
      "#E8B451"
    )
  );
  songOptionsArr.push(
    new songButton(
      width / 2,
      height / 3 + 300,
      "Happy Together\n- Gerard Way",
      song3_audio,
      song3_JSON,
      song3_highscore,
      3,
      "#EF3044"
    )
  );

  // menu = new Menu();
  //   analyze sounds and create tap target at certain points to be used in draw function
  // tapTarget(yStart,yEnd,targetRail,timing,alive);
  //   Lets try analyzing the song and dividing it into parts before load then print it on draw
}

let noteArrayLen;
let songTime = 0;

let menuIsOpen = true;

let selectedSong;
let selectedJSON;

let currentSongID;

let amp;
let isSongStarted = false;
function draw() {
  analyzer.setInput(selectedSong);
  amp = analyzer.getLevel();
  push();
  image(bgCnv, 0, 0);
  fill(10, 14, 128, 100);
  rect(0, 0, width, height);

  bgCnv.background(0, 20);

  for (let i = 0; i < shapeArr.length; i++) {
    shapeArr[i].update();
    shapeArr[i].display();
  }
  // encapsulate so when the menu closed the stuff is allowed to starts
  if (menuIsOpen) {
    push();
    fill(255);
    strokeWeight(5);
    stroke(color("#E2A121"));
    textSize(50);
    textAlign(CENTER);
    textFont(rubik);
    text("Space BeeBop", width / 2, 110);
    textSize(24);
    noStroke();
    text("Choose a Song", width / 2, 170);
    pop();
    for (let i = 0; i < songOptionsArr.length; i++) {
      songOptionsArr[i].display();
      if (songOptionsArr[i].isOverlapping(mouseX, mouseY) && mouseIsPressed) {
        songOptionsArr[i].close();
        menuIsOpen = false;

        currentSongID = songOptionsArr[i].getID();
        if (currentSongID == 1) {
          selectedSong = song1_audio;
          selectedJSON = song1_JSON;
        }
        if (currentSongID == 2) {
          selectedSong = song2_audio;
          selectedJSON = song2_JSON;
        }
        if (currentSongID == 3) {
          selectedSong = song3_audio;
          selectedJSON = song3_JSON;
        }

        // selectedSong.stop();
        tapTargetArr = [];
        isSongStarted = true;
      }
    }
  } else {
    if (firstTimeAround == true) {
      for (let i = 0; i < tapperButtonArr.length; i++) {
        for (let j = 0; j < tapTargetArr.length; j++) {
          if (
            (tapperButtonArr[i].isOverlapping(
              tapTargetArr[j].xPos,
              tapTargetArr[j].yPos
            ) &&
              tapperButtonArr[i].getDistance() <= 5) ||
            (tapperButtonArr[i].getDistance() <= 100 && keyPressed)
          ) {
            // added check for distance on first go around maybe instead check for something else because if the user hits the first target before it gets to its mark it will not start the music
            score = 0;
            playOnFirstTime();
          }
        }
      }
    }
    selectedSong.onended(onFinish);
    beatGenerator();
    time += 1;

    console.log(songTime);
    displayScore(score);
  }

  pop();
  push();
  blendMode(OVERLAY);
  image(noiseImg, 0, 0);
  pop();

  // if (frameCount % 60 == 0) {

  // }

  if (isSongStarted) {
    songTime++;
  }
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
  if (keyCode === 81) {
    songFinished();
  }
  if (
    keyCode === RIGHT_ARROW ||
    keyCode === UP_ARROW ||
    keyCode === LEFT_ARROW ||
    keyCode === DOWN_ARROW
  ) {
    for (let i = 0; i < tapperButtonArr.length; i++) {
      for (let j = 0; j < tapTargetArr.length; j++) {
        if (
          tapperButtonArr[i].isOverlapping(
            tapTargetArr[j].xPos,
            tapTargetArr[j].yPos
          )
        ) {
          if (keyCode === RIGHT_ARROW && tapTargetArr[j].targetRail == 0) {
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();
            }
            tapTargetArr.splice(j, 1);
          }

          if (keyCode === UP_ARROW && tapTargetArr[j].targetRail == 1) {
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();
            }
            tapTargetArr.splice(j, 1);
          }

          if (keyCode === LEFT_ARROW && tapTargetArr[j].targetRail == 2) {
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();
            }
            tapTargetArr.splice(j, 1);
          }

          if (keyCode === DOWN_ARROW && tapTargetArr[j].targetRail == 3) {
            if (tapperButtonArr[i].isTapped()) {
              score += tapperButtonArr[i].getScore();
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

let firstTimeAround = true;

function playOnFirstTime() {
  if (firstTimeAround == true) {
    selectedSong.onended(onFinish);
    selectedSong.setVolume(0.2);

    if (currentSongID == 1) {
      selectedSong = song1_audio;
      selectedJSON = song1_JSON;
    }
    if (currentSongID == 2) {
      selectedSong = song2_audio;
      selectedJSON = song2_JSON;
    }
    if (currentSongID == 3) {
      selectedSong = song3_audio;
      selectedJSON = song3_JSON;
    }
    // selectedSong.jump(0);

    selectedSong.play();

    // selectedSong.currentTime(0).play();
    firstTimeAround = false;
  }
}

function songFinished() {
  // console.log("song finihsed selected song: " + selectedSong);
  if (selectedSong.isPlaying()) {
  }
  isSongStarted = false;
  selectedSong.stop();
  menuIsOpen = true;
  saveScores();
  time = 0;
  songTime = 0;
  score = 0;
  firstTimeAround = true;
}

function onFinish() {
  console.log("SongTime: " + songTime);
  isSongStarted = false;
  menuIsOpen = true;
  saveScores();
  time = 0;
  songTime = 0;
  score = 0;
  firstTimeAround = true;
}

function saveScores() {
  if (storageAvailable("localStorage")) {
    if (selectedSong == song1_audio) {
      if (score > songOptionsArr[0].highscore) {
        localStorage.setItem("song1_highscore", score);
        songOptionsArr[0].highscore = localStorage.getItem("song1_highscore");
      }
    }
    if (selectedSong == song2_audio) {
      if (score > songOptionsArr[1].highscore) {
        localStorage.setItem("song2_highscore", score);
        songOptionsArr[1].highscore = localStorage.getItem("song2_highscore");
      }
    }
    if (selectedSong == song3_audio) {
      if (score > songOptionsArr[2].highscore) {
        localStorage.setItem("song3_highscore", score);
        songOptionsArr[2].highscore = localStorage.getItem("song3_highscore");
      }
    }
  } else {
    // Too bad, no localStorage for us
  }
}

function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function beatGenerator() {
  let arrowAnswer = "";
  let timeAnswer;
  // console.log("Current: " + selectedJSON["note"]);
  timeAnswer = selectedJSON["note"].filter(
    (x) => (timeAnswer = x.timestamp === ` ${songTime}`)
  );

  if (timeAnswer == undefined || timeAnswer.length < 1) {
    // console.log("oops");
  } else {
    arrowAnswer = timeAnswer[0].arrow;
  }
  // console.log(songTime);

  if (arrowAnswer == "rightArrow") {
    tapTargetArr.push(new tapTarget(0, 0, 0, 0, true));
  } else if (arrowAnswer == "upArrow") {
    tapTargetArr.push(new tapTarget(0, 0, 1, 0, true));
  } else if (arrowAnswer == "leftArrow") {
    tapTargetArr.push(new tapTarget(0, 0, 2, 0, true));
  } else if (arrowAnswer == "downArrow") {
    tapTargetArr.push(new tapTarget(0, 0, 3, 0, true));
  }

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
}
