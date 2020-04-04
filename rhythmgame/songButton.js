class songButton {
  constructor(x, y, text, song, json) {
    this.song = song;
    this.json = json;
    this.text = text;
    this.tapped = false;
    this.isOpen = true;
    this.xPos = x;
    this.yPos = y;
    this.size = 125;
  }

  isOverlapping(x, y) {
    if (
      x < this.xPos + this.size &&
      x > this.xPos - this.size &&
      y < this.yPos + this.size &&
      y > this.yPos - this.size
    ) {
      return true;
    } else {
      return false;
    }
  }

  getSong() {
    return this.song;
  }

  getJSON() {
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
      fill(color("#0A1A0A"));
      rectMode(CENTER);
      rect(
        this.xPos,
        this.yPos,
        this.size * 3.5,
        this.size + 15,
        this.size + 15
      );
      // ellipse(this.xPos - this.size, this.yPos, this.size - 40, this.size - 40);
      fill(255);
      noStroke();
      textFont(rubik);
      textSize(22);
      textAlign(CENTER);
      text(this.text, this.xPos, this.yPos + 10);

      pop();
    } else {
      push();

      stroke(255);
      strokeWeight(6);
      fill(color("#0A1A0A"));
      rectMode(CENTER);
      rect(this.xPos, this.yPos, this.size * 3.35, this.size, this.size);
      // ellipse(this.xPos - this.size, this.yPos, this.size - 40, this.size - 40);
      fill(255);
      noStroke();
      textFont(rubik);
      textSize(20);
      textAlign(CENTER);
      text(this.text, this.xPos, this.yPos + 10);
      pop();
    }
  }
}
