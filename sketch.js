let pantallaActual = "menu";
let historialPantallas = [];
let desplazamientoY = 300; 
let velocidadAnimacion = 5; 

let textoX = 665;  //desde la izquierda detras de la imagen
let textoOpacidad = 0; //invisible para efecto entrada
let generalAncho = 490; //

// Ordenamos los botones en una lista
let botones = [
  { texto: "General", hue: 132, sat: 75, bri: 69, pantalla: "general", alfa: 0, y: 0 },
  { texto: "Personajes", hue: 45, sat: 85, bri: 89, pantalla: "personajes", alfa: 0, y: 0 },
  { texto: "Mapas",   hue: 21, sat: 85, bri: 87, pantalla: "mapas",   alfa: 0, y: 0 },
  { texto: "Objetos", hue: 21, sat: 11, bri: 74, pantalla: "objetos", alfa: 0, y: 0 }
];

let btnW = 300;
let btnH = 45;
let cardW = 320;

// --- CONTROL DE ANIMACIÓN: ZAGREUS (IZQUIERDA) ---
let tarjetaAbierta = false;
let altoTarjeta = 220; 
let alfaTexto = 0;

// --- CONTROL DE ANIMACIÓN: NÍCTE (MEDIO) ---
let tarjetaNicteAbierta = false;
let altoTarjetaNicte = 220;
let alfaTextoNicte = 0;

// --- CONTROL DE ANIMACIÓN: PERSÉFONE (DERECHA) ---
let tarjetaPersefoneAbierta = false;
let altoTarjetaPersefone = 220;
let alfaTextoPersefone = 0;

let mapaActivo = -1;
let mapasX = [0, 0, 0, 0];
let mapasW = [0, 0, 0, 0];

// VARIABLES MAPAS ZONAS
let zona1, zona2, zona3, zona4;

