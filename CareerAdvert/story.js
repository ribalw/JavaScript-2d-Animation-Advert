"use strict";
/**JavaScript file to create all of the classes adn functions*/

let toRadians = Math.PI / 180;
let drawBoundingBoxes = false;
let firstTime = 0;//to change background after first cycle
let stopCloud;//to control cloud movement

//method to show fps
function showFPS(col) {
  ctx.fillStyle = col;
  ctx.font = "normal 12 pt Arial";
  fps = Math.round(fps);
  ctx.fillText(fps + " fps", 10, 26);
}

//loop to run every milisecond
function loop(timestamp) {

  let delta = (timestamp - lastRender);
  now = window.performance.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    draw();

    update(elapsed);
    then = now - (elapsed % fpsInterval);
    fps = 1000 / delta;
    lastRender = timestamp;
    showFPS();
    count += 1;
  }

  requestAnimationFrame(loop);
}

let fps
let lastRender = 0
let frameCount = 0;
let fpsInterval, startTime, now, then, elapsed;
let count = 0;

function startLoop(fps) {

  fpsInterval = 1000 / fps;
  then = window.performance.now();
  startTime = then;
  loop();


}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

//class to create background sprite.
class backgroundSprite {
  constructor(name, pos, width, height) {
    this.image = document.createElement("img");
    this.image.src = name;
    this.pos = new Vector(pos[0], pos[1]);
    this.width = width;
    this.height = height;

  }
  draw() {

    ctx.drawImage(this.image, this.pos.x, this.pos.y, width, height);
  }

  //method to scroll backhround images
  scrollBackground(dir, back2, back3, speed, startScroll) {

    if (firstTime == 0) {//first time
      speed = -speed;
      ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height);
      ctx.drawImage(back2.image, 0, 0, Math.abs(this.pos.x), this.height,
        this.width + this.pos.x, 0, Math.abs(this.pos.x), this.height);

      if (startScroll) {
        this.pos.x += speed; back2.pos.x += speed;

        if (this.pos.x <= -(back2.width)) {
          this.pos.x = 0;
          firstTime += 1;
          back2.pos.x = this.width;
          dir = 0;

        }
      }
    }

    else if (firstTime >= 1) {// second time onwards
      speed = -speed;
      ctx.drawImage(back3.image, this.pos.x, this.pos.y, this.width, this.height);
      ctx.drawImage(back2.image, 0, 0, Math.abs(this.pos.x), this.height,
        this.width + this.pos.x, 0, Math.abs(this.pos.x), this.height);

      if (startScroll) {
        this.pos.x += speed; back2.pos.x += speed; //back3.pos.x += speed;

        if (this.pos.x <= -(back2.width)) {
          this.pos.x = 0;
          firstTime += 1;
          back2.pos.x = this.width;
          dir = 0;

        }
      }
    }
  }
}

//Sprite class to create sprites
class Sprite {
  constructor(name, frames, spriteWidth, spriteHeight, sheetRows, sheetCols) {
    this.image = document.createElement("img");
    this.image.src = name;
    this.frames = frames;
    this.pos = new Vector(0, 0);
    this.spriteW = spriteWidth;
    this.spriteH = spriteHeight;
    this.sheetRows = sheetRows;
    this.sheetCols = sheetCols;
    this.scale = 1;
    this.rotate = 0;
    this.transparency = 1;
    this.index = 1;
    this.count = 0;

  }

  drawAnim(shadow) {
    ctx.save();
    if (shadow) {
      ctx.shadowOffsetX = 15;
      ctx.shadowOffsetY = 10;
      ctx.shadowBlur = 3;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    }
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotate);
    ctx.scale(this.scale, this.scale);
    ctx.translate(-this.spriteW / 2, -this.spriteH / 2);

    this.col = this.index % this.sheetCols;
    this.row = Math.trunc(this.index / this.sheetCols);
    ctx.drawImage(this.image, this.col * this.spriteW, this.row * this.spriteH, this.spriteW, this.spriteH, this.pos.x, this.pos.y, this.spriteW, this.spriteH);
    ctx.restore()
    this.count += 1;

