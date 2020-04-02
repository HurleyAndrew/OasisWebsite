/*
ToDo:
- Analyze song
- Use that data to emit touch events
- Accept touches at right time
- Make a touch object that animated to the tapperButton at a certain points; What params?
- Param(xStart, xEnd, whichTarget, when does it start);
*/

class tapTarget {
  constructor(yStart, yEnd, targetRail, timing, alive, level) {
    this.yStart = yStart;
    this.yEnd = yEnd;
    this.targetRail = targetRail;
    this.timing = timing;
    this.alive = alive;
    this.xPos = width;
    this.yPos = targetRail * 110 + (height / 2 - 3 * 90 + 90);
    this.size = 70;
    this.level = level * 700;
    this.isHoldLine = false;
    this.holdLineRand = floor(random(0, 100000));
    if (this.holdLineRand % 9 == 0) {
      this.isHoldLine = true;
    }
    this.randHoldLength = floor(random(200, 900));
    this.image;
    if (this.targetRail == 0) {
      this.image = rightArrowImg;
    } else if (this.targetRail == 1) {
      this.image = upArrowImg;
    } else if (this.targetRail == 2) {
      this.image = leftArrowImg;
    } else if (this.targetRail == 3) {
      this.image = downArrowImg;
    }
  }

  update() {
    if (this.isHoldLine) {
      if (this.xPos < -width) {
        this.alive = false;
      } else {
        this.xPos -= 10;
      }
    } else {
      if (this.xPos < 0) {
        this.alive = false;
      } else {
        this.xPos -= 10;
      }
    }
  }

  gotTapped() {
    //   if the x and y are over the x and y of the button console true
    //     then if that is true and it was tapped then console true and tapped
  }

  isDead() {
    if (this.alive == true) {
      return false;
    } else {
      return true;
    }
  }

  display() {
    if (this.alive) {
      if (this.isHoldLine) {
        push();
        strokeWeight(5);
        imageMode(CENTER);
        // ellipse(this.xPos, this.yPos, this.size, this.size);
        rectMode(CENTER);
        fill(255);
        rect(
          this.xPos + this.randHoldLength / 2 - this.size * 2,
          this.yPos,
          this.randHoldLength,
          this.size + 10,
          this.size
        );
        image(this.image, this.xPos, this.yPos, this.size, this.size);
        image(
          this.image,
          this.xPos + this.randHoldLength + this.size / 2,
          this.yPos,
          this.size,
          this.size
        );
        pop();
      } else {
        push();
        strokeWeight(5);
        imageMode(CENTER);
        // ellipse(this.xPos, this.yPos, this.size, this.size);
        image(this.image, this.xPos, this.yPos, this.size, this.size);
        pop();
      }
    }
  }
}
