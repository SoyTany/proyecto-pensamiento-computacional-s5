# Examen de Pensamiento Computacional

## Link de web pública (github pages)

<https://link.com>

### Título del proyecto

Enciclopedia de Hades

### Referencia de origen / bibliografía

Videojuego Hades (2020) desarrollado por SuperGiant Games

Informacion recopilada de la wiki oficial del juego: [Hades Wiki](https://hades.fandom.com/wiki/Hades_Wiki)

### Imagen de referencia de proyecto

<img width="1314" height="704" alt="menu examen" src="https://github.com/user-attachments/assets/46bf3ae1-e218-492d-85aa-ae795613f375" />


### Integrantes

Christian Petit-Laurent [Chrisploo](https://github.com/Chrisploo)

Catalina Vergara [SoyTany](https://github.com/SoyTany)

Florencia Valencia [Fuyu](https://github.com/zxxnie)

### Enlace de p5.js 

[p5.js](https://editor.p5js.org/Tanytanita/sketches/37OVzQpCo)

### Relato inicial

La historia sigue a Zagreo, príncipe del Inframundo e hijo de Hades, dios del Inframundo, y Perséfone, diosa de la primavera. Al nacer, Zagreo llegó al mundo sin vida debido a una profecía que dictaba que Hades nunca tendría un heredero, lo que llevó a Perséfone a marcharse completamente desolada. Sin embargo, Nyx, la encarnación de la noche, logró devolverle la vida y lo crió junto a Hades, aunque ambos ocultaron la verdad sobre su origen. Todo cambió cuando Zagreo encontró una carta de su madre, Perséfone, en la que explicaba que había abandonado el Inframundo por el profundo dolor que sentía. Molesto por los secretos de su familia y decidido a descubrir la verdad, Zagreo emprende la misión de escapar del Inframundo y alcanzar la superficie, sin importar cuántas veces muera ni cuánto tiempo le tome.

Contamos la historia a través de las descripciones de los múltiples personajes, jefes y objetos. Cada uno aporta información que ayuda a comprender la historia en su totalidad.

### Storyboard

Imágenes del storyboard, las que deben verse acá y estar subidas en el mismo repositorio

### Estados

Describe acá los estados de tu máquina (mínimo 3 para proyectos individuales, 6 para parejas, 9 para tríos), y la condición de salida. Incluye la sección de código que muestra ese estado

#### Estado 1

Menú Principal
¿Qué hace?: Muestra la portada del juego, el logo animado de Hades y la lista con los 4 botones principales. Es la pantalla de bienvenida.

¿Qué dispara el cambio?: Hacer clic (mousePressed) sobre cualquiera de los botones de la lista. Esto cambia el valor de la variable pantallaActual hacia el nombre de la nueva pantalla.

```js
function dibujarMenuPrincipal(cx, cy) {
  push();
  let margenX = width * 0.04;
  let margenY = height * 0.05;
  let marcoW = width - (margenX * 2);
  let marcoH = height - (margenY * 2) - 35;
  
  // Textos de créditos y títulos
  fill(100, 0, 100); noStroke(); textFont(spectral);
  textSize(9); textAlign(LEFT, BOTTOM);
  text("ESTUDIANTES: TANY - ZXXNIE - CHRIS...", margenX + 15, (height - margenY - 39) + desplazamientoY);

  // Imágenes principales con animación de entrada (desplazamientoY)
  image(hadesLogo, 100, desplazamientoY, 1200, 420);
  image(zagreusMenu, 400, desplazamientoY, 1200, height + 3);
  
  // Renderizado dinámico de los botones
  let x = (cx - btnW / 2) - 290;
  let yInicial = (cy - 20) + 20;

  for (let i = 0; i < botones.length; i++) {
    let btn = botones[i];
    btn.y = (yInicial + i * (btnH + 20)) + desplazamientoY; 
    btn.alfa = calcularBrillo(x, btn.y, btnW, btnH, btn.alfa); // Revisa si el mouse está sobre el botón
    dibujarBotonProgresivo(x, btn.y, btnW, btnH, btn.texto, btn.hue, btn.sat, btn.bri, btn.alfa);
  }
  pop();
}
```


#### Estado 2

Pantalla General
¿Qué hace?: Presenta la introducción y los datos técnicos de Hades. Tiene una animación interactiva interna: si pones el cursor sobre la imagen, el cuadro negro se expande y el texto aparece suavemente.

¿Qué dispara el cambio?: Presionar la tecla ESCAPE. Al hacerlo, el código detecta el evento keyPressed, oculta el texto reseteando su opacidad a 0 y devuelve pantallaActual a "menu".

```js
function dibujarMenuGeneral(cx, cy){
  rectMode(CENTER); fill(359, 0, 0, 0.4); noStroke();
  rect(cx, cy, 980, 550, 15); rectMode(CORNER);

  let imagenX = cx - 440; let imagenY = cy - 240;
  let imagenAncho = 450; let imagenAlto = 480;

  // CONDICIÓN ANIMACIÓN: ¿Mouse sobre la portada?
  let mouseSobreImagen = (mouseX > imagenX && mouseX < imagenX + imagenAncho && mouseY > imagenY && mouseY < imagenY + imagenAlto);
  let metaX, metaOpacidad, metaAncho;
  
  if (mouseSobreImagen) {
    cursor(HAND); metaX = cx + 50; metaOpacidad = 255; metaAncho = 950;
  } else {
    cursor(ARROW); metaX = cx - 200; metaOpacidad = 0; metaAncho = 530;
  }
  
  // Suavizado matemático (Interpolación lerp)
  textoX = lerp(textoX, metaX, 0.1);
  textoOpacidad = (abs(textoOpacidad - metaOpacidad) < 15) ? metaOpacidad : textoOpacidad + (textoOpacidad < metaOpacidad ? 15 : -15);
  generalAncho = (abs(generalAncho - metaAncho) < 25) ? metaAncho : generalAncho + (generalAncho < metaAncho ? 25 : -25);

  // Dibujar contenedor dinámico y texto descriptivo
  fill(0, 0, 0, 0.7); rect(cx - 480, cy - 265, generalAncho+8, 530, 15);
  
  push();
  fill(0, 0, 100, textoOpacidad / 255); textFont(spectral); textSize(18); textAlign(LEFT, TOP);
  text(descripcionHades, textoX, imagenY + 40, 370);
  pop();

  image(portadaHades, imagenX-25, imagenY+25, imagenAncho + 60, imagenAlto-55);
}
```

#### Estado 3 
Personajes - Vista de Lista de tarjetas (quieto)
¿Qué hace?: Muestra las tarjetas de Zagreus, Nyx y Perséfone en un tamaño compacto (altoTarjeta = 220). Las tres están cerradas, mostrando solo los nombres y sus ilustraciones en modo de espera.

¿Qué dispara el cambio?: Hacer un clic izquierdo sobre el rectángulo de cualquiera de las tres tarjetas.

```js
function dibujarMenuPersonajes(cx, cy) {
  let anchoReal = cardW - 60; let espacioEntreTarjetas = 30; let cardY = cy - 180;
  let xNicte = cx - anchoReal / 2;
  let xZagreus = xNicte - anchoReal - espacioEntreTarjetas;

  // CONTROL DE TRANSICIÓN INTERNA 
  // Si 'tarjetaAbierta' es true va a 500 (Detalle), si es false va a 220 (Lista)
  let altoObjetivoZag = tarjetaAbierta ? 500 : 220;
  altoTarjeta = lerp(altoTarjeta, altoObjetivoZag, 0.1);
  
  let alfaObjetivoZag = tarjetaAbierta ? 100 : 0;
  alfaTexto = lerp(alfaTexto, alfaObjetivoZag, 0.1);
  
  // Renderizado de la tarjeta de Zagreus
  push(); noStroke(); fill(359, 95, 15); 
  rect(xZagreus, cardY, anchoReal, altoTarjeta, 12); // Su alto cambia dinámicamente

  fill(0, 0, 100); textAlign(CENTER, CENTER); textFont(caesar); textSize(40);
  text("ZAGREUS", xZagreus + anchoReal / 2, cardY - 30);
  imageMode(CENTER); image(zagreusTarjeta, xZagreus + anchoReal / 2, cardY + 120, 190, 190);

  // Si la tarjeta ya se estiró lo suficiente, muestra la biografía
  if (alfaTexto > 5) {
    fill(0, 0, 100, alfaTexto); textFont(spectral); textSize(13); textAlign(LEFT, TOP);
    text(descripcionZagreus, xZagreus + 15, cardY + 220, anchoReal - 30, altoTarjeta - 235);
  }
  pop();
  
  // (Nota: Las tarjetas de Nyx y Perséfone repiten esta misma estructura matemática abajo)
}
```

#### Estado 4
Personajes - Tarjeta Expandida (Detalle)
¿Qué hace?: La tarjeta en la que hiciste clic se expande hacia abajo de forma fluida (altoTarjeta = 500) y revela la biografía del personaje.

¿Qué dispara el cambio?: Tienes dos formas de salir: volver a hacer clic en la misma tarjeta para cerrarla (regresa al Estado 3) o presionar ESCAPE para cerrar todas las tarjetas al mismo tiempo.

```js
function dibujarMenuPersonajes(cx, cy) {
  let anchoReal = cardW - 60; let espacioEntreTarjetas = 30; let cardY = cy - 180;
  let xNicte = cx - anchoReal / 2;
  let xZagreus = xNicte - anchoReal - espacioEntreTarjetas;

  // CONTROL DE TRANSICIÓN INTERNA 
  // Si 'tarjetaAbierta' es true va a 500 (Detalle), si es false va a 220 (Lista)
  let altoObjetivoZag = tarjetaAbierta ? 500 : 220;
  altoTarjeta = lerp(altoTarjeta, altoObjetivoZag, 0.1);
  
  let alfaObjetivoZag = tarjetaAbierta ? 100 : 0;
  alfaTexto = lerp(alfaTexto, alfaObjetivoZag, 0.1);
  
  // Renderizado de la tarjeta de Zagreus
  push(); noStroke(); fill(359, 95, 15); 
  rect(xZagreus, cardY, anchoReal, altoTarjeta, 12); // Su alto cambia dinámicamente

  fill(0, 0, 100); textAlign(CENTER, CENTER); textFont(caesar); textSize(40);
  text("ZAGREUS", xZagreus + anchoReal / 2, cardY - 30);
  imageMode(CENTER); image(zagreusTarjeta, xZagreus + anchoReal / 2, cardY + 120, 190, 190);

  // Si la tarjeta ya se estiró lo suficiente, muestra la biografía
  if (alfaTexto > 5) {
    fill(0, 0, 100, alfaTexto); textFont(spectral); textSize(13); textAlign(LEFT, TOP);
    text(descripcionZagreus, xZagreus + 15, cardY + 220, anchoReal - 30, altoTarjeta - 235);
  }
  pop();
  
  // (Nota: Las tarjetas de Nyx y Perséfone repiten esta misma estructura matemática abajo)
}
```

#### Estado 5
Grilla de Zonas
¿Qué hace?: Divide la pantalla en 4 columnas verticales idénticas. Cada columna muestra un fragmento recortado de los escenarios del juego (Tártaro, Asfódelos, Elíseo y el Templo).

¿Qué dispara el cambio?: Hacer clic en cualquiera de las 4 columnas de la grilla. El programa guarda el índice de la zona elegida en la variable mapaActivo.

```js
function dibujarMenuMapas(cx, cy) {
  let imgMapas = [zona1, zona2, zona3, zona4];
  let startX = width * 0.08; let totalW = width * 0.84; let gap = 20; 
  let w_individual = (totalW - (gap * 3)) / 4;
  let cardY = 90; let cardH = height - 180;

  for (let i = 0; i < 4; i++) {
    let metaX = startX + i * (w_individual + gap);
    let metaW = w_individual;

    // CONDICIÓN DE EXPANSIÓN: Si esta columna fue clickeada, cambia sus metas
    if (mapaActivo === i) {
      metaX = width * 0.38; metaW = width * 0.57; 
    }

    mapasX[i] = lerp(mapasX[i], metaX, 0.15);
    mapasW[i] = lerp(mapasW[i], metaW, 0.15);
    let opacidad = (mapaActivo !== -1 && mapaActivo !== i) ? 0 : 255; // Oculta las no seleccionadas

    if (opacidad > 0 && imgMapas[i]) {
      push(); tint(255, opacidad); imageMode(CORNER);
      if (mapaActivo === -1) {
        // Estado 5: Muestra solo un recorte de la imagen en la grilla
        let sx = imgMapas[i].width / 4 * i; let sw = imgMapas[i].width / 4;
        image(imgMapas[i], mapasX[i], cardY, mapasW[i], cardH, sx, 0, sw, imgMapas[i].height);
      } else {
        // Estado 6: Muestra la imagen completa expandida
        image(imgMapas[i], mapasX[i], cardY, mapasW[i], cardH);
      }
      pop();
    }
  }

  // Si hay un mapa activo, dibuja de forma asíncrona el panel de textos izquierdo
  if (mapaActivo !== -1) {
    push(); noStroke(); fill(359, 95, 12); rect(50, 50, width * 0.32, height - 100, 10);
    fill(0, 0, 100); textFont(caesar); textSize(40); text(titulosMapas[mapaActivo], 80, 100);
    fill(0, 0, 95); textFont(spectral); textSize(15); text(descripcionesMapas[mapaActivo], 80, 160, width * 0.32 - 60);
    pop();
  }
}
```
#### Estado 6
Mapas - Zona Ampliada
¿Qué hace?: La columna seleccionada se estira horizontalmente ocupando casi toda la pantalla para mostrar el paisaje completo. En el lado izquierdo, aparece un panel burdeos con la descripción literaria de esa región del Inframundo.

¿Qué dispara el cambio?: Hacer clic en el panel de texto de la izquierda o presionar ESCAPE. Esto devuelve mapaActivo = -1, haciendo que la zona se encoja y regreses a la grilla general (Estado 5).
```js
function dibujarMenuMapas(cx, cy) {
  let imgMapas = [zona1, zona2, zona3, zona4];
  let startX = width * 0.08; let totalW = width * 0.84; let gap = 20; 
  let w_individual = (totalW - (gap * 3)) / 4;
  let cardY = 90; let cardH = height - 180;

  for (let i = 0; i < 4; i++) {
    let metaX = startX + i * (w_individual + gap);
    let metaW = w_individual;

    // CONDICIÓN DE EXPANSIÓN: Si esta columna fue clickeada, cambia sus metas
    if (mapaActivo === i) {
      metaX = width * 0.38; metaW = width * 0.57; 
    }

    mapasX[i] = lerp(mapasX[i], metaX, 0.15);
    mapasW[i] = lerp(mapasW[i], metaW, 0.15);
    let opacidad = (mapaActivo !== -1 && mapaActivo !== i) ? 0 : 255; // Oculta las no seleccionadas

    if (opacidad > 0 && imgMapas[i]) {
      push(); tint(255, opacidad); imageMode(CORNER);
      if (mapaActivo === -1) {
        // Estado 5: Muestra solo un recorte de la imagen en la grilla
        let sx = imgMapas[i].width / 4 * i; let sw = imgMapas[i].width / 4;
        image(imgMapas[i], mapasX[i], cardY, mapasW[i], cardH, sx, 0, sw, imgMapas[i].height);
      } else {
        // Estado 6: Muestra la imagen completa expandida
        image(imgMapas[i], mapasX[i], cardY, mapasW[i], cardH);
      }
      pop();
    }
  }

  // Si hay un mapa activo, dibuja de forma asíncrona el panel de textos izquierdo
  if (mapaActivo !== -1) {
    push(); noStroke(); fill(359, 95, 12); rect(50, 50, width * 0.32, height - 100, 10);
    fill(0, 0, 100); textFont(caesar); textSize(40); text(titulosMapas[mapaActivo], 80, 100);
    fill(0, 0, 95); textFont(spectral); textSize(15); text(descripcionesMapas[mapaActivo], 80, 160, width * 0.32 - 60);
    pop();
  }
}
```

#### Estado 7

Objetos - Fila de Selección
¿Qué hace?: Es la primera subpantalla de los objetos (subPantallaObjetos === 0). Alinea los 5 ítems míticos de forma horizontal. Si pasas el mouse sobre uno, este se agranda ligeramente indicando que puedes interactuar.

¿Qué dispara el cambio?: Hacer clic directamente sobre el ícono de un objeto. El código calcula la distancia (dist() < 50) y cambia subPantallaObjetos = 1.

```js
function dibujarPantallaFila() {
  textAlign(CENTER, CENTER); fill(0, 0, 100); textFont(caesar); textSize(28);
  text("SELECCIONA UN OBJETO", width / 2, 100);
  
  let totalObjetos = objetos.length;   let espacio = width / (totalObjetos + 1);
  imageMode(CENTER); 

  for (let i = 0; i < totalObjetos; i++) {
    let x = espacio * (i + 1); let y = height / 2;
    let d = dist(mouseX, mouseY, x, y); // Mide cercanía del cursor
    
    if (d < 50) {
      cursor(HAND); image(objetos[i].img, x, y, 110, 110); // Efecto Hover (Agrandar)
    } else {
      image(objetos[i].img, x, y, 100, 100);
    }
    fill(0, 0, 90); text(objetos[i].nombre, x, y + 80);
  }
}
```

#### Estado 8 
Detalle en Noria Estática
¿Qué hace?: Entramos a la segunda subpantalla (subPantallaObjetos === 1). Los objetos se organizan en círculo simulando una rueda de la fortuna (noria). El objeto seleccionado se queda fijo al centro-izquierdo mostrando su descripción detallada.

¿Qué dispara el cambio?: Mover la rueda del ratón (mouseWheel) o hacer clic derecho (para volver a la fila).

```js
function dibujarPantallaDetalle() {
  cursor(ARROW);
  // ANIMACIÓN ACTIVA (Estado 9): Persigue el ángulo destino al usar la rueda del mouse
  anguloBase = lerp(anguloBase, anguloDestino, 0.1);
  
  // Dibujar el aro de la Noria
  noFill(); stroke(0, 50, 30); strokeWeight(2);
  ellipse(centroNoriaX, centroNoriaY, radioNoria * 2);
  
  imageMode(CENTER);
  let totalObjetos = objetos.length;
  for (let i = 0; i < totalObjetos; i++) {
    // Distribución circular matemática de los objetos
    let anguloObjeto = anguloBase + (TWO_PI / totalObjetos) * i;
    let x = centroNoriaX + radioNoria

```

#### Estado 9
Objetos - Noria en Rotación Activa
¿Qué hace?: Es un estado de transición física. Al usar la rueda del mouse, el sistema cambia el índice del objeto y calcula un nuevo anguloDestino. Durante esos breves fotogramas, la rueda gira visualmente de manera fluida hasta detenerse en el nuevo ítem.

¿Qué dispara el cambio?: La animación se detiene sola cuando el ángulo actual alcanza al ángulo destino gracias al cálculo matemático de suavizado (lerp), regresando al estado de noria estática (Estado 8).

```js
function dibujarPantallaDetalle() {
  cursor(ARROW);
  // ANIMACIÓN ACTIVA (Estado 9): Persigue el ángulo destino al usar la rueda del mouse
  anguloBase = lerp(anguloBase, anguloDestino, 0.1);
  
  // Dibujar el aro de la Noria
  noFill(); stroke(0, 50, 30); strokeWeight(2);
  ellipse(centroNoriaX, centroNoriaY, radioNoria * 2);
  
  imageMode(CENTER);
  let totalObjetos = objetos.length;
  for (let i = 0; i < totalObjetos; i++) {
    // Distribución circular matemática de los objetos
    let anguloObjeto = anguloBase + (TWO_PI / totalObjetos) * i;
    let x = centroNoriaX + radioNoria
```
