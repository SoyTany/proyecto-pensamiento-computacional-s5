// Link: https://editor.p5js.org/Fuyu_xoi/sketches/Os-J_nC62
// Estados de la pantalla
let pantalla = 0; // 0 = Fila de objetos, 1 = Vista Noria/Detalle
let objetoSeleccionado = 0;

// Variables para la noria
let radioNoria = 220;
let centroNoriaX;
let centroNoriaY;
let anguloBase = 0;
let anguloDestino = 0;

// Variables para almacenar las imágenes
let imgBendiciones, imgEscudo, imgEspada, imgObolo, imgOscuridad;

// Variables para almacenar las fuentes
let fuenteTitulos, fuenteTexto;

let objetos = [];

// --- FUNCIÓN PRELOAD: CARGA DE RECURSOS ---
function preload() {
  // 1. Carga de imágenes desde la carpeta 'imagenes'
  imgBendiciones = loadImage('imagenes/boons.png');
  imgEscudo = loadImage('imagenes/escudo.png');
  imgEspada = loadImage('imagenes/espada.png');
  imgObolo = loadImage('imagenes/obolo.png');
  imgOscuridad = loadImage('imagenes/oscuridad.png'); 

  fuenteTitulos = loadFont('fuentes/Caesar.ttf'); // Para "OBJETO" y nombres de armas
  fuenteTexto = loadFont('fuentes/Spectral.ttf');      // Para las descripciones largas
}

function setup() {
  createCanvas(1000, 600);
  
  // noria fuera de la pantalla a la derecha
  centroNoriaX = width - 40; 
  centroNoriaY = height / 2;

  // Definición de los objetos con sus imágenes y textos
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

function draw() {
  // Fondo oscuro 
  background(28, 8, 8);
  
  if (pantalla === 0) {
    dibujarPantallaFila();
  } else if (pantalla === 1) {
    dibujarPantallaDetalle();
  }
}

// --- OBJETOS EN FILA ---
function dibujarPantallaFila() {
  textFont(fuenteTitulos); // Aplicamos la fuente griega/romana para el menú principal
  textAlign(CENTER, CENTER);
  fill(235, 215, 180);
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
    
    fill(235, 215, 180);
    textSize(14);
    text(objetos[i].nombre, x, y + 80);
  }
}

// --- DETALLE + NORIA CON SCROLL ---
function dibujarPantallaDetalle() {
  cursor(ARROW);
  
  // Suavizado de la rotación de la noria
  anguloBase = lerp(anguloBase, anguloDestino, 0.1);
  
  // 1. NORIA (Lado Derecho)
  noFill();
  stroke(80, 30, 30);
  strokeWeight(2);
  ellipse(centroNoriaX, centroNoriaY, radioNoria * 2);
  
  imageMode(CENTER);
  let totalObjetos = objetos.length;
  for (let i = 0; i < totalObjetos; i++) {
    let anguloObjeto = anguloBase + (TWO_PI / totalObjetos) * i;
    
    let x = centroNoriaX + radioNoria * cos(anguloObjeto);
    let y = centroNoriaY + radioNoria * sin(anguloObjeto);
    
    if (i === objetoSeleccionado) {
      fill(235, 215, 180, 50); 
      noStroke();
      ellipse(x, y, 80, 80);
      image(objetos[i].img, x, y, 70, 70);
    } else {
      image(objetos[i].img, x, y, 50, 50);
    }
    
    stroke(80, 30, 30, 100);
    strokeWeight(1);
    line(centroNoriaX, centroNoriaY, x, y);
  }
  
  // 2. OBJETO SELECCIONADO (Lado Izquierdo)
  let obj = objetos[objetoSeleccionado];
  
  
  // Título del objeto actual
  textFont(fuenteTitulos);
  textAlign(LEFT, TOP);
  textSize(32);
  fill(235, 215, 180);
  text(obj.nombre, 50, 120);
  
  // Párrafo descriptivo con la fuente de lectura (Spectral)
  textFont(fuenteTexto);
  textSize(15);
  fill(195, 175, 155);
  textLeading(24); // Espaciado cómodo entre líneas
  text(obj.desc, 50, 180, 380, 320); // 380px de ancho máximo
  
  // Vista gigante del objeto central
  image(obj.img, 550, height / 2, 250, 250);
  
}

// --- CLICS (Para cambiar de pantalla) ---
function mousePressed() {
  if (pantalla === 0) {
    let totalObjetos = objetos.length;
    let espacio = width / (totalObjetos + 1);
    
    for (let i = 0; i < totalObjetos; i++) {
      let x = espacio * (i + 1);
      let y = height / 2;
      
      if (dist(mouseX, mouseY, x, y) < 50) {
        objetoSeleccionado = i;
        anguloDestino = PI - (TWO_PI / totalObjetos) * i;
        anguloBase = anguloDestino; 
        pantalla = 1;
        break;
      }
    }
  } else if (pantalla === 1 && mouseButton === RIGHT) {
    pantalla = 0; 
  }
}

// --- SCROLL ---
function mouseWheel(event) {
  if (pantalla === 1) {
    if (event.delta > 0) {
      objetoSeleccionado = (objetoSeleccionado + 1) % objetos.length;
    } else {
      objetoSeleccionado = (objetoSeleccionado - 1 + objetos.length) % objetos.length;
    }
    anguloDestino = PI - (TWO_PI / objetos.length) * objetoSeleccionado;
  }
  return false; 
}

// --- REGRESAR CON TECLADO ---
function keyPressed() {
  if (key === 'Escape' && pantalla === 1) {
    pantalla = 0;
  }
}