    if (this.count % this.animDelay == 0) {
      this.count = 0;
      this.index += 1;
      this.index = this.index % this.frames;
    }
  }
}

//Steerable sprite with extended sprites
class SteerableSprite extends Sprite {
  constructor(name, frames, spriteWidth, spriteHeight, animDelay) {
    super(name, frames, spriteWidth, spriteHeight)
    this.directionVector = new Vector(0, -1);
    this.startVector = new Vector(0, -1);
    this.speed = animDelay;

  }

}
// boy   class to create boy sprites.
class Boy extends SteerableSprite {
  constructor(name, frames, spriteWidth, spriteHeight, sheetRows, sheetCols, animDelay, posX, posY) {
    super(name, frames, spriteWidth, spriteHeight);
    this.count = 0;
    this.sheetRows = sheetRows;
    this.sheetCols = sheetCols;
    this.animDelay = animDelay;
    this.pos.x = posX;
    this.pos.y = posY;
  }
}


//cloud
class Cloud {
  constructor(x, y, psx, psy) {
    this.x = x;
    this.y = y;
    this.psx = psy = psx;
    this.sx = 0;


  }

  drawCloud(stopCloud, msg) {

    if (stopCloud) {
      drawCircles(this.x, this.y)
      message(msg);

    } else {
      //to decrease size
      if (this.psx >= 1.3) {
        this.psx = -(0.1);
      }// to increase size
      else if (this.psx <= 1) {
        this.psx = +(0.1);
      }
      ctx.save()

      drawCircles(this.x, this.y)
      message(msg);
      ctx.restore()
      this.sx += this.psx;
    }
  }
}

function message(msg) {
  ctx.save();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "Green";
  ctx.textAlign = "center";
  ctx.fillText(msg, 800, 200);
  ctx.restore();
}

function drawCircles(x, y) {
  drawCircle1(x, y);

  ctx.beginPath();
  ctx.arc(x, y, 60, Math.PI * 0.5, Math.PI * 1.5);
  ctx.arc(x + 70, y - 60, 70, Math.PI * 1, Math.PI * 1.85);
  ctx.arc(x + 152, y - 45, 50, Math.PI * 1.37, Math.PI * 1.91);
  ctx.arc(x + 200, y, 60, Math.PI * 1.5, Math.PI * 0.5);
  ctx.moveTo(x + 200, y + 60);
  ctx.lineTo(x, y + 60);
  ctx.strokeStyle = '#797874';
  ctx.stroke();
  ctx.fillStyle = '#e6f3ff';
  ctx.fill()

}
function drawCircle1(x, y) {

  drawCircle2(x, y);
  ctx.beginPath();
  ctx.arc(x - 100, y + 250, 10, Math.PI, Math.PI * 360);
  ctx.moveTo(x + 200, y + 60);
  ctx.lineTo(x, y + 60);
  ctx.strokeStyle = '#797874';
  ctx.stroke();
  ctx.fillStyle = '#e6f3ff';
  ctx.fill()

}
function drawCircle2(x, y) {

  drawCircle3(x, y);

  ctx.beginPath();
  ctx.arc(x - 60, y + 210, 20, Math.PI, Math.PI * 360);
  ctx.moveTo(x + 200, y + 60);
  ctx.lineTo(x, y + 60);
  ctx.strokeStyle = '#797874';
  ctx.stroke();
  ctx.fillStyle = '#e6f3ff';
  ctx.fill()

}
function drawCircle3(x, y) {
  drawCircle4(x, y);
  ctx.beginPath();
  ctx.arc(x - 5, y + 155, 28, Math.PI, Math.PI * 360);
  ctx.moveTo(x + 200, y + 60);
  ctx.lineTo(x, y + 60);
  ctx.strokeStyle = '#797874';
  ctx.stroke();
  ctx.fillStyle = '#e6f3ff';
  ctx.fill()

}
function drawCircle4(x, y) {

  ctx.beginPath();
  ctx.arc(x + 50, y + 100, 35, Math.PI, Math.PI * 360);
  ctx.moveTo(x + 200, y + 60);
  ctx.lineTo(x, y + 60);
  ctx.strokeStyle = '#797874';
  ctx.stroke();
  ctx.fillStyle = '#e6f3ff';
  ctx.fill()

}

