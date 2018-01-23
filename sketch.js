var cnv;
var snowflakes = [];
var test;
var radius = 12;
var speed = 2;
var number_snowFlakes = 150;

let nameList = [
  "Anghel Razvan",
  "Baiatu Bianca",
  "Bet Adrian",
  "Boabes Bianca",
  "Botosan Ilie",
  "Boerescu Sebastian",
  "Chiritoiu Cristian",
  "Craciun Mara",
  "Diaconu Stefan",
  "Dumitrescu Petre",
  "Dumitru Mihnea",
  "Duran Laura",
  "Grosu Antonia",
  "Grosu Ilinca",
  "Ilie Iustina",
  "Iatan Sofia",
  "Mateita David",
  "Branzeu Mihnea",
  "Iacob Tudor",
  "Vlaicu Vlad",
  "Tutugan Stefan",
  "Pangratie Vlad",
  "Stanciu Vlad",
  "Stanescu Raluca",
  "Son Andreea",
  "Biolan Matei",
  "Gheorghe Andrei",
  "Goiceanu Rares",
  "Musledin Selma",
  "Cohea Tudor",
  "Dragan Victor",
  "Oprea Letitia",
  "Matei Andrei",
  "Bacanu Soranna",
  "Iosep Ana",
];
let randomized = [];
let numbers = [];
let number;
var inp;
var submit;
var output;
var counter = 0;
var counter = 0;


function setup() {
  cnv = createCanvas(windowWidth-20, windowHeight-20);
  cnv.parent('sketch-holder');
  for(var i = 0; i < number_snowFlakes; i++) {
    snowflakes[i] = new snowFlake(speed, floor(random(5, radius+1)));
  }
  for(let i = 0; i < nameList.length-1; i++) {
    numbers[i] = i;
    for(let j = i+1; j < nameList.length; j++) {
      if(nameList[i]>nameList[j]) {
        let aux = nameList[i];
        nameList[i] = nameList[j];
        nameList[j] = aux;
      }
    }
  }
  numbers[nameList.length-1] = nameList.length-1;
  for(let i = 0; i <nameList.length-1; i++) {
    number = floor(random(numbers.length));
    while(numbers[number] == i) {
      number = floor(random(numbers.length));
    }
	if(randomized[counter] ===undefined) {
		randomized[counter] = numbers[number];
		numbers.splice(number,1);
	}
	counter++;
  }
  inp = select('#who_are_you');
  submit = select('#submit');
  output = select('#match');
  if(inp.value!="") {
    submit.mousePressed(choosePartner);
  }
}

function draw() {
  background(164,206,237);
  for(var i = 0 ; i < snowflakes.length; i++) {
    snowflakes[i].show();
    snowflakes[i].update();
  }

}

function windowResized() {
  resizeCanvas(windowWidth-20, windowHeight-20);
}

function snowFlake(speed, radius) {
  this.x = floor(random(windowWidth));
  this.y = -floor(random(0, 200));
  this.speed = createVector(0, map(radius, 5, 20, 0.1, speed));
  this.max_radius = radius;
  this.radius = this.max_radius;
  this.show = function() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
  }
  this.update = function() {
    this.y += this.speed.y;
    this.x += this.speed.x;
    if(this.x < 0) {
      this.x = windowWidth;
    }
    if(this.y > windowHeight) {
      this.y = -floor(random(0, 200));
    }
    this.radius = map(this.y, 0, windowHeight, this.max_radius, 0);
  }
}

function choosePartner() {
  if(submit.html()=="Submit") {
    var found = false;
    var text = inp.value();
    for(i = 0; i < nameList.length && !found; i++) {
      if(text.toLowerCase()==nameList[i].toLowerCase()) {
        output.html(nameList[randomized[i]]);
        found = true;
      }
    }
    if(!found) {
      output.html("Not found! Sorry!")
    }
    submit.html("Clear");
  } else {
    submit.html("Submit");
    output.html("Your match will apear here");
    inp.value("");
  }
}
