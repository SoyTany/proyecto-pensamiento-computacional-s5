let zagreusImg;

// Estado de la animación
let abierto = false;
let progreso = 0;
let objetivo = 0;

// Imagen de Zagreus desde GitHub
let urlZagreus =
  "https://raw.githubusercontent.com/Chrisploo/Bitacora-Pensamiento-Computacional/main/Recursos/Zagreus_Hades.png";

let descripcion =
  "Zagreo es el príncipe del Inframundo, hijo de Hades y protagonista del juego. Desde siempre ha sentido que no pertenece realmente a la morada de Hades. Por ello decide escapar, enfrentándose a la voluntad de su padre y abandonando el Inframundo cueste lo que cueste.";

function preload() {
  zagreusImg = loadImage(urlZagreus);
}

function setup() {
  createCanvas(360, 640);
  textFont("Georgia");
}

function draw() {
  background("#6b0505");

  // Animación suave
  progreso = lerp(progreso, objetivo, 0.09);

  if (abs(progreso - objetivo) < 0.01) {
    progreso = objetivo;
  }

  dibujarTituloPrincipal();
  dibujarTarjetaZagreus();

  if (mouseSobrePersonaje()) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  if (mouseSobrePersonaje()) {
    abierto = !abierto;

    if (abierto) {
      objetivo = 1;
    } else {
      objetivo = 0;
    }
  }
}

function dibujarTituloPrincipal() {
  let alphaTitulo = map(progreso, 0, 0.5, 255, 0);
  alphaTitulo = constrain(alphaTitulo, 0, 255);

  push();

  rectMode(CORNER);
  noStroke();

  fill(237, 190, 47, alphaTitulo);
  rect(38, 22, 284, 55, 30);

  fill(0, alphaTitulo);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(24);
  text("PERSONAJES", width / 2, 50);

  pop();
}

function dibujarTarjetaZagreus() {
  // Tarjeta cerrada
  let cardXcerrado = 38;
  let cardYcerrado = 200;
  let cardWcerrado = 285;
  let cardHcerrado = 210;

  // Tarjeta abierta
  let cardXabierto = 28;
  let cardYabierto = 60;
  let cardWabierto = 304;
  let cardHabierto = 540;

  // Movimiento de la tarjeta
  let cardX = lerp(cardXcerrado, cardXabierto, progreso);
  let cardY = lerp(cardYcerrado, cardYabierto, progreso);
  let cardW = lerp(cardWcerrado, cardWabierto, progreso);
  let cardH = lerp(cardHcerrado, cardHabierto, progreso);

  // Movimiento del título y la imagen
  let tituloY = lerp(145, 35, progreso);
  let imagenY = lerp(265, 180, progreso);
  let imagenTam = lerp(220, 190, progreso);

  push();

  rectMode(CORNER);
  imageMode(CENTER);
  noStroke();

  // Título del personaje
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(22);
  text("ZAGREUS", width / 2, tituloY);

  // Rectángulo principal que se expande
  fill("#2b0000");
  rect(cardX, cardY, cardW, cardH);

  // Fondo negro de la imagen
  fill(0);
  rectMode(CENTER);
  rect(width / 2, imagenY, imagenTam, imagenTam);

  // Imagen del personaje
  image(zagreusImg, width / 2, imagenY, imagenTam, imagenTam);

  // Texto con aparición suave
  let alphaTexto = map(progreso, 0.55, 1, 0, 255);
  alphaTexto = constrain(alphaTexto, 0, 255);

  rectMode(CORNER);

  let margen = 24;
  let textoX = cardX + margen;
  let textoY = cardY + 245;
  let textoW = cardW - margen * 2;
  let textoH = cardH - 270;

  fill(255, alphaTexto);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(9.5);
  textLeading(14);

  text(descripcion.toUpperCase(), textoX, textoY, textoW, textoH);

  pop();
}

function mouseSobrePersonaje() {
  let imagenY = lerp(265, 180, progreso);
  let imagenTam = lerp(220, 190, progreso);

  return (
    mouseX > width / 2 - imagenTam / 2 &&
    mouseX < width / 2 + imagenTam / 2 &&
    mouseY > imagenY - imagenTam / 2 &&
    mouseY < imagenY + imagenTam / 2
  );
}