//class to create obstacles
class Obstacle {
  constructor(image, x, y, psx, scale, rotate) {
    this.image = document.createElement("img");
    this.image.src = image;
    this.psx = psx;
    this.y = y;
    this.x = x;
    this.scale = scale;
    this.rotate = rotate;

  }
  drawObstacle() {
    ctx.save()
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);
    ctx.translate(this.psx, 0);
    ctx.drawImage(this.image, this.x, this.y);
    this.psx -= 8;
    ctx.restore()

  }
}
/**Particle system to create rain affect*/
class RainDrop {
  constructor() {
    this.startPos = new Vector(0, 0);
    this.pos = new Vector(0, 0);
    this.startPos.x = this.pos.x = Math.random() * ctx.canvas.width
    this.startPos.y = this.pos.y = (Math.random() * ctx.canvas.height) - ctx.canvas.height;
    this.image = document.createElement("img");
    this.image.src = './images/16.png';
    this.width = 16;
    this.height = 16;
    this.rotate = 0.0;
    this.velocity = new Vector(0, (Math.random() * 20) + 2);
    this.scale = (Math.random() * .9) + .1;
    if (Math.random() < .5) this.rotationInc = -this.rotationInc;
  }
  update() {
    this.pos.add(this.velocity);
    if (this.pos.y > ctx.canvas.height) {
      this.pos.y = this.startPos.y;
    }
    this.rotate += this.rotationInc;
  }
  draw() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.scale(this.scale, this.scale)
    ctx.translate(-this.width / 2, -this.height / 2);
    ctx.drawImage(this.image, 0, 0, this.width, this.height)
    ctx.restore();

  }
}
class Rain {
  constructor(size) {
    this.size = size;
    this.array = [];
    this.scale;
  }
  init() {
    for (let i = 0; i < this.size; i++) {
      this.array.push(new RainDrop())
    }
  }
  update() {
    for (let i = 0; i < this.size; i++) {
      this.array[i].update();
    }
  }
  draw() {
    for (let i = 0; i < this.size; i++) {
      this.array[i].draw();
    }
  }
}
/** Creating day and night affect*/
function backgroundEffect(scene) {

  let xoff = 100;
  let yoff = 5;
  let backgroundGradient;
  if (scene == "day") {
    backgroundGradient = ctx.createLinearGradient(0, 0, 0, 400);
    backgroundGradient.addColorStop(0, 'rgba(64, 156, 255,1)');
    backgroundGradient.addColorStop(1, 'rgba(255, 147, 41,.01)');
  } else if (scene == "night") {
    backgroundGradient = ctx.createLinearGradient(0, 0, 0, 420);
    backgroundGradient.addColorStop(0, 'rgba(0, 0, 0,1)');
    backgroundGradient.addColorStop(1, 'rgba(76, 76, 76,.2)');
  }
  else if (scene == "rain") {
    backgroundGradient = ctx.createLinearGradient(0, 0, 0, 450);
    backgroundGradient.addColorStop(0, 'rgba(109, 109, 109,1)');
    backgroundGradient.addColorStop(1, 'rgba(109, 109, 109,.4)');
  }
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(-100 + xoff, 116 + yoff);
  ctx.bezierCurveTo(-100 + xoff, -7 + yoff, -100 + xoff, 745 + yoff, -100 + xoff, 745 + yoff);
  ctx.bezierCurveTo(-100 + xoff, 745 + yoff, 1400 + xoff, 745 + yoff, 1400 + xoff, 745 + yoff);
  ctx.bezierCurveTo(1400 + xoff, 745 + yoff, 1400 + xoff, -7 + yoff, 1400 + xoff, -7 + yoff);
  ctx.bezierCurveTo(1400 + xoff, -7 + yoff, -100 + xoff, -7 + yoff, -100 + xoff, -7 + yoff);
  ctx.fillStyle = backgroundGradient;
  ctx.strokeStyle = ('255, 214, 170,.1)');
  ctx.stroke();
  ctx.fill();
  ctx.save();
  ctx.restore();

}

