let sphereArr = [];
let sphereCount = 50;
let time = 0;
var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i) ? true : false;
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
  },
  any: function() {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Windows()
    );
  }
};

function setup() {
  var cnv = createCanvas(document.body.clientWidth, document.body.clientHeight);
  //   console.log(document.body.clientHeight);
  var x = (document.body.clientWidth - width) / 2;
  var y = (document.body.clientHeight - height) / 2;
  //   console.log(document.body.clientHeight);
  //   console.log(height);
  //   console.log(y);
  cnv.position(x, 0);
  //   background(255, 0, 200);
  //   for (let i = 0; i < sphereCount; i++) {
  //     sphereArr.push(new Sphere(mouseX, mouseY));
  //   }
  //   for (let i = 0; i < sphereCount; i++) {
  //     sphereArr[i].display();
  //   }
  noStroke();
  let c = color("#F0F5F9");
  //   fill(c);
  //   rect(0, 0, document.body.clientWidth, document.body.clientHeight);
  background(c, 100);

  if (isMobile.any()) {
    console.log("ismobile");

    noLoop();
  } else {
    loop();
  }
}

function windowResized() {
  resizeCanvas(document.body.clientWidth, document.body.clientHeight);
}

function draw() {
  if (!isMobile.any()) {
    //   background(240, 245, 0, 100);
    ellipse(mouseX, mouseY, 15, 15);

    if (sphereArr.length > 0) {
      for (let i = 0; i < sphereArr.length; i++) {
        //   console.log(sphereArr[i].getXCoord());
        sphereArr[i].display();
        sphereArr[i].update();
        //   if (sphereArr[i].isDead) {
        //     //   sphereArr.remove(i);
        //     console.log("item killed: " + sphereArr[i].isDead);
        //     sphereArr.splice(sphereArr.indexOf(i), 1);
        //   } else {
        //     console.log(sphereArr[i].getXCoord());
        //     sphereArr[i].display();
        //     sphereArr[i].update();
        //   }
      }
    }
    if (time % 4 == 0) {
      // console.log("new pushed");
      sphereArr.push(new Sphere(random(width), random(height)));
    }
    background(c, 10);
    time += 1;
  }
}

// function mouseMoved() {
//   if (!(sphereArr.length >= 2000)) {
//     console.log(sphereArr.length);
//     sphereArr.push(new Sphere(mouseX, mouseY));
//   }
// }
function mouseClicked() {}

class Sphere {
  constructor(xHold, yHold) {
    this.isDead = false;
    this.x = xHold;
    this.y = yHold;
    this.size = random(1, 5);
    this.decrementSize = random(0.005, 0.01);
    this.scale = 2.0;
    this.xoff = 0.0;
    this.yoff = 0.0;
    this.randomOption = random(0, 1);
    this.opacity = 100;
    // this.display();
  }

  update() {
    // this.x = noise(this.xoff) * width;
    // this.y = noise(this.yoff) * height;

    this.xoff = this.xoff + random(0.001, 0.01);
    this.yoff = this.yoff + random(0.003, 1);

    if ((this.randomOption >= 0) & (this.randomOption <= 0.25)) {
      this.x += noise(this.xoff) * 2.0;
      this.y += noise(this.yoff) * 2.0;
    } else if ((this.randomOption > 0.25) & (this.randomOption <= 0.5)) {
      this.x -= noise(this.xoff) * 2.0;
      this.y -= noise(this.yoff) * 2.0;
    } else if ((this.randomOption > 0.5) & (this.randomOption <= 0.75)) {
      this.x += noise(this.xoff) * 2.0;
      this.y -= noise(this.yoff) * 2.0;
    } else {
      this.x -= noise(this.xoff) * 2.0;
      this.y += noise(this.yoff) * 2.0;
    }

    // this.x += noise(this.xoff) * 2.0;
    // this.y += noise(this.yoff) * 2.0;
    // this.x = noise(this.xoff) * 20.0;
    // this.y = noise(this.yoff) * 20.0;
    this.size -= this.decrementSize;

    if (this.size <= 0) {
      this.isDead = true;
      //   this.size = random(1, 5);
      //   this.randomOption = random(0, 1);
      //   this.x = mouseX;
      //   this.y = mouseY;
      //   this.opacity = 100;
    }
    // this.opacity -= this.decrementSize * 100;
  }
  getXCoord() {
    return this.x;
  }
  display() {
    if (!this.isDead) {
      if (this.x > 50 && this.y > 50) {
        fill(132, 164, 246, this.opacity);
        ellipse(this.x, this.y, this.size, this.size);
      } else {
        //   console.log(this.x);
      }
    }
  }
}
