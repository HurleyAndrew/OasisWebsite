class tapperButton {
  constructor(xPos, yPos, size, hue, railID) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.hue = hue;
    this.railID = railID;
    this.tapped = false;
  }

  isOverlapping(x, y) {
    if (
      x < this.xPos + this.size &&
      x > this.xPos - this.size &&
      y < this.yPos + this.size + 20 &&
      y > this.yPos - this.size - 20
    ) {
      return true;
    } else {
      return false;
    }
  }

  isTapped() {
    this.tapped = true;
  }

  update() {}

  display() {
    push();
    if (this.tapped) {
      this.size += 5;
      if (this.size >= 85) {
        this.tapped = false;
      }
    }

    if (this.tapped == false) {
      this.size -= 5;
      if (this.size <= 70) {
        this.size = 70;
      }
    }
    strokeWeight(5);
    colorMode(HSB, 360, 100, 100);
    fill(50, 100, 54);
    ellipse(this.xPos, this.yPos, this.size, this.size);
    pop();
  }
}
