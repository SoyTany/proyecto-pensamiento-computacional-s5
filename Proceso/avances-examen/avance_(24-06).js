// Link: https://editor.p5js.org/Fuyu_xoi/sketches/qFIO8aaOz

let pantallaActual = "menu";
let historialPantallas = [];
let desplazamientoY = 300; 
let velocidadAnimacion = 5; 

// Lista de botones del menú principal
let botones = [
  { texto: "General", hue: 132, sat: 75, bri: 69, pantalla: "general", alfa: 0, y: 0 },
  { texto: "Personajes", hue: 45, sat: 85, bri: 89, pantalla: "personajes", alfa: 0, y: 0 },
  { texto: "Mapas",   hue: 21, sat: 85, bri: 87, pantalla: "mapas",   alfa: 0, y: 0 },
  { texto: "Objetos", hue: 21, sat: 11, bri: 74, pantalla: "objetos", alfa: 0, y: 0 }
];

let btnW = 300;
let btnH = 45;
let cardW = 320;

// --- CONTROL DE ANIMACIÓN PERSONAJES ---
let tarjetaAbierta = false;
let altoTarjeta = 220; 
let alfaTexto = 0;
let tarjetaNicteAbierta = false;
let altoTarjetaNicte = 220;
let alfaTextoNicte = 0;
let tarjetaPersefoneAbierta = false;
let altoTarjetaPersefone = 220;
let alfaTextoPersefone = 0;

// --- CONFIGURACIÓN PARA PANTALLA MAPAS ---
let cards = [];
let activeCard = -1;
let imgMapas = []; 

let titulosMapas = ["TÁRTARO", "ASFÓDELOS", "ELÍSEO", "TEMPLO DEL ESTIGIA"];
let descripcionesMapas = [
  "• El Tártaro es la primera región del Inframundo. Un pozo oscuro donde las almas de los malvados son castigadas por la eternidad.\n\n• Es el hogar de las Furias y de pruebas diseñadas por el mismísimo Hades para evitar escapes.",
  "• Los Campos de Asfódelos son una vasta llanura de cenizas y ríos de lava ardiente.\n\n• Aquí residen las almas que no fueron ni buenas ni malas en vida, vagando sin rumbo en un limbo eterno.",
  "• El Elíseo es un paraíso para las almas de los héroes y virtuosos. Un lugar de belleza eterna y vegetación brillante.\n\n• Es custodiado por Teseo y el Minotauro, quienes detienen a todo aquel que intente subir a la superficie.",
  "• El Templo del Estigia es el último lugar que atraviesa Zagreo antes de llegar a la superficie. Un enorme templo construido alrededor del mítico río.\n\n• La salida está custodiada por Cerbero, el perro de tres cabezas. El jugador debe explorar los túneles para encontrar el Saco Fétido y convencerlo de que se aparte."
];

let zagreusTarjeta, nicteTarjeta, persefoneTarjeta;
let fondoMenu, zagreusMenu, hadesLogo;
let spectral, caesar;

// ------------------------------------------------------------------
// CLASE CARD: OPTIMIZADA PARA DESAPARICIÓN INSTANTÁNEA
// ------------------------------------------------------------------
class Card {
  constructor(x, y, w, h, num, titulo, descripcion, imagen) {
    this.initialX = x;
    this.initialW = w;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h; 
    this.num = num; 
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;

    this.targetX = x;
    this.targetW = w;
    this.alpha = 255;
  }

  update() {
    this.x = lerp(this.x, this.targetX, 0.15); // Un toque más rápido para que la expansión se sienta mejor
    this.w = lerp(this.w, this.targetW, 0.15);
  }

  display() {
    // CAMBIO CLAVE: Si otra tarjeta está activa, la opacidad de esta cae a 0 de inmediato. No usamos lerp aquí.
    if (activeCard !== -1 && activeCard !== this.num - 1) {
      this.alpha = 0;
    } else {
      this.alpha = 255;
    }

    // Solo dibujamos si es la tarjeta activa o si ninguna está activa
    if (this.alpha > 0 && this.imagen) {
      push();
      
      tint(255, this.alpha);
      imageMode(CORNER);
      
      if (activeCard === -1) {
        // Modo Inicial (Grilla Cerrada): Cortada y organizada en columnas limpias
        let sx = this.imagen.width / 4 * (this.num - 1); 
        let sw = this.imagen.width / 4;
        image(this.imagen, this.x, this.y, this.w, this.h, sx, 0, sw, this.imagen.height);
      } else {
        // Modo Tarjeta Expandida: Ocupa su espacio objetivo fluido sin fantasmas de los otros mapas de fondo
        image(this.imagen, this.x, this.y, this.w, this.h);
      }
      
      pop();
    }

    // --- PANEL DE TEXTO BURDEO INFORMATIVO (Izquierda) ---
    if (activeCard === this.num - 1) {
      push();
      noStroke();
      fill(359, 95, 12); 
      rect(50, 50, width * 0.32, height - 100, 10);

      fill(0, 0, 100);
      textAlign(LEFT, TOP);
      if (caesar) textFont(caesar);
      textSize(28);
      text(this.titulo, 80, 90);

      fill(0, 0, 95);
      if (spectral) textFont(spectral);
      textSize(14);
      textLeading(24);
      text(this.descripcion, 80, 160, width * 0.32 - 60);

      fill(0, 0, 50);
      textSize(11);
      text("HAZ CLIC EN ESTE CUADRO O PULSA ESC PARA VOLVER", 80, height - 90);
      pop();
    }
  }
}

