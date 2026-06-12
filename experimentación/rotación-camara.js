//rotación de cámara con teclas (flechas)

//https://editor.p5js.org/Tanytanita/sketches/HFHGp76S0
let violeta = 280;
let amarillo = 60;
let naranja = 10;
let azul = 200;
let magenta = 320;
let verde = 130;
let camaraX = 0;
let camaraY = 0;
let camaraZ = 800;
let font;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
}

function draw() {
  let colorDinamico = map(mouseX + mouseY, 0, windowWidth + windowHeight, 0, 360);
  background(colorDinamico, 50, 100);
  pointLight(80, 50, 80, 200, 100, 100);
  
   if (keyIsPressed){
    if (keyCode === LEFT_ARROW) camaraX = camaraX - 30;
    if (keyCode === RIGHT_ARROW) camaraX = camaraX + 30;
    if (keyCode === UP_ARROW) camaraY = camaraY - 30;
    if (keyCode === DOWN_ARROW) camaraY = camaraY + 30;
    if (key === 'w') camaraZ = camaraZ - 30;
    if (key === 's') camaraZ = camaraZ + 30;
  }
  
  camera(camaraX, camaraY, camaraZ);
  
push(); //caja magenta
  translate(-500, -250, -310);
  ambientLight(magenta, 80, 90);
  specularMaterial(magenta, 60, 100);
  noStroke();
  box(300, 800, 300);
pop();
  
push(); //esta es la dona
  translate(0, 0, 0);
  ambientLight(violeta, 60, 90);
  shininess(40);
  specularMaterial(violeta, 60, 70);
  noStroke();
  torus(100, 50, 50, 100);
pop();
}
