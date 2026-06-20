//link: https://editor.p5js.org/Tanytanita/sketches/37OVzQpCo
let pantallaActual = "menu";
let historialPantallas = [];

let desplazamientoY = 300; 
let velocidadAnimacion = 5; 

let alfaBoton1 = 0;
let alfaBoton2 = 0;
let alfaBoton3 = 0;

function preload(){
  imagen = loadImage('./imagenes/faqufih.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(28, 28, 30); 
  
  let cx = width / 2;
  let cy = height / 2;
  
  image(imagen, 0, 0, width, height);

  if (desplazamientoY > 0) {
    desplazamientoY -= velocidadAnimacion;
  } else {
    desplazamientoY = 0;
  }

  // Máquina de estados
  if (pantallaActual === "menu") {
    dibujarMenuPrincipal(cx, cy);
  } else if (pantallaActual === "personajes") {
    background(20);
    fill(255);
    textSize(24);
    text("Submenú de personajes listo", cx, cy);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// menú
function dibujarMenuPrincipal(cx, cy) {
  // Título y Subtítulo
  fill(100, 100, 100);
  noStroke();
  textSize(32);
  textAlign(CENTER, CENTER);
  text("SIMULADOR DE MOVIMIENTOS", cx, (cy - 120) + desplazamientoY);
  
  textSize(16);
  fill(150, 100, 100);
  text("Selecciona una categoría para comenzar", cx, (cy - 70) + desplazamientoY);

 //relleno
  let x = cx - 150;
  let w = 300;
  let h = 45;

  // Botón 1: Personajes
  let y1 = (cy - 20) + desplazamientoY;
  alfaBoton1 = calcularBrillo(x, y1, w, h, alfaBoton1);
  dibujarBotonProgresivo(x, y1, w, h, "Personajes", color(100, 100, 100), alfaBoton1);

  // Botón 2: Enemigos
  let y2 = (cy + 45) + desplazamientoY;
  alfaBoton2 = calcularBrillo(x, y2, w, h, alfaBoton2);
  dibujarBotonProgresivo(x, y2, w, h, "Enemigos", color(200, 100, 100), alfaBoton2);

  // Botón 3: Objetos y Armas
  let y3 = (cy + 110) + desplazamientoY;
  alfaBoton3 = calcularBrillo(x, y3, w, h, alfaBoton3);
  dibujarBotonProgresivo(x, y3, w, h, "Objetos y Armas", color(300, 100, 100), alfaBoton3);
}

// Calcula si el brillo debe subir o bajar 
function calcularBrillo(x, y, w, h, alfaActual) {
  let estaSobre = (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h);
  let velocidadBrillo = 15; // Qué tan rápido se ilumina (números más altos = más rápido)

  if (estaSobre) {
    alfaActual += velocidadBrillo; // Sube el brillo
  } else {
    alfaActual -= velocidadBrillo; // Baja el brillo
  }

  // Ponemos límites para que no baje de 0 ni pase de 255
  return constrain(alfaActual, 0, 255);
}

// Dibuja el botón usando Alfa
function dibujarBotonProgresivo(x, y, w, h, texto, colorBase, alfa) {
  
  //botón con la opacidad alfa
  let colorRelleno = color(red(colorBase), green(colorBase), blue(colorBase), alfa);
  fill(colorRelleno, 50, 100);
  stroke(colorBase); // El borde mantiene su color sólido
  strokeWeight(2);
  rect(x, y, w, h, 8);

  
  //  base con el blanco según el nivel de alfa.
  let colorTexto = lerpColor(colorBase, color(255), alfa / 255);
  
  noStroke();
  fill(colorTexto);
  textSize(16);
  textAlign(CENTER, CENTER);
  text(texto, x + w / 2, y + h / 2);
}

function mousePressed() {
  let cx = width / 2;
  let cy = height / 2;

  if (desplazamientoY > 0) return; // Bloqueo mientras se mueve

  if (pantallaActual === "menu") {
    if (mouseX > cx - 150 && mouseX < cx + 150) {
      if (mouseY > (cy - 20) && mouseY < (cy + 25))  pantallaActual = "personajes";
    }
  }
}
