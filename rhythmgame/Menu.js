class Menu {
  constructor() {
    this.tapped = false;
    this.isOpen = true;
    this.xPos = width / 2;
    this.yPos = height / 2;
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
      text("Watermelon Sugar \nHarry Styles", this.xPos, this.yPos);

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
      text("Watermelon Sugar \nHarry Styles", this.xPos, this.yPos);
      pop();
    }
  }
}
