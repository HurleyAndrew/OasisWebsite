class Menu {
  constructor() {
    this.tapped = false;
    this.isOpen = true;
    this.xPos = width / 2;
    this.yPos = height / 2;
    this.size = 200;
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

  isTapped() {
    this.isOpen = false;
    this.tapped = true;
  }
  close() {
    this.isOpen = false;
  }
  update() {}

  display() {
    push();
    fill(0);
    rectMode(CENTER);
    rect(this.xPos, this.yPos, this.size, this.size);
    pop();
  }
}
