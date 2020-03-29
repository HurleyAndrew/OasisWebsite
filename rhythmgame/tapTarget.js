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
    this.xPos = 95 * targetRail + 120;
    this.yPos = 0;
    this.size = 50;
    this.level = level * 700;
  }

  update() {
    if (this.yPos > height) {
      this.alive = false;
    } else {
      this.yPos += 10;
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
      push();
      strokeWeight(5);
      colorMode(HSB, 360, 100, 100);
      fill(10, 100, 54);
      ellipse(this.xPos, this.yPos, this.size, this.size);
      pop();
    }
  }
}
