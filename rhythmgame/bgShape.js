class bgShape {
  constructor(x, y) {
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.x = x;
    this.y = y;
    this.h = 3;
    this.l = random(50);
    this.r = random(-360, 360);
  }

  update() {
    this.x += 1;
    this.x += amp * 50;
    this.r += 0.001;

    if (this.r > 360) {
      this.r = this.r % 360;
    }

    if (this.x > bgCnv.width) {
      this.y = -20;
      this.x = random(bgCnv.width);
    }

    if (this.y > bgCnv.height) {
      this.x = -20;
      this.y = random(bgCnv.height);
    }
  }

  display() {
    bgCnv.push();
    bgCnv.noStroke();
    bgCnv.colorMode(HSB, 255, 255, 255);
    bgCnv.fill(this.r, this.g, this.b);
    bgCnv.rotate(this.r);
    bgCnv.translate(this.x, this.y);
    bgCnv.rect(0, 0, this.l, this.h);
    bgCnv.pop();
  }
}
