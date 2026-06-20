# Experimentación personal
Tany creó una página web por medio de otro repositorio extra para experimentar  
con nuevos comandos de objetos 3d con p5 reference, ocupando sliders, boxs y  
torus para generar variables modificables a gusto.  

[Repositorio](https://github.com/SoyTany/blocks-with-color)  
[Página WEB](https://soytany.github.io/blocks-with-color/)  
[Sketch p5.js](https://editor.p5js.org/Tanytanita/sketches/pmkQ2h4B_)  

## HTML

<details>
<summary><b>Ver código html</b></summary>
  
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.13/lib/addons/p5.sound.min.js"></script>
    
    <link rel="stylesheet" type="text/css" href="style.css">
    <meta charset="utf-8" />

  </head>
  <body>
    <h1 class= "texto-fijo">RÓTAME</h1>
        <p class= "texto-fijo2">Puedes moverme en 360°</p>
    <h1 class= "texto-fijo3">¡Pruébalo!</h1>
        <p class= "texto-fijo4">Dona</p>
        <p class= "texto-fijo5">Caja</p>
    <p class= "texto-fijo6">Caja 2</p>
    <h1 class= "randomizador">Random Color</h1>
    
    <main>
    </main>
    <script src="sketch.js"></script>
  </body>
</html>
```
</details>

## CSS

<details>
<summary><b>Ver código css</b></summary>
  
```css
@font-face {
  font-family: 'Bitcount Grid Single';
  src: url('./Fonts/BitcountGridSingle_Cursive-Medium.ttf') format('truetype');
}

html, body {
  margin: 0;
  padding: 0;
  background: palevioletred;
}
canvas {
  display: block;
  
}
.texto-fijo {
  position: absolute;
  top: 0px;
  left: 20px;
  color: palevioletred;
  font-family: 'Bitcount Grid Single', sans-serif;
  font-weight: normal;
  font-size: 60px;
}
.texto-fijo2 {
  position: absolute;
  top: 60px;
  left: 20px;
  color: palevioletred;
  font-family: 'Bitcount Grid Single', sans-serif;
  font-weight: normal;
  font-size: 30px;
}
.texto-fijo3 {
  position: absolute;
  top: 105px;
  left: 10px;
  color: palevioletred;
  font-family: 'Bitcount Grid Single', sans-serif;
  font-weight: normal;
  font-size: 20px;
}
.texto-fijo4 {
  position: absolute;
  top: 160px;
  left: 17px;
  color: palevioletred;
  font-family: 'Bitcount Grid Single', sans-serif;
  font-weight: normal;
  font-size: 20px;
}
.texto-fijo5 {
  position: absolute;
  top: 260px;
  left: 17px;
  color: palevioletred;
  font-family: 'Bitcount Grid Single', sans-serif;
  font-weight: normal;
  font-size: 20px;
}
.texto-fijo6 {
  position: absolute;
  top: 360px;
  left: 17px;
  color: palevioletred;
  font-family: 'Bitcount Grid Single', sans-serif;
  font-weight: normal;
  font-size: 20px;
}
.randomizador{
  position: absolute;
  top: 600px;
  left: 17px;
  color: palevioletred;
  font-family: 'Bitcount Grid Single', sans-serif;
  font-weight: normal;
  font-size: 20px;
}
```
</details>

## SKETCH

<details>
<summary><b>Ver código sketch</b></summary>
  
```javascript
let yellowColor;
let violetColor;
let greenColor;
let skyColor;
let magentColor;
let violeta = 280;
let amarillo = 60;
let naranja = 10;
let celeste = 200;
let magenta = 320;
let verde = 130;
let font;

function preload() {
  font = loadFont ('./Fonts/BitcountGridSingle_Cursive-Medium.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 360, 100, 100);
  angleMode(DEGREES);
  yellowColor = amarillo;
  violetColor = violeta;
  greenColor = verde;
  skyColor = celeste;
  magentColor = magenta;
  
 // --------------------------- barra torus
  //barra de tono
  sliderHue = createSlider(0, 360, 180, 10);
  sliderHue.position(15, 200);
  sliderHue.size(100);
  //barra de saturación
  sliderSaturation = createSlider(0, 100, 50, 10);
  sliderSaturation.position(15, 215);
  sliderSaturation.size(100);
  //barra de brillo
  sliderBrightness = createSlider(0, 100, 50, 10);
  sliderBrightness.position(15, 230);
  sliderBrightness.size(100);
  
  //-----------------------------barra box yellow
  //barra tono
  sliderHue2 = createSlider(0, 360, 180, 10);
  sliderHue2.position(15, 300);
  sliderHue2.size(100);
  //barra de saturación
  sliderSaturation2 = createSlider(0, 100, 50, 10);
  sliderSaturation2.position(15, 315);
  sliderSaturation2.size(100);
  //barra de brillo
  sliderBrightness2 = createSlider(0, 100, 50, 10);
  sliderBrightness2.position(15, 330);
  sliderBrightness2.size(100);
  //------------------------------------------
  
  //barra tono
  sliderHue3 = createSlider(0, 360, 180, 10);
  sliderHue3.position(15, 400);
  sliderHue3.size(100);
  //barra saturación 
  sliderSaturation3 = createSlider(0, 100, 50, 10);
  sliderSaturation3.position(15, 415);
  sliderSaturation3.size(100)
  //barra brillo
  sliderBrightness3 = createSlider(0, 100, 50, 10);
  sliderBrightness3.position(15, 430);
  sliderBrightness3.size(100);
  //------------------------------------------
}

function draw() {
  let h1 = sliderHue.value();
  let s1 = sliderSaturation.value();
  let b1 = sliderBrightness.value();
  
  let h2 = sliderHue2.value();
  let s2 = sliderSaturation2.value();
  let b2 = sliderBrightness2.value();
  
  let h3 = sliderHue3.value();
  let s3 = sliderSaturation3.value();
  let b3 = sliderBrightness3.value();

  
//-----------------------------------------------------------
  let colorDinamico = map(mouseX + mouseY, 0, windowWidth + windowHeight, 0, 360);
  background(colorDinamico, 50, 100);
  pointLight(80, 50, 80, 200, 100, 100);
//-------------------------------------------------------------
  
push(); //esta es la dona
  translate(0, 0, 0);
  ambientLight(h1, s1, b1);
  shininess(40);
  specularMaterial(h1, s1, b1);
  noStroke();
  torus(100, 50, 50, 100);
pop();

push(); //caja amarilla
  translate(-500, -100, 0);
  ambientLight(yellowColor, 70, 80);
  specularMaterial(yellowColor, 60, 100);
  noStroke();
  box(300, 500, 300);
pop();
  
push(); //caja verde
  translate(-810, -200, 0);
  ambientLight(h2, s2, b2);
  specularMaterial(h2, s2, b2);
  noStroke();
  box(300, 700, 300);
pop();
  
push(); //caja azul
  translate(-810, -350, -310);
  ambientLight(skyColor, 80, 90);
  specularMaterial(skyColor, 60, 100);
  noStroke();
  box(300, 1000, 300);
pop();
  
push(); //caja magenta
  translate(-500, -250, -310);
  ambientLight(h3, s3, b3);
  specularMaterial(h3, s3, b3);
  noStroke();
  box(300, 800, 300);
pop();
  
push(); //texto experiencia personal
  textAlign(CENTER, CENTER);
  translate(0, 0, 0);
  fill("#FFFFFF");
  textFont(font);
  textSize(40);
  text("Experimentación personal", 0, -300);
pop();
  
//-------------------------------bloqueo del orbitCOntrol con barras
  
  if (mouseX > 13 && mouseX < 117 && mouseY > 198 && mouseY < 252 || mouseX > 13 && mouseX < 117 && mouseY > 298 && mouseY < 352 || mouseX > 13 && mouseX < 117 && mouseY > 398 && mouseY < 452){ 
  }else
    orbitControl();
  
//barra tono
  //sliderHue3 = createSlider(0, 360, 180, 10);
  //sliderHue3.position(15, 400);
  // sliderHue3.size(100);
  
//barra saturación 
  // sliderSaturation3 = createSlider(0, 100, 50, 10);
  // sliderSaturation3.position(15, 415);
  // sliderSaturation3.size(100)
  
//barra brillo
  // sliderBrightness3 = createSlider(0, 100, 50, 10);
  // sliderBrightness3.position(15, 430);
  // sliderBrightness3.size(100);
  }


//no tengo las teclas >_<
function mouseClicked(){
  
  //botón randomizador aún en proceso
  if (mouseX > 15 && mouseX < 120 && mouseY > 695 && mouseY < 710){     
    yellowColor = random(0, 360);
    skyColor = random(0, 360);
    magentColor = random(0, 360);
    greenColor = random(0, 360);
 }
}
```
</details>
