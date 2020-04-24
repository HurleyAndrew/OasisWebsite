class tapperButton {
  constructor(xPos, yPos, size, hue, railID) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.hue = hue;
    this.railID = railID;
    this.tapped = false;
    this.image;
    this.scoreAlive = false;
    this.scoreAliveTime = 0;
    this.distScore;
    this.distance;
    if (this.railID == 0) {
      this.image = rightControl;
    } else if (this.railID == 1) {
      this.image = upControl;
    } else if (this.railID == 2) {
      this.image = leftControl;
    } else if (this.railID == 3) {
      this.image = downControl;
    }
  }

  isOverlapping(x, y) {
    if (
      x < this.xPos + this.size &&
      x > this.xPos - this.size &&
      y < this.yPos + this.size + 20 &&
      y > this.yPos - this.size - 20
    ) {
      this.distance = Math.sqrt(
        Math.pow(this.xPos - x, 2) + Math.pow(this.yPos - y, 2)
      );

      this.distScore = 100 - this.distance;

      return true;
    } else {
      return false;
    }
  }
  getDistance() {
    return this.distance;
  }
  getScore() {
    return this.distScore;
  }
  isTapped() {
    this.tapped = true;
    return true;
  }

  update() {}

  display() {
    push();
    if (this.tapped) {
      this.size += 4;
      this.scoreAlive = true;
      if (this.size >= 85) {
        this.tapped = false;
      }
    }

    if (this.scoreAlive) {
      this.displayScore();
      this.scoreAliveTime += 1;
      // console.log(this.scoreAliveTime);
      if (this.scoreAliveTime >= 60) {
        this.scoreAlive = false;
        this.scoreAliveTime = 0;
      }
    }
    if (this.tapped == false) {
      this.size -= 4;
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

  displayScore() {
    fill(255);
    strokeWeight(3);
    stroke(color("#1C94D8"));
    textFont(rubik);
    textSize(16);
    textAlign(CENTER);
    let scoreTxt;
    if (this.distScore >= 90) {
      stroke(color("#B21CD8"));
      scoreTxt = "Perfect";
      perfectCounter += 1;
    } else if (this.distScore >= 80 && this.distScore < 90) {
      stroke(color("#2DD212"));
      scoreTxt = "Great";
      greatCounter += 1;
    } else if (this.distScore >= 60 && this.distScore < 80) {
      stroke(color("#1299D2"));
      scoreTxt = "Good";
      goodCounter += 1;
    } else if (this.distScore >= 40 && this.distScore < 60) {
      stroke(color("#E5DE21"));
      scoreTxt = "Ok";
      okCounter += 1;
    } else if (this.distScore >= 0 && this.distScore < 40) {
      stroke(color("#D21212"));
      scoreTxt = "Oof";
      oofCounter += 1;
    }

    text(scoreTxt, this.xPos, this.yPos - 50);
  }
}
