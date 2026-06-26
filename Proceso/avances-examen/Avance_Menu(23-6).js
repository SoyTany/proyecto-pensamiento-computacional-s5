let popup = false;
let zagreus;

function preload() {
  zagreus = loadImage("https://raw.githubusercontent.com/Chrisploo/Bitacora-Pensamiento-Computacional/main/Recursos/Zagreus_Hades.png"); // 
}

function setup() {
  createCanvas(360, 640);
  textFont("Georgia");
}

function draw() {
  background("#6b0505");

  // Title
  fill("#edc02f");
  noStroke();
  rect(40, 25, 280, 55, 30);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(24);
  text("PERSONAJES", width / 2, 52);

  // Character card
  fill(255);
  textSize(20);
  text("ZAGREUS", width / 2, 150);

  imageMode(CENTER);
  image(zagreus, width / 2, 260, 220, 220);

  // If clicked, show popup
  if (popup) {
    drawPopup();
  }
}

function mousePressed() {
  // Click area around character image
  if (mouseX > 70 && mouseX < 290 && mouseY > 150 && mouseY < 370) {
    popup = true;
  }

  // Close popup if clicking X
  if (popup && mouseX > 285 && mouseX < 325 && mouseY > 80 && mouseY < 120) {
    popup = false;
  }
}

function drawPopup() {
  // dark transparent background
  fill(0, 180);
  rect(0, 0, width, height);

  // window
  fill("#2b0000");
  rect(30, 60, 300, 520);

  // close button
  fill(255);
  textSize(24);
  text("X", 305, 100);

  // title
  textSize(22);
  text("ZAGREUS", width / 2, 110);

  // image
  image(zagreus, width / 2, 230, 220, 220);

  // description
  fill(255);
  textAlign(LEFT, TOP);
  textSize(12);
  textLeading(18);

  text(
    "Zagreo es el príncipe del Inframundo, es el hijo de Hades y el protagonista del juego. Zagreo siempre ha sentido que no pertenecía realmente a la morada de Hades. Es por ello que finalmente se ha decidido, en contra de la voluntad de su padre, por abandonar el Inframundo cueste lo que cueste.",
    55, 360, 250, 180
  );
}
