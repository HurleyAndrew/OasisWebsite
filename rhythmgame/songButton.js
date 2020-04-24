class songButton {
  constructor(x, y, text, song, json, highscore, id, levelColor) {
    this.id = id;
    this.levelColor = levelColor;
    this.song = song;
    this.json = json;
    this.text = text;
    this.highscore = highscore;
    this.tapped = false;
    this.isOpen = true;
    this.xPos = x;
    this.yPos = y;
    this.size = 125;
  }
  getID() {
    return this.id;
  }
  isOverlapping(x, y) {
    if (
      x < this.xPos + this.size + 90 &&
      x > this.xPos - this.size - 90 &&
      y < this.yPos + this.size - 50 &&
      y > this.yPos - this.size + 50
    ) {
      return true;
    } else {
      return false;
    }
  }

  getSong() {
    return this.song;
  }

  getData() {
    return this.json;
  }
  isTapped() {
    this.isOpen = false;
    this.tapped = true;
  }
  close() {
    this.isOpen = false;
  }
  update() {}

  display() {
    if (this.isOverlapping(mouseX, mouseY)) {
      push();

      stroke(255);
      strokeWeight(6);
      fill(color(this.levelColor));
      rectMode(CENTER);
      rect(
        this.xPos,
        this.yPos,
        this.size * 3.7,
        this.size + 15,
        this.size + 15
      );

      fill(255);
      noStroke();
      textFont(rubik);
      textSize(20);
      textAlign(CENTER);
      text(this.text, this.xPos, this.yPos);
      textAlign(LEFT);
      text(this.highscore, this.xPos + 250, this.yPos);
      pop();
    } else {
      push();
      stroke(255);
      strokeWeight(6);
      fill(color(this.levelColor));
      rectMode(CENTER);
      rect(this.xPos, this.yPos, this.size * 3.45, this.size, this.size);
      fill(255);
      noStroke();
      textFont(rubik);
      textSize(18);
      textAlign(CENTER);
      text(this.text, this.xPos, this.yPos);
      textAlign(LEFT);
      text(this.highscore, this.xPos + 250, this.yPos);
      pop();
    }
  }
}
