// Link: https://editor.p5js.org/Fuyu_xoi/sketches/iVrtrADea
//====================================
// HADES - SELECTOR DE OBJETOS
//====================================

let imagenes = [];

let nombres = [
  "Espada Estigiana",
  "Escudo del Caos",
  "Boons",
  "Óbolo de Caronte",
  "Oscuridad"
];

let descripcion = [
  "La espada infernal utilizada por Zagreus.",
  "Escudo legendario capaz de bloquear cualquier ataque.",
  "Bendiciones otorgadas por los dioses del Olimpo.",
  "Moneda utilizada por Caronte.",
  "Cristales obtenidos en el Inframundo."
];

let fondos = [];

let angulo = 0;
let destino = 0;

let radio = 180;

let indice = 0;

function preload(){

  imagenes[0]=loadImage("imagenes/espada.png");
  imagenes[1]=loadImage("imagenes/escudo.png");
  imagenes[2]=loadImage("imagenes/boons.png");
  imagenes[3]=loadImage("imagenes/moneda.png");
  imagenes[4]=loadImage("imagenes/gema.png");

}

function setup(){

  createCanvas(1200,700);

  imageMode(CENTER);

  textFont("Georgia");

  fondos[0]=color(95,10,10);
  fondos[1]=color(25,70,120);
  fondos[2]=color(90,60,150);
  fondos[3]=color(150,100,30);
  fondos[4]=color(60,30,90);

}

function draw(){

  background(fondos[indice]);

  angulo = lerp(angulo,destino,0.1);

  dibujarSelector();

  interfaz();

}
//====================================
// DIBUJAR SELECTOR
//====================================

function dibujarSelector(){

  let centroX = width * 0.72;
  let centroY = height * 0.55;

  let paso = TWO_PI / imagenes.length;

  let mejor = -1000;
  indice = 0;

  // Guardaremos la información de cada objeto
  let objetos = [];

  for(let i=0; i<imagenes.length; i++){

    let a = angulo + i * paso;

    // Rueda elíptica
    let x = centroX + cos(a) * radio;
    let y = centroY + sin(a) * 180;

    // Qué tan cerca está de la derecha
    let frente = -cos(a);

    // Tamaño
    let tam = map(frente,-1,1,70,220);

    // Transparencia
    let alpha = map(frente,-1,1,80,255);

    objetos.push({
      i:i,
      x:x,
      y:y,
      tam:tam,
      alpha:alpha,
      frente:frente
    });

    if(frente > mejor){
      mejor = frente;
      indice = i;
    }

  }

  // Dibujar primero los de atrás
  objetos.sort(function(a,b){
    return a.frente - b.frente;
  });

  for(let obj of objetos){

    tint(255,obj.alpha);

    image(
      imagenes[obj.i],
      obj.x,
      obj.y,
      obj.tam,
      obj.tam
    );

    noTint();

  }

}
//====================================
// INTERFAZ + SCROLL
//====================================

function interfaz(){

  // Panel izquierdo
  fill(20,180);
  noStroke();
  rect(0,0,420,height);

  // Título
  fill(255);
  textAlign(LEFT);

  textSize(40);
  text(nombres[indice],60,120);

  // Línea decorativa
  stroke(200);
  strokeWeight(2);
  line(60,145,260,145);
  noStroke();

  // Descripción
  fill(220);
  textSize(20);
  textLeading(28);

  text(
    descripcion[indice],
    60,
    180,
    300,
    250
  );

  // Indicación
  fill(180);
  textSize(16);

  text(
    "Usa la rueda del mouse",
    60,
    height-60
  );

}


//====================================
// SCROLL
//====================================

function mouseWheel(event){

  let paso = TWO_PI / imagenes.length;

  if(event.delta > 0){

    destino += paso;

  }else{

    destino -= paso;

  }

  return false;

}
