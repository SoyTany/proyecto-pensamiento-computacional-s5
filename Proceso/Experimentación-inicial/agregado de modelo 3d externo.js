//https://editor.p5js.org/Tanytanita/sketches/7nR0SCEmy

let zagreus;
let imgCuerpo, imgRopa, imgCabeza, imgCalaveras;

function preload(){
 
  zagreus = loadModel('modelos/zagreus/zagreus.obj', true);
  texturaUnificada = loadImage('modelos/zagreus/zagreus_textura.png');
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight, WEBGL);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  textureMode(NORMAL); 
}

function draw() {
  background(30);
  ambientLight(255);
  pointLight(80, 50, 80, 200, 100, 100);
  
  push();
  translate(0, 40, 400);
  scale(-1, 1, 1);
  rotateZ(180);
  rotateY(-frameCount * 0.20);
  strokeWeight(0.2);
  stroke(80, 100, 100);
  model(zagreus); 
  
  pop();
}
