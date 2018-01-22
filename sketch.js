var arr = [];
var r = 2;
var len = 100;
var grd;
var cnv, context;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('z-index', '-1');
  cnv.parent('cnv_holder');
  for(let i = 0; i < len; i++) {
    arr[i] = new Point(floor(random(width)), floor(random(height)), r);
  }
}

function draw() {
  clear();
  for(let i = 0; i < arr.length; i++) {
    arr[i].show();
    arr[i].update();
    for(let j = i+1; j < arr.length; j++) {
      Conect(i, j);
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function Conect(i, j) {
  let d = dist(arr[i].x, arr[i].y, arr[j].x, arr[j].y);
  if(d <= 150) {
    let value = map(d, 150, 0, 0, 100);
    stroke(255, value);
    strokeWeight(1);
    line(arr[i].x, arr[i].y, arr[j].x, arr[j].y);
  }
}

function Point(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.vel = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.r, this.r);
  }
  this.update = function() {
    if(this.x > width + 150) {
      this.x = -150;
    } else if(this.x < -150) {
      this.x = width + 150;
    }
    if(this.y > height + 150) {
      this.y = -150;
    } else if(this.y < -150) {
      this.y = height + 150;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;

  }
}