// ------------------------------------------------------------------
// CONFIGURACIÓN DE RECURSOS
// ------------------------------------------------------------------
function preload() {
  fondoMenu = loadImage('imagenes/menu/fondomenu.png', () => {}, () => console.log("Falta fondomenu"));
  zagreusMenu = loadImage('imagenes/menu/zagreusmenu.png', () => {}, () => console.log("Falta zagreusmenu"));
  hadesLogo = loadImage('imagenes/menu/hadeslogo.png', () => {}, () => console.log("Falta hadeslogo"));
  
  zagreusTarjeta = loadImage('imagenes/personajes/zagreustarjeta.png', () => {}, () => console.log("Falta zagreustarjeta"));
  nicteTarjeta = loadImage('imagenes/personajes/nictetarjeta.png', () => {}, () => console.log("Falta nictetarjeta"));
  persefoneTarjeta = loadImage('imagenes/personajes/persefonetarjeta.png', () => {}, () => console.log("Falta persefonetarjeta"));
  
  imgMapas[0] = loadImage('imagenes/mapas/zona1.png', () => {}, () => console.log("Falta zona1"));
  imgMapas[1] = loadImage('imagenes/mapas/zona2.png', () => {}, () => console.log("Falta zona2"));
  imgMapas[2] = loadImage('imagenes/mapas/zona3.png', () => {}, () => console.log("Falta zona3"));
  imgMapas[3] = loadImage('imagenes/mapas/zona4.png', () => {}, () => console.log("Falta zona4"));

  loadFont('fuentes/SpectralSCLight.ttf', f => spectral = f, () => console.log("Usando fuente default"));
  loadFont('fuentes/CaesarDressing.ttf', f => caesar = f, () => console.log("Usando fuente default"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  inicializarTarjetasMapas();
}

function draw() {
  background(2, 89, 41); 
  
  if (fondoMenu) {
    push();
    tint(0, 0, 100, 0.25);
    image(fondoMenu, 0, 0, width, height);
    pop();
  }

  if (desplazamientoY > 0) desplazamientoY -= velocidadAnimacion;

  let cx = width / 2;
  let cy = height / 2;

  if (pantallaActual === "menu") dibujarMenuPrincipal(cx, cy);
  else if (pantallaActual === "general") dibujarMenuGeneral(cx, cy);
  else if (pantallaActual === "personajes") dibujarMenuPersonajes(cx, cy);
  else if (pantallaActual === "mapas") dibujarMenuMapas();
  else if (pantallaActual === "objetos") dibujarMenuObjetos(cx, cy);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inicializarTarjetasMapas();
}

function inicializarTarjetasMapas() {
  cards = [];
  let startX = width * 0.08;
  let totalW = width * 0.84;
  let gap = 20; 
  let w_individual = (totalW - (gap * 3)) / 4; 

  for (let i = 0; i < 4; i++) {
    cards.push(new Card(
      startX + i * (w_individual + gap), 
      90, 
      w_individual,
      height - 180,
      i + 1,
      titulosMapas[i],
      descripcionesMapas[i],
      imgMapas[i]
    ));
  }
  activeCard = -1;
}

// ------------------------------------------------------------------
// RENDERS DE PANTALLAS
// ------------------------------------------------------------------
function dibujarMenuMapas() {
  push();
  noStroke();
  fill(359, 95, 12); 
  rect(50, 50, width - 100, height - 100, 10);
  pop();

  for (let card of cards) {
    card.update();
    card.display();
  }

  noFill();
  strokeWeight(2);
  stroke(21, 95, 60); 
  rect(30, 30, width - 60, height - 60, 15);
}

function dibujarMenuPersonajes(cx, cy) {
  let anchoReal = cardW - 60; 
  let espacioEntreTarjetas = 30;
  let cardY = cy - 180;
  
  let xNicte = cx - anchoReal / 2;
  let xZagreus = xNicte - anchoReal - espacioEntreTarjetas;
  let xPersefone = xNicte + anchoReal + espacioEntreTarjetas;

  let altoObjetivoZag = tarjetaAbierta ? 500 : 220;
  altoTarjeta = lerp(altoTarjeta, altoObjetivoZag, 0.1);
  let alfaObjetivoZag = tarjetaAbierta ? 100 : 0;
  alfaTexto = lerp(alfaTexto, alfaObjetivoZag, 0.1);

  let altoObjetivoNic = tarjetaNicteAbierta ? 500 : 220;
  altoTarjetaNicte = lerp(altoTarjetaNicte, altoObjetivoNic, 0.1);
  let alfaObjetivoNic = tarjetaNicteAbierta ? 100 : 0;
  alfaTextoNicte = lerp(alfaTextoNicte, alfaObjetivoNic, 0.1);

  let altoObjetivoPer = tarjetaPersefoneAbierta ? 500 : 220;
  altoTarjetaPersefone = lerp(altoTarjetaPersefone, altoObjetivoPer, 0.1);
  let alfaObjetivoPer = tarjetaPersefoneAbierta ? 100 : 0;
  alfaTextoPersefone = lerp(alfaTextoPersefone, alfaObjetivoPer, 0.1);
  
  let descripcionZagreus = "Zagreus, príncipe del Inframundo e hijo de Hades, fue criado por Nyx. Al descubrir una carta de su verdadera madre, Perséfone, decide escapar del reino de su padre. No importa cuántas veces muera en el intento; siempre volverá a levantarse.";
  let descripcionNicte = "Nyx, la personificación de la noche, habita en la Casa de Hades. Tras la partida de Perséfone, se convirtió en la madre sustituta de Zagreus, apoyando incondicionalmente su escape del Inframundo.";
  let descripcionPersefone = "Perséfone, diosa de la vegetación, gobernó como Reina del Inframundo junto a Hades. Tras el nacimiento de Zagreus, huyó desolada al mundo mortal, provocando un invierno eterno sobre la Tierra.";

  // ZAGREUS
  push();
  noStroke(); fill(359, 95, 15); rect(xZagreus, cardY, anchoReal, altoTarjeta, 12);
  fill(0, 0, 100); textAlign(CENTER, CENTER); if (caesar) textFont(caesar); textSize(40); text("ZAGREUS", xZagreus + anchoReal / 2, cardY - 30);
  if (zagreusTarjeta) { imageMode(CENTER); image(zagreusTarjeta, xZagreus + anchoReal / 2, cardY + 120, 190, 190); }
  if (alfaTexto > 5) {
    fill(0, 0, 100, alfaTexto); textAlign(LEFT, TOP); if (spectral) textFont(spectral); textSize(13); textLeading(18); 
    text(descripcionZagreus, xZagreus + 15, cardY + 220, anchoReal - 30, altoTarjeta - 235);
  }
  pop();

  // NYX
  push();
  noStroke(); fill(250, 75, 15); rect(xNicte, cardY, anchoReal, altoTarjetaNicte, 12);
  fill(0, 0, 100); textAlign(CENTER, CENTER); if (caesar) textFont(caesar); textSize(40); text("NYX", xNicte + anchoReal / 2, cardY - 30);
  if (nicteTarjeta) { imageMode(CENTER); image(nicteTarjeta, xNicte + anchoReal / 2, cardY + 120, 190, 190); }
  if (alfaTextoNicte > 5) {
    fill(0, 0, 100, alfaTextoNicte); textAlign(LEFT, TOP); if (spectral) textFont(spectral); textSize(13); textLeading(18); 
    text(descripcionNicte, xNicte + 15, cardY + 220, anchoReal - 30, altoTarjetaNicte - 235);
  }
  pop();

  // PERSÉFONE
  push();
  noStroke(); fill(132, 65, 20); rect(xPersefone, cardY, anchoReal, altoTarjetaPersefone, 12);
  fill(0, 0, 100); textAlign(CENTER, CENTER); if (caesar) textFont(caesar); textSize(40); text("PERSÉFONE", xPersefone + anchoReal / 2, cardY - 30);
  if (persefoneTarjeta) { imageMode(CENTER); image(persefoneTarjeta, xPersefone + anchoReal / 2, cardY + 120, 190, 190); }
  if (alfaTextoPersefone > 5) {
    fill(0, 0, 100, alfaTextoPersefone); textAlign(LEFT, TOP); if (spectral) textFont(spectral); textSize(13); textLeading(18); 
    text(descripcionPersefone, xPersefone + 15, cardY + 220, anchoReal - 30, altoTarjetaPersefone - 235);
  }
  pop();

  noFill(); strokeWeight(width * 0.003 + 1); stroke(21, 95, 60); rect(50, 40, width - 100, height - 115, 15);
}

function dibujarMenuPrincipal(cx, cy) {
  if (hadesLogo) image(hadesLogo, 100, desplazamientoY, 1050, 420);
  if (zagreusMenu) image(zagreusMenu, 400, desplazamientoY, 1100, height + 3);
  
  let xFixed = 120; 
  for (let i = 0; i < botones.length; i++) {
    let btn = botones[i];
    btn.y = (cy - 50 + i * (btnH + 20)) + desplazamientoY; 
    
    let estaSobre = (mouseX > xFixed && mouseX < xFixed + btnW && mouseY > btn.y && mouseY < btn.y + btnH);
    btn.alfa = estaSobre ? 255 : 0; 
    
    dibujarBotonProgresivo(xFixed, btn.y, btnW, btnH, btn.texto, btn.hue, btn.sat, btn.bri, btn.alfa);
  }
}

function dibujarBotonProgresivo(x, y, w, h, texto, hue, sat, bri, alfa) {
  if (alfa > 0) {
    fill(hue, sat, bri); 
  } else {
    fill(hue, sat, bri * 0.4); 
  }
  
  stroke(hue, sat, bri);
  strokeWeight(2);
  rect(x, y, w, h, 8);
  
  fill(0, 0, 100); 
  noStroke();
  textAlign(CENTER, CENTER);
  if (caesar) textFont(caesar);
  textSize(22);
  text(texto, x + w / 2, y + h / 2);
}

// ------------------------------------------------------------------
// INTERACCIONES Y CLICS
// ------------------------------------------------------------------
function mousePressed() {
  if (desplazamientoY > 0) return; 

  let cx = width / 2;
  let cy = height / 2;

  if (pantallaActual === "menu") {
    let xFixed = 120;
    for (let btn of botones) {
      if (mouseX > xFixed && mouseX < xFixed + btnW && mouseY > btn.y && mouseY < btn.y + btnH) {
        pantallaActual = btn.pantalla;
        break;
      }
    }
  }
  else if (pantallaActual === "personajes") {
    let anchoReal = cardW - 60;
    let espacioEntreTarjetas = 30;
    let cardY = cy - 180; 
    let xNicte = cx - anchoReal / 2;
    let xZagreus = xNicte - anchoReal - espacioEntreTarjetas;
    let xPersefone = xNicte + anchoReal + espacioEntreTarjetas;

    if (mouseX > xZagreus && mouseX < xZagreus + anchoReal && mouseY > cardY && mouseY < cardY + 220) tarjetaAbierta = !tarjetaAbierta;
    if (mouseX > xNicte && mouseX < xNicte + anchoReal && mouseY > cardY && mouseY < cardY + 220) tarjetaNicteAbierta = !tarjetaNicteAbierta;
    if (mouseX > xPersefone && mouseX < xPersefone + anchoReal && mouseY > cardY && mouseY < cardY + 220) tarjetaPersefoneAbierta = !tarjetaPersefoneAbierta;
  }
  else if (pantallaActual === "mapas") {
    if (activeCard !== -1) {
      if (mouseX < width * 0.40) {
        cerrarTarjetaMapas();
      }
      return;
    }

    let startX = width * 0.08;
    let totalW = width * 0.84;
    let gap = 20; 
    let w_individual = (totalW - (gap * 3)) / 4;

    for (let i = 0; i < 4; i++) {
      let xInicio = startX + i * (w_individual + gap);
      let xFin = xInicio + w_individual;
      
      if (mouseX > xInicio && mouseX < xFin && mouseY > 90 && mouseY < height - 90) {
        activeCard = i;
        cards[i].targetX = width * 0.38; 
        cards[i].targetW = width * 0.57; 
        break;
      }
    }
  }
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    if (pantallaActual === "mapas" && activeCard !== -1) {
      cerrarTarjetaMapas();
    } else {
      pantallaActual = "menu";
    }
  }
}

function cerrarTarjetaMapas() {
  activeCard = -1;
  for (let i = 0; i < cards.length; i++) {
    cards[i].targetX = cards[i].initialX;
    cards[i].targetW = cards[i].initialW;
  }
}

function dibujarMenuGeneral(cx, cy) {
  noFill(); strokeWeight(2); stroke(21, 95, 60); rect(50, 40, width - 100, height - 115, 15);
}

function dibujarMenuObjetos(cx, cy) {
  noFill(); strokeWeight(2); stroke(21, 95, 60); rect(50, 40, width - 100, height - 115, 15);
}