let titulosMapas = ["TÁRTARO", "ASFÓDELOS", "ELÍSEO", "TEMPLO DEL ESTIGIA"];
let descripcionesMapas = [
  "• El Tártaro es la primera región del Inframundo. Un pozo oscuro donde las almas de los malvados son castigadas por la eternidad.\n\n• Es el hogar de las Furias y de pruebas diseñadas por el mismísimo Hades para evitar escapes.",
  "• Los Campos de Asfódelos son una vasta llanura de cenizas y ríos de lava ardiente.\n\n• Aquí residen las almas que no fueron ni buenas ni malas en vida, vagando sin rumbo en un limbo eterno.",
  "• El Elíseo es un paraíso para las almas de los héroes y virtuosos. Un lugar de belleza eterna y vegetación brillante.\n\n• Es custodiado por Teseo y el Minotauro, quienes detienen a todo aquel que intente subir a la superficie.",
  "• El Templo del Estigia es el último lugar que atraviesa Zagreo antes de llegar a la superficie. Un enorme templo construido alrededor del mítico río.\n\n• La salida está custodiada por Cerbero, el perro de tres cabezas. El jugador debe explorar los túneles para encontrar el Saco Fétido y convencerlo de que se aparte."
];
//--------------------variables de imagenes principales
let zagreusTarjeta, nicteTarjeta, persefoneTarjeta;
let portadaHades;
let fondoMenu, zagreusMenu, hadesLogo;
//---------------------tipografía
let spectral, caesar;
//---------------------------Funciones mouseWheel
let subPantallaObjetos = 0; 
// 0 = Fila de objetos, 1 = Vista al detalle
let objetoSeleccionado = 0;
let radioNoria = 220;
let centroNoriaX;
let centroNoriaY;
let anguloBase = 0;
let anguloDestino = 0;
//--------------------------variables para los objetos
let objetos = [];
let imgBendiciones, imgEscudo, imgEspada, imgObolo, imgOscuridad;
//-----------------------------------------------------
function preload() {
  //-------IMAGENES
  fondoMenu = loadImage ('./imagenes/menu/fondomenu.png');
  zagreusMenu = loadImage ('./imagenes/menu/zagreusmenu.png');
  hadesLogo = loadImage ('./imagenes/menu/hadeslogo.png');
  zagreusTarjeta = loadImage ('./imagenes/personajes/zagreustarjeta.png')
   nicteTarjeta = loadImage ('./imagenes/personajes/nictetarjeta.png');
  persefoneTarjeta = loadImage ('./imagenes/personajes/persefonetarjeta.png');
  portadaHades = loadImage ('./imagenes/general/portadahadesgeneral.png')

//IMAGENES MAPAS
  zona1 = loadImage('./imagenes/mapas/zona1.png');
  zona2 = loadImage('./imagenes/mapas/zona2.png');
  zona3 = loadImage('./imagenes/mapas/zona3.png');
  zona4 = loadImage('./imagenes/mapas/zona4.png');

//IMÁGENES DE OBJETOS
  imgBendiciones = loadImage('./imagenes/objetos/boons.png');
  imgEscudo = loadImage('./imagenes/objetos/escudo.png');
  imgEspada = loadImage('./imagenes/objetos/espada.png');
  imgObolo = loadImage('./imagenes/objetos/obolo.png');
  imgOscuridad = loadImage('./imagenes/objetos/oscuridad.png'); 
  
  //-------FUENTES
  spectral = loadFont('./fuentes/SpectralSCLight.ttf');
  caesar = loadFont('./fuentes/CaesarDressing.ttf');
}
//--------------------------------------------------------
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
 centroNoriaX = width - 40; 
  centroNoriaY = height / 2;

  // Datos de objetos en la rueda
  objetos = [
    {
      nombre: "ESPADA ESTIGIANA",
      desc: "Estigiana, la espada del Inframundo, a buen seguro una de las mejores armas jamás forjadas cuando estaba de una pieza. Cuando los seis dioses mayores confinaron a los Titanes en las profundidades del Tártaro, ese acero tuvo no poco que ver con la victoria.",
      img: imgEspada
    },
    {
      nombre: "ESCUDO ÉGIDA",
      desc: "Égida, el Escudo del Caos, desciende de la mismísima égida que empuñaron Zeus y su hija preferida, Atenea... El dios del trueno defendió a sus hermanos y hermanas usando este escudo cuando, juntos, planearon expulsar a los Titanes.",
      img: imgEscudo
    },
    {
      nombre: "BENDICIONES",
      desc: "Los favores olímpicos te otorgan la fuerza de los dioses. Cada bendición modifica tus ataques, técnicas o carreras, desatando efectos elementales como rayos, resacas marinas o efectos de estado críticos para sobrevivir al Inframundo.",
      img: imgBendiciones
    },
    {
      nombre: "ÓBOLO DE CARONTE",
      desc: "La moneda de cambio empleada por los muertos y el propio Caronte en su barca. Acumular suficiente oro te permitirá adquirir valiosas mejoras, elementos de curación o pomadas de fuerza en los pozos y tiendas del Inframundo.",
      img: imgObolo
    },
    {
      nombre: "OSCURIDAD",
      desc: "Un recurso permanente que se extrae de las profundidades del Tártaro. Utilízala en el Espejo de la Noche en tus aposentos para mejorar permanentemente los atributos de Zagreus, como la vida, el daño por la espalda o las vidas extras.",
      img: imgOscuridad
    }
  ];
}
//---------------------------------------------
function draw() {
  centroNoriaX = width - 40;  
  centroNoriaY = height / 2;
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
  } else if (pantallaActual === "general"){
    dibujarMenuGeneral(cx, cy);
  } else if (pantallaActual === "personajes"){
    dibujarMenuPersonajes(cx, cy);
  } else if (pantallaActual === "mapas"){
    dibujarMenuMapas(cx, cy);
  } else if (pantallaActual ==="objetos"){
    dibujarMenuObjetos(cx, cy);
  }
}
//convierte canvas a tamaño de windows
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// -------------------- SECCIÓN DE PANTALLAS
function dibujarMenuGeneral(cx, cy){
//rectángulo base
  rectMode(CENTER);
  fill(359, 0, 0, 0.4); 
  noStroke();
  rect(cx, cy, 980, 550, 15); 
  rectMode(CORNER);
//posición imagen
  let imagenX = cx - 440; 
  let imagenY = cy - 240;
  let imagenAncho = 450;
  let imagenAlto = 480;

  //mouse sobre
  let mouseSobreImagen = (mouseX > imagenX && mouseX < imagenX + imagenAncho && mouseY > imagenY && mouseY < imagenY + imagenAlto);

  //dirección del texto
  let metaX;
  let metaOpacidad;
  let metaAncho;
  
  if (mouseSobreImagen) {
    cursor(HAND); 
    metaX = cx + 50; // Se expande 
    metaOpacidad = 255; // Se vuelve visible
    metaAncho = 950; //ancho máximo fondo
  } else {
    cursor(ARROW); // Vuelve a la flecha normal
    metaX = cx - 200; // Se esconde hacia la izquierda 
    metaOpacidad = 0; // Se vuelve invisible
    metaAncho = 530; //ancho máximo fondo
  }
  //suaviza el movimiento horizontal del texto
  textoX = lerp(textoX, metaX, 0.1);
  
 if (abs(textoOpacidad - metaOpacidad) < 15) {
    textoOpacidad = metaOpacidad;
  } else if (textoOpacidad < metaOpacidad) {
    textoOpacidad = textoOpacidad + 15; 
  } else if (textoOpacidad > metaOpacidad) {
    textoOpacidad = textoOpacidad - 15; 
  }
  //opacidad
 if (abs(generalAncho - metaAncho) < 25) {
    generalAncho = metaAncho;
  } else if (generalAncho < metaAncho) {
    generalAncho = generalAncho + 25; 
  } else if (generalAncho > metaAncho) {
    generalAncho = generalAncho - 25; 
  }

  fill(0, 0, 0, 0.7); 
  noStroke();
  rect(cx - 480, cy - 265, generalAncho+8, 530, 15);

  let descripcionHades = "Hades es un videojuego de acción roguelike desarrollado por Supergiant Games, inspirado en la mitología griega. En él, controlas a Zagreo, el hijo del dios del Inframundo, quien intenta escapar del reino de los muertos enfrentándose a criaturas, dioses y poderosos guardianes. A medida que avanzas, obtienes nuevas habilidades, armas y bendiciones que modifican la forma de jugar. Gracias a la combinación de escenarios generados de manera procedimental, recompensas aleatorias y diferentes elecciones durante cada recorrido, ninguna partida es exactamente igual a otra, haciendo que cada intento de escape sea una experiencia única.";

  push();
  fill(0, 0, 100, textoOpacidad / 255); 
  noStroke();
  textFont(spectral);
  textSize(18);
  textLeading(26); 
  textAlign(LEFT, TOP);
  
  let anchoMaximoTexto = 370; 
  text(descripcionHades, textoX, imagenY + 40, anchoMaximoTexto);
  pop();

  imageMode(CORNER);
  image(portadaHades, imagenX-25, imagenY+25, imagenAncho + 60, imagenAlto-55);
  
  noFill();
  strokeWeight(width * 0.003 + 1);
  stroke(21, 95, 60); 
  rect(40, 40, width - 80, height - 80, 15);
}
function dibujarMenuPrincipal(cx, cy) {
  push();
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
  text("ENCICLOPEDIA DE", margenX + 15, (height - 900)+ desplazamientoY);

  noFill();
  strokeWeight(width * 0.003 + 1);
  stroke(359, 97, 20)
  rect(margenX, margenY, marcoW, marcoH, 20);

//-------------IMAGENES MENU ZAGREUS, HADES
  
  image(hadesLogo, 130, desplazamientoY, 1700, 450)
  image(zagreusMenu, 800, desplazamientoY, 1500, height + 3);
  
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
  pop();
}
function dibujarMenuPersonajes(cx, cy) {
  let anchoReal = cardW - 60; // 260px reales
  let espacioEntreTarjetas = 30;
  let cardY = cy - 180;
  
  let xNicte = cx - anchoReal / 2;
  let xZagreus = xNicte - anchoReal - espacioEntreTarjetas;
  let xPersefone = xNicte + anchoReal + espacioEntreTarjetas;

  //ANIMACIÓN ZAGREUS TARJETA
  let altoObjetivoZag = tarjetaAbierta ? 500 : 220;
  altoTarjeta = lerp(altoTarjeta, altoObjetivoZag, 0.1);
  let alfaObjetivoZag = tarjetaAbierta ? 100 : 0;
  alfaTexto = lerp(alfaTexto, alfaObjetivoZag, 0.1);
//ANIMACIÓN NICTE TARJETA
  let altoObjetivoNic = tarjetaNicteAbierta ? 500 : 220;
  altoTarjetaNicte = lerp(altoTarjetaNicte, altoObjetivoNic, 0.1);
  let alfaObjetivoNic = tarjetaNicteAbierta ? 100 : 0;
  alfaTextoNicte = lerp(alfaTextoNicte, alfaObjetivoNic, 0.1);
  //ANIMACIÓN PERSEFONE TARJETA
  let altoObjetivoPer = tarjetaPersefoneAbierta ? 500 : 220;
  altoTarjetaPersefone = lerp(altoTarjetaPersefone, altoObjetivoPer, 0.1);
  let alfaObjetivoPer = tarjetaPersefoneAbierta ? 100 : 0;
  alfaTextoPersefone = lerp(alfaTextoPersefone, alfaObjetivoPer, 0.1);
  
//------------ DIBUJO DE LA TARJETA --------------------
  let descripcionZagreus = "Zagreus, príncipe del Inframundo e hijo de Hades, fue criado por Nyx. Desde temprana edad fue entrenado para gobernar el Inframundo, pues algún día heredaría el trono de su padre. También recibió una rigurosa formación en combate cuerpo a cuerpo. A pesar de todo esto, nunca llegó a sentirse realmente en casa.. Al descubrir una carta de su verdadera madre, Perséfone, explicando su dolorosa partida, decide escapar del reino de su padre. No importa cuántas veces muera en el intento; siempre volverá a levantarse para encontrar la verdad."
  
  let descripcionNicte = "Nyx, la personificación de la noche e hija de Chaos, habita en la Casa de Hades donde aconseja y supervisa a los dioses ctónicos. Tras la partida de Perséfone, se convirtió en la madre sustituta de Zagreus, pactando en secreto con el Destino para revivirlo luego de que este naciera sin vida. Sin embargo, es incapaz de mirar a Zagreo sin sentir culpa por las condiciones que ahora lo atan al reino; por ello, apoya incondicionalmente su escape y fue la primera en contactar al Olimpo para ayudarlo."

  let descripcionPersefone = "Perséfone, diosa de la vegetación e hija de Deméter, gobernó como Reina del Inframundo junto a Hades tras ser traída desde el Olimpo por Zeus. Aunque Hades temía las consecuencias, respetó que ella no quisiera regresar al Olimpo y le otorgó plena libertad en su reino. Tras el nacimiento de Zagreus, huyó desolada al mundo mortal, provocando que Hades prohibiera estrictamente mencionar su nombre en la Casa. Su desaparición sumió a Deméter en una profunda pena, desatando un invierno eterno sobre la Tierra."

  let sobreZagreus = (mouseX > xZagreus && mouseX < xZagreus + anchoReal && mouseY > cardY && mouseY < cardY + 220);
  let sobreNicte = (mouseX > xNicte && mouseX < xNicte + anchoReal && mouseY > cardY && mouseY < cardY + 220);
  let sobrePersefone = (mouseX > xPersefone && mouseX < xPersefone + anchoReal && mouseY > cardY && mouseY < cardY + 220);

// el cursor cambia cuando pasa por arriba de la imagen
if (sobreZagreus || sobreNicte || sobrePersefone) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
//TARJETA ZAGREUS
  push();
  noStroke();
  fill(359, 95, 15); 
  rect(xZagreus, cardY, anchoReal, altoTarjeta, 12);

  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textFont(caesar);
  textSize(40);
  text("ZAGREUS", xZagreus + anchoReal / 2, cardY - 30);

  imageMode(CENTER);
  image(zagreusTarjeta, xZagreus + anchoReal / 2, cardY + 120, 190, 190);

  if (alfaTexto > 5) {
    fill(0, 0, 100, alfaTexto); 
    textAlign(LEFT, TOP);
    textFont(spectral);
    textSize(13);
    textLeading(18); 
    text(descripcionZagreus, xZagreus + 15, cardY + 220, anchoReal - 30, altoTarjeta - 235);
  }
  pop();
  //TARJETA NICTE
  push();
  noStroke();
  fill(250, 75, 15); // Un tono oscuro nocturno (Azul/Morado HSB)
  rect(xNicte, cardY, anchoReal, altoTarjetaNicte, 12);

  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textFont(caesar);
  textSize(40);
  text("NYX", xNicte + anchoReal / 2, cardY - 30);

  imageMode(CENTER);
  image(nicteTarjeta, xNicte + anchoReal / 2, cardY + 120, 190, 190);

  if (alfaTextoNicte > 5) {
    fill(0, 0, 100, alfaTextoNicte); 
    textAlign(LEFT, TOP);
    textFont(spectral);
    textSize(13);
    textLeading(18); 
    text(descripcionNicte, xNicte + 15, cardY + 220, anchoReal - 30, altoTarjetaNicte - 235);
  }
  pop();
  //TARJETA PERSEFONE
  push();
  noStroke();
  fill(132, 65, 20); // Un verde/oliva profundo conectado con la naturaleza y primavera (HSB)
  rect(xPersefone, cardY, anchoReal, altoTarjetaPersefone, 12);

  fill(0, 0, 100);
  textAlign(CENTER, CENTER);
  textFont(caesar);
  textSize(40);
  text("PERSÉFONE", xPersefone + anchoReal / 2, cardY - 30);

  imageMode(CENTER);
  image(persefoneTarjeta, xPersefone + anchoReal / 2, cardY + 120, 190, 190);

  if (alfaTextoPersefone > 5) {
    fill(0, 0, 100, alfaTextoPersefone); 
    textAlign(LEFT, TOP);
    textFont(spectral);
    textSize(13);
    textLeading(18); 
    text(descripcionPersefone, xPersefone + 15, cardY + 220, anchoReal - 30, altoTarjetaPersefone - 235);
  }
  pop();

  //MARCO
  noFill();
  strokeWeight(width * 0.003 + 1);
  stroke(21, 95, 60); 
  rect(50, 40, width - 100, height - 115, 15);
}
function dibujarMenuMapas(cx, cy) {
cursor(ARROW);

  // agrupamos para procesarlas en for
  let imgMapas = [zona1, zona2, zona3, zona4];

  // Fondo burdeos sección
  push();
  noStroke();
  fill(359, 95, 12); 
  rect(50, 50, width - 100, height - 100, 10);
  pop();

  // Organiza las 4 columnas en la grilla
  let startX = width * 0.08;
  let totalW = width * 0.84;
  let gap = 20; 
  let w_individual = (totalW - (gap * 3)) / 4;
  let cardY = 90;
  let cardH = height - 180;

  // Renderiza y calcula animaciones fluidas
  for (let i = 0; i < 4; i++) {
    let metaX = startX + i * (w_individual + gap);
    let metaW = w_individual;

    if (mapaActivo === i) {
      metaX = width * 0.38; 
      metaW = width * 0.57; 
    }

    mapasX[i] = lerp(mapasX[i], metaX, 0.15);
    mapasW[i] = lerp(mapasW[i], metaW, 0.15);

    if (mapaActivo === -1) {
      let xInicioOriginal = startX + i * (w_individual + gap);
      if (mouseX > xInicioOriginal && mouseX < xInicioOriginal + w_individual && mouseY > cardY && mouseY < cardY + cardH) {
        cursor(HAND);
      }
    }

    let opacidad = (mapaActivo !== -1 && mapaActivo !== i) ? 0 : 255;

    if (opacidad > 0 && imgMapas[i]) {
      push();
      tint(255, opacidad);
      imageMode(CORNER);
      
      if (mapaActivo === -1) {
        let sx = imgMapas[i].width / 4 * i; 
        let sw = imgMapas[i].width / 4;
        image(imgMapas[i], mapasX[i], cardY, mapasW[i], cardH, sx, 0, sw, imgMapas[i].height);
      } else {
        image(imgMapas[i], mapasX[i], cardY, mapasW[i], cardH);
      }
      pop();
    }
  }

  if (mapaActivo !== -1) {
    if (mouseX < width * 0.40) cursor(HAND); 

    push();
    noStroke();
    fill(359, 95, 12); 
    rect(50, 50, width * 0.32, height - 100, 10);

    fill(0, 0, 100);
    textAlign(LEFT, TOP);
    if (caesar) textFont(caesar);
    textSize(40);
    text(titulosMapas[mapaActivo], 80, 100);

    fill(0, 0, 95);
    if (spectral) textFont(spectral);
    textSize(15);
    textLeading(22);
    text(descripcionesMapas[mapaActivo], 80, 160, width * 0.32 - 60);

    fill(0, 0, 50);
    if (spectral) textFont(spectral);
    textSize(11);
    text("HAZ CLIC EN ESTE CUADRO O PULSA ESC PARA VOLVER", 80, height - 100);
    pop();
  }
}
function dibujarMenuObjetos(cx, cy){
 push();
  fill(359, 95, 8); // Color de fondo burdeos oscuro
  rectMode(CORNER);
  rect(50, 40, width - 100, height - 115, 15);
  
  if (subPantallaObjetos === 0) {
    dibujarPantallaFila();
  } else if (subPantallaObjetos === 1) {
    dibujarPantallaDetalle();
  }

  //marco
  noFill();
  strokeWeight(width * 0.003 + 1);
  stroke(21, 95, 60); 
  rect(50, 40, width - 100, height - 115, 15);
  pop();
}
function dibujarPantallaFila() {
  textFont(caesar); // Enlazado con tu fuente cargada
  textAlign(CENTER, CENTER);
  fill(0, 0, 100); 
  textSize(28);
  text("SELECCIONA UN OBJETO", width / 2, 100);
  
  let totalObjetos = objetos.length;
  let espacio = width / (totalObjetos + 1);
  
  imageMode(CENTER); 

  for (let i = 0; i < totalObjetos; i++) {
    let x = espacio * (i + 1);
    let y = height / 2;
    
    let d = dist(mouseX, mouseY, x, y);
    if (d < 50) {
      cursor(HAND);
      image(objetos[i].img, x, y, 110, 110); 
    } else {
      image(objetos[i].img, x, y, 100, 100);
    }
    
    fill(0, 0, 90);
    textFont(caesar);
    textSize(14);
    text(objetos[i].nombre, x, y + 80);
  }
  pop();
}
function dibujarPantallaDetalle() {
  cursor(ARROW);
  anguloBase = lerp(anguloBase, anguloDestino, 0.1);
  
  // Noria lado derecho
  noFill();
  stroke(0, 50, 30); 
  strokeWeight(2);
  ellipse(centroNoriaX, centroNoriaY, radioNoria * 2);
  
  imageMode(CENTER);
  let totalObjetos = objetos.length;
  for (let i = 0; i < totalObjetos; i++) {
    let anguloObjeto = anguloBase + (TWO_PI / totalObjetos) * i;
    
    let x = centroNoriaX + radioNoria * cos(anguloObjeto);
    let y = centroNoriaY + radioNoria * sin(anguloObjeto);
    
    if (i === objetoSeleccionado) {
      fill(0, 0, 100, 0.2); 
      noStroke();
      ellipse(x, y, 80, 80);
      image(objetos[i].img, x, y, 70, 70);
    } else {
      image(objetos[i].img, x, y, 50, 50);
    }
    
    stroke(0, 50, 30, 0.4);
    strokeWeight(1);
    line(centroNoriaX, centroNoriaY, x, y);
  }
  
  // Detalles lado izquierdo
  let obj = objetos[objetoSeleccionado];
  
  textFont(caesar);
  textAlign(LEFT, TOP);
  textSize(32);
  fill(0, 0, 100);
  text(obj.nombre, 90, 120);
  
  textFont(spectral);
  textSize(15);
  fill(0, 0, 85);
  textLeading(24); 
  text(obj.desc, 90, 180, 380, 320); 
  
  image(obj.img, width * 0.55, height / 2, 250, 250);
}
function mouseWheel(event) {
  if (pantallaActual === "objetos" && subPantallaObjetos === 1) {
    if (event.delta > 0) {
      objetoSeleccionado = (objetoSeleccionado + 1) % objetos.length;
    } else {
      objetoSeleccionado = (objetoSeleccionado - 1 + objetos.length) % objetos.length;
    }
    anguloDestino = PI - (TWO_PI / objetos.length) * objetoSeleccionado;
    return false; 
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
  if (desplazamientoY > 0) return; 

  let cx = width / 2;
  let cy = height / 2;

  if (pantallaActual === "menu") {
    let x = cx - btnW / 2 - 265;
    for (let btn of botones) {
      if (mouseX > x && mouseX < x + btnW && mouseY > btn.y && mouseY < btn.y + btnH) {
        historialPantallas.push(pantallaActual);
        pantallaActual = btn.pantalla;

        if (pantallaActual === "mapas") {
          mapaActivo = -1;
          let startX = width * 0.08;
          let totalW = width * 0.84;
          let gap = 20; 
          let w_individual = (totalW - (gap * 3)) / 4;
          for (let i = 0; i < 4; i++) {
            mapasX[i] = startX + i * (w_individual + gap);
            mapasW[i] = w_individual;
          }
        }
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

    // Click en la cabecera de Zagreus
    if (mouseX > xZagreus && mouseX < xZagreus + anchoReal && mouseY > cardY && mouseY < cardY + 220) {
      tarjetaAbierta = !tarjetaAbierta; 
    }
    
    // Click en la cabecera de Nícte
    if (mouseX > xNicte && mouseX < xNicte + anchoReal && mouseY > cardY && mouseY < cardY + 220) {
      tarjetaNicteAbierta = !tarjetaNicteAbierta; 
    }
    
 // Click en Perséfone
    if (mouseX > xPersefone && mouseX < xPersefone + anchoReal && mouseY > cardY && mouseY < cardY + 220) {
      tarjetaPersefoneAbierta = !tarjetaPersefoneAbierta; 
    }
  }
  else if (pantallaActual === "mapas") {
    if (mapaActivo !== -1) {
      if (mouseX < width * 0.40) {
        mapaActivo = -1;
      }
    }
    else {
      let startX = width * 0.08;
      let totalW = width * 0.84;
      let gap = 20; 
      let w_individual = (totalW - (gap * 3)) / 4;
      let cardY = 90;
      let cardH = height - 180;

      for (let i = 0; i < 4; i++) {
        let xInicioOriginal = startX + i * (w_individual + gap);
        let xFinOriginal = xInicioOriginal + w_individual;
        
        if (mouseX > xInicioOriginal && mouseX < xFinOriginal && mouseY > cardY && mouseY < cardY + cardH) {
          mapaActivo = i;
          break;
        }
      }
    }
  }
  else if (pantallaActual === "objetos") {
    if (subPantallaObjetos === 0) {
      let totalObjetos = objetos.length;
      let espacio = width / (totalObjetos + 1);
      
      for (let i = 0; i < totalObjetos; i++) {
        let x = espacio * (i + 1);
        let y = height / 2;
        
        if (dist(mouseX, mouseY, x, y) < 50) {
          objetoSeleccionado = i;
          anguloDestino = PI - (TWO_PI / totalObjetos) * i;
          anguloBase = anguloDestino; 
          subPantallaObjetos = 1; 
          break;
        }
      }
    } 
    else if (subPantallaObjetos === 1 && mouseButton === RIGHT) {
      subPantallaObjetos = 0; 
    }
  }
}

function keyPressed(){
if (keyCode === ESCAPE) {
    
    textoX = width / 2 - 200;       
    textoOpacidad = 0;   
    generalAncho = 490;
    cursor(ARROW);
    
    
    if (pantallaActual === "mapas" && mapaActivo !== -1) {
      mapaActivo = -1;
    } else if (pantallaActual === "personajes" && (tarjetaAbierta || tarjetaNicteAbierta || tarjetaPersefoneAbierta)) {
      tarjetaAbierta = false;
      tarjetaNicteAbierta = false;
      tarjetaPersefoneAbierta = false;
    } else if (pantallaActual === "objetos" && subPantallaObjetos === 1) {
      subPantallaObjetos = 0; 
    } else if (pantallaActual !== "menu") {
      pantallaActual = "menu";
      desplazamientoY = 300; 
    }
    return false; 
  }
}
