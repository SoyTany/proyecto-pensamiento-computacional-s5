// Link: https://editor.p5js.org/Fuyu_xoi/sketches/WU-UFNFRB
//=========================================
// HADES - RUEDA DE OBJETOS
//=========================================

let imagenes = [];

let nombres = [
  "Stygian Blade",
  "Shield of Chaos",
  "Boons",
  "Charon's Obol",
  "Darkness"
];

let colores = [];

let angulo = 0;
let anguloDestino = 0;

let radio = 250;

function preload(){

  imagenes[0] = loadImage("imagenes/espada.png");
  imagenes[1] = loadImage("imagenes/escudo.png");
  imagenes[2] = loadImage("imagenes/boons.png");
  imagenes[3] = loadImage("imagenes/moneda.png");
  imagenes[4] = loadImage("imagenes/gema.png");

}

function setup(){

  createCanvas(1200,700);

  imageMode(CENTER);
  textAlign(CENTER,CENTER);

  color = [

  color(120,30,30),
  color(35,80,120),
  color(90,60,140),
  color(170,120,40),
  color(55,35,90),
];
  colorActual = colores[0];
}

function draw(){

  background(30);

  // Movimiento suave
  angulo = lerp(angulo,anguloDestino,0.08);

  dibujarRueda();

}
//=========================================
// DIBUJAR LA RUEDA
//=========================================

function dibujarRueda(){

  let cx = width/2;
  let cy = height/2;

  let separacion = TWO_PI / imagenes.length;

  for(let i=0; i<imagenes.length; i++){

    let a = angulo + i*separacion;

    let x = cx + cos(a) * 220;
    let y = cy + sin(a) * 220;

    image(
      imagenes[i],
      x,
      y,
      120,
      120
    );

  }

 

}



function mouseWheel(event){

  if(event.delta > 0){

    anguloDestino += TWO_PI/imagenes.length;

  }else{

    anguloDestino -= TWO_PI/imagenes.length;

  }

  return false;


}