/** Draw artiuclated object for word SUCCESS */

let rx = 0;
let tx = 0;
let ty = 0;
let inc = 0.3;
let sx;
let sy = 1;
let waveAngle = 0.0;
let waveInc = 6 * toRadians;
let rotAngle = 60 * toRadians;
let goingClockwise = false;
let theta = 0;
let xAxis = 600;
let yAxis = 500;

function s() {

  ctx.save();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "rgb(42, 244, 247)";
  ctx.textAlign = "center";
  ctx.fillText("S", xAxis, yAxis);
  ctx.restore();
}
function u() {
  ctx.save();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "rgb(255, 8, 239)";
  ctx.textAlign = "center";
  ctx.fillText(" U ", xAxis, yAxis);
  ctx.restore();
}
function cc() {
  ctx.save();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "rgb(88, 255, 0)";
  ctx.textAlign = "center";
  ctx.fillText("C C", xAxis, yAxis + 100);
  ctx.restore();
}
function e() {
  ctx.save();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "rgb(183, 0, 255)";
  ctx.textAlign = "center";
  ctx.fillText("E", xAxis, yAxis + 130);
  ctx.restore();
}
function s1() {
  ctx.save();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "rgb(255, 188, 64)";
  ctx.textAlign = "center";
  ctx.fillText("S", xAxis + 10, yAxis + 130);
  ctx.restore();
}
function s2() {
  ctx.save();
  ctx.font = "30px Comic Sans MS";
  ctx.fillStyle = "rgb(255, 0, 149)";
  ctx.textAlign = "center";
  ctx.fillText("S", xAxis, xAxis);
  ctx.restore();
}
function sTransformations() {
  ctx.translate(tx, 0);

}
function uTransformations() {

  ctx.translate(xAxis, yAxis, 0);
  ctx.rotate(3);
  ctx.rotate(1 * waveAngle);
  ctx.translate(-xAxis, -yAxis, 0);

}
function ccTransformations() {
  ctx.translate(xAxis, yAxis + 30);
  ctx.rotate(3.2);
  ctx.translate(-xAxis, -yAxis - 30);
}
function eTransformations() {
  ctx.translate(xAxis + 20, yAxis + 40);
  ctx.rotate(7);
  ctx.translate(-xAxis + 20, -yAxis - 40);
}
function s1Transformations() {
  ctx.translate(xAxis + 6, yAxis - 10);
  ctx.translate(-xAxis + 6, -yAxis);
}

function drawArticulatedWord() {
  //draw s
  ctx.save()
  sTransformations();
  s();
  ctx.restore()
  //draw u
  ctx.save()
  sTransformations();
  uTransformations();
  u();
  ctx.restore()
  //drawcc
  ctx.save()
  sTransformations();
  uTransformations();
  ccTransformations();
  cc();
  ctx.restore()
  //draw  e
  ctx.save()
  sTransformations();
  uTransformations();
  ccTransformations();
  eTransformations();
  e();
  ctx.restore()
  //draw first s
  ctx.save()
  sTransformations();
  uTransformations();
  ccTransformations();
  s1Transformations();
  s1();
  ctx.restore()
  drawRotatingS();
  calculateWaveAngle();
  tx += inc; ty += inc;
}
function calculateWaveAngle() {
  if (goingClockwise) {
    waveAngle = waveAngle + waveInc;
    if (waveAngle > rotAngle)
      goingClockwise = false;
  }
  else if (!goingClockwise) {
    waveAngle = waveAngle - waveInc;
    if (waveAngle < -rotAngle)
      goingClockwise = true;
  }
}
function drawRotatingS() {
  ctx.save()
  sTransformations();

  // rotate around itself
  ctx.translate(xAxis, yAxis + 25);
  ctx.rotate(theta * 3);
  ctx.translate(-xAxis, -yAxis - 25);

  s2();
  ctx.restore()
  theta += 1 * toRadians;
}

