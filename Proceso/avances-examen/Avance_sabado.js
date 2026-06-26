let pantallaActual = "menu";
let historialPantallas = [];
let desplazamientoY = 300; 
let velocidadAnimacion = 5; 

// Ordenamos los botones en una lista
let botones = [
  { texto: "General", hue: 132, sat: 75, bri: 69, pantalla: "general", alfa: 0, y: 0 },
  { texto: "Personajes", hue: 45, sat: 85, bri: 89, pantalla: "personajes", alfa: 0, y: 0 },
  { texto: "Enemigos",   hue: 21, sat: 85, bri: 87, pantalla: "enemigos",   alfa: 0, y: 0 },
  { texto: "Objetos y Armas", hue: 21, sat: 11, bri: 74, pantalla: "objetos", alfa: 0, y: 0 }
];

let btnW = 300;
let btnH = 45;

let fondoMenu, zagreusmenu, hadeslogo;
let spectral, caesar;

function preload() {
  //-------IMAGENES
  fondoMenu = loadImage('./imagenes/menu/fondomenu.png');
  zagreusMenu = loadImage('./imagenes/menu/zagreusmenu.png');
  hadesLogo = loadImage('./imagenes/menu/hadeslogo.png');
  
  //-------FUENTES
  spectral = loadFont('./fuentes/SpectralSCLight.ttf');
  caesar = loadFont('./fuentes/CaesarDressing.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(2, 89, 41); 
  
  push();
// con tint arreglamos la cantidad de transparencia de la imagen, 0 es sin tranparencia y 1 transparencia total
  tint(0, 0, 100, 0.25);
  image(fondoMenu, 0, 0, width, height);
  pop();

  // Animación de entrada
  if (desplazamientoY > 0) {
    desplazamientoY -= velocidadAnimacion;
  } else {
    desplazamientoY = 0;
  }

// Máquina de estados
  let cx = width / 2;
  let cy = height / 2;

  if (pantallaActual === "menu") {
    dibujarMenuPrincipal(cx, cy);
  } else if (pantallaActual === "personajes") {
    background(2, 89, 41);
    fill(1, 0, 100);
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Submenú de personajes listo", cx, cy);
  }
}
//convierte canvas a tamaño de windows
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// -------------------- SECCIÓN DEL MENÚ INICIAL
function dibujarMenuPrincipal(cx, cy) {
  let margenX = width * 0.04;
  let margenY = height * 0.05;
  let marcoW = width - (margenX * 2);
  let marcoH = height - (margenY * 2) - 35;
  
  // Título y Subtítulo
  fill(100, 0, 100);
  noStroke();
  textSize(9);
  textAlign(LEFT, BOTTOM);
  textFont(spectral);
  text("ESTUDIANTES: TANY - ZXXNIE - CHRIS\nPROFESOR: MATIAS SERRANO\nAYUDANTE: SANTIAGO GAETE", margenX + 15, (height - margenY - 39) + desplazamientoY);
  
push();
  fill(100, 0, 100);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  textFont(spectral);
  text("PENSAMIENTO COMPUTACIONAL", margenX * 12, (height - margenY - 47) + (desplazamientoY));
  pop();
  
push();
  fill(100, 0, 100);
  noStroke();
  textSize(10);
  textAlign(RIGHT, BOTTOM);
  textFont(spectral);
  text("Supergiant Games\nCreadores: Bastion,\nTransistor y Pyre", margenX * 24 - 16, (height - margenY - 39) + (desplazamientoY));
  pop();

  fill(150, 0, 100);
  textSize(24);
  textFont(spectral);
  text("ENCICLOPEDIA DE", margenX + 15, (height * 0.15) + desplazamientoY);

  noFill();
  strokeWeight(width * 0.003 + 1);
  stroke(359, 97, 20)
  rect(margenX, margenY, marcoW, marcoH, 20);

//-------------IMAGENES MENU ZAGREUS, HADES
  
  image(hadesLogo, 100, desplazamientoY, 1050, 420)
  image(zagreusMenu, 400, desplazamientoY, 1100, height + 3);
  
//-------------IMAGENES MENU ZAGREUS, HADES
  
  let x = (cx - btnW / 2) - 290;
  let yInicial = (cy - 20) + 20;

// Bucle para los botones y su generación
  for (let i = 0; i < botones.length; i++) {
    let btn = botones[i];
    btn.y = (yInicial + i * (btnH + 20)) + desplazamientoY; 
    btn.alfa = calcularBrillo(x, btn.y, btnW, btnH, btn.alfa);
    dibujarBotonProgresivo(x, btn.y, btnW, btnH, btn.texto, btn.hue, btn.sat, btn.bri, btn.alfa);
  }
}

function calcularBrillo(x, y, w, h, alfaActual) {
  let estaSobre = (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h);
  let velocidadBrillo = 12;

  alfaActual += estaSobre ? velocidadBrillo : -velocidadBrillo;
  return constrain(alfaActual, 0, 255);
}

function dibujarBotonProgresivo(x, y, w, h, texto, hue, sat, bri, alfa) {
  let colorBase = color(hue, sat, bri);
  
  // Fondo del botón
  fill(hue, sat, bri, alfa / 255);
  stroke(colorBase);
  strokeWeight(2);
  rect(x, y, w, h, 8);
  
  // Texto animado
  let colorTexto = lerpColor(colorBase, color(359, 97, 25), alfa / 255); //
  noStroke();
  fill(colorTexto);
  textSize(16);
  textAlign(CENTER, CENTER);
  textFont(caesar);
  text(texto, x + w / 2, y + h / 2);
}
//---------------------------------------------


// --- INTERACCIÓN ---

function mousePressed() {
  if (desplazamientoY > 0) return; //bloquea el click mientras sube

  if (pantallaActual === "menu") {
    let cx = width / 2;
    let x = cx - btnW / 2 - 265;
    
    for (let btn of botones) {
      if (mouseX > x && mouseX < x + btnW && mouseY > btn.y && mouseY < btn.y + btnH) {
        pantallaActual = btn.pantalla;
        break; 
      }
    }
  }
}

