// Link: https://editor.p5js.org/Fuyu_xoi/sketches/P1YdlS4DL
let cards = [];
let activeCard = -1;

function setup() {
  createCanvas(1000, 500);

  let margin = 30;
  let gap = 20;
  let w = (width - margin * 2 - gap * 3) / 4;

  for (let i = 0; i < 4; i++) {
    cards.push(new Card(
      margin + i * (w + gap),
      80,
      w,
      340,
      i + 1
    ));
  }
}

function draw() {
  background(25);

  for (let card of cards) {
    card.update();
    card.display();
  }

  // Dibuja la X si hay una tarjeta abierta
  if (activeCard != -1) {
    drawCloseButton();
  }
}

function mousePressed() {

  // Si hay una tarjeta abierta primero revisa si hizo click en la X
  if (activeCard != -1) {

    if (mouseOverClose()) {

      activeCard = -1;

      let margin = 30;
      let gap = 20;
      let w = (width - margin * 2 - gap * 3) / 4;

      for (let i = 0; i < cards.length; i++) {

        cards[i].targetX = margin + i * (w + gap);
        cards[i].targetW = w;
        cards[i].targetAlpha = 255;

      }

    }

    return;
  }

  // Abrir tarjeta
  for (let i = 0; i < cards.length; i++) {

    if (cards[i].isMouseOver()) {

      activeCard = i;

      for (let j = 0; j < cards.length; j++) {

        if (j == i) {

          cards[j].targetX = 30;
          cards[j].targetW = width - 60;
          cards[j].targetAlpha = 255;

        } else {

          cards[j].targetAlpha = 0;

        }

      }

      break;
    }
  }
}

class Card {

  constructor(x, y, w, h, num) {

    this.x = x;
    this.y = y;

    this.w = w;
    this.h = h;

    this.targetX = x;
    this.targetW = w;

    this.alpha = 255;
    this.targetAlpha = 255;

    this.num = num;

  }

  update() {

    this.x = lerp(this.x, this.targetX, 0.08);
    this.w = lerp(this.w, this.targetW, 0.08);
    this.alpha = lerp(this.alpha, this.targetAlpha, 0.08);

  }

  display() {

    if (this.alpha < 2) return;

    push();

    noStroke();

    fill(70, this.alpha);
    rect(this.x, this.y, this.w, this.h, 20);

    fill(255, this.alpha);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Tarjeta " + this.num,
         this.x + this.w/2,
         this.y + this.h/2);

    pop();

  }

  isMouseOver() {

    return mouseX > this.x &&
           mouseX < this.x + this.w &&
           mouseY > this.y &&
           mouseY < this.y + this.h;

  }

}

// ----------------------------
// BOTÓN X
// ----------------------------

function drawCloseButton(){

  push();

  fill(230);
  circle(width-45,45,35);

  stroke(25);
  strokeWeight(3);

  line(width-53,37,width-37,53);
  line(width-37,37,width-53,53);

  pop();

}

function mouseOverClose(){

  return dist(mouseX,mouseY,width-45,45)<17;

}
