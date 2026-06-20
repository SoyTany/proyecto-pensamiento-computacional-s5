// https://editor.p5js.org/Tanytanita/sketches/fIGxSduSq

let violeta = 280;
let amarillo = 60;
let naranja = 10;
let azul = 200;
let magenta = 320;
let verde = 130;
let anguloY = 0;
let anguloX = 0;
let font;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  let colorDinamico = map(mouseX + mouseY, 0, windowWidth + windowHeight, 0, 360);
  
  if (keyIsPressed && keyCode === RIGHT_ARROW){
    anguloY = anguloY + 1.5;
  } else if (keyIsPressed && keyCode === LEFT_ARROW){
    anguloY = anguloY - 1.5;
  }
  
  if (keyIsPressed && keyCode === UP_ARROW){
    anguloX = anguloX + 1.5;
  } else if (keyIsPressed && keyCode === DOWN_ARROW){
    anguloX = anguloX - 1.5;
  }
  
  background(colorDinamico, 50, 100);
  pointLight(80, 50, 80, 200, 100, 100);
  
push(); //caja magenta
  rotateY(anguloY);
  rotateX(anguloX);
  translate(-500, -250, -310);
  ambientLight(magenta, 80, 90);
  specularMaterial(magenta, 60, 100);
  noStroke();
  box(300, 800, 300);
pop();
  
  orbitControl();
  
push();
pop();
}