/** Tween from sun to moon and moon to sun */
let proportion = 0;
let tweenPoly;
class Shape {
  constructor(points, color) {
    this.points = points;
    this.color = color;
  }
  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(-100, -20);

    ctx.moveTo(this.points[0][0], this.points[0][1]);
    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i][0], this.points[i][1]);
    }
    ctx.lineTo(this.points[0][0], this.points[0][1]);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(250,249,231)'
    ctx.stroke();
    ctx.restore();
  }
  tween(a, b, proportion) {
    let differenceX;
    let differenceY;
    let tweenX;
    let tweenY;
    let result = new Shape([], 'rgb(0,0,0)')

    for (let i = 0; i < a.points.length; i++) {
      differenceX = b.points[i][0] - a.points[i][0];
      differenceY = b.points[i][1] - a.points[i][1];
      tweenX = a.points[i][0] + (differenceX * proportion);
      tweenY = a.points[i][1] + (differenceY * proportion);
      result.points.push([tweenX, tweenY])
    }
    let acolor = a.color.substring(4, a.color.length - 1).split(',');
    let bcolor = b.color.substring(4, b.color.length - 1).split(',');
    let rcol = parseInt(acolor[0]) + ((parseInt(bcolor[0]) - parseInt(acolor[0])) * proportion);
    let gcol = parseInt(acolor[1]) + ((parseInt(bcolor[1]) - parseInt(acolor[1])) * proportion);
    let bcol = parseInt(acolor[2]) + ((parseInt(bcolor[2]) - parseInt(acolor[2])) * proportion);
    result.color = 'rgb(' + rcol + ',' + gcol + ',' + bcol + ')';
    return (result)
  }
}

class Shape1 {
  constructor(points, color) {
    this.points = points;
    this.color = color;
  }
  draw() {
    ctx.save();
    ctx.translate(300, 100, 0);
    console.log(this)
    ctx.beginPath();
    ctx.moveTo(this.points[0][0], this.points[0][1]);
    for (let i = 0; i < this.points.length; i++) {
      ctx.lineTo(this.points[i][0], this.points[i][1]);
    }
    ctx.lineTo(this.points[0][0], this.points[0][1]);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = ' black';
    ctx.stroke();
    ctx.restore();
  }
  tween(a, b, proportion) {
    let differenceX;
    let differenceY;
    let tweenX;
    let tweenY;
    let result = new Shape([], 'rgb(0,0,0)')

    for (let i = 0; i < a.points.length; i++) {
      differenceX = b.points[i][0] - a.points[i][0];
      differenceY = b.points[i][1] - a.points[i][1];
      tweenX = a.points[i][0] + (differenceX * proportion);
      tweenY = a.points[i][1] + (differenceY * proportion);
      result.points.push([tweenX, tweenY])
    }
    let acolor = a.color.substring(4, a.color.length - 1).split(',');
    let bcolor = b.color.substring(4, b.color.length - 1).split(',');
    let rcol = parseInt(acolor[0]) + ((parseInt(bcolor[0]) - parseInt(acolor[0])) * proportion);
    let gcol = parseInt(acolor[1]) + ((parseInt(bcolor[1]) - parseInt(acolor[1])) * proportion);
    let bcol = parseInt(acolor[2]) + ((parseInt(bcolor[2]) - parseInt(acolor[2])) * proportion);
    result.color = 'rgb(' + rcol + ',' + gcol + ',' + bcol + ')';
    return (result)
  }
}

function tweenTwoPolygons(apoly, bpoly, inc) {
  tweenPoly = apoly.tween(apoly, bpoly, proportion);
  proportion += inc
  if (proportion >= 1)
    proportion = 0
}