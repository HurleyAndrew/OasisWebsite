class tapperButton {
  constructor(xPos, yPos, size, hue, railID) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.hue = hue;
    this.railID = railID;
    this.tapped = false;
    this.image;
    if (this.railID == 0) {
      this.image = rightArrowImg;
    } else if (this.railID == 1) {
      this.image = upArrowImg;
    } else if (this.railID == 2) {
      this.image = leftArrowImg;
    } else if (this.railID == 3) {
      this.image = downArrowImg;
    }
  }

  isOverlapping(x, y) {
    if (
      x < this.xPos + this.size &&
      x > this.xPos - this.size &&
      y < this.yPos + this.size + 20 &&
      y > this.yPos - this.size - 20
    ) {
      var dist = Math.sqrt(
        Math.pow(this.xPos - x, 2) + Math.pow(this.yPos - y, 2)
      );
      score += dist;
      console.log(dist);
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
    // strokeWeight(5);
    // colorMode(HSB, 360, 100, 100);
    // fill(50, 100, 54);
    // ellipse(this.xPos, this.yPos, this.size, this.size);
    imageMode(CENTER);
    // ellipse(this.xPos, this.yPos, this.size, this.size);
    image(this.image, this.xPos, this.yPos, this.size, this.size);
    pop();
  }
}
