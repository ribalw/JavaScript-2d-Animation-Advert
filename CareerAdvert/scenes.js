
/**JavaScript file to add and update different scenes by time interval */

function scenes() {

  if (count <= 30) {
    background1.draw();
    sun.draw();
    sideSound.play();
    backgroundEffect("day");
    boyIdle.drawAnim(true);
    cloud.drawCloud(true, "🧑 I should");

  } else if (count > 30 && count <= 80) {
    background1.draw();
    sun.draw();
    backgroundEffect("day");
    boyIdle.drawAnim(true);
    cloud.drawCloud(true, "🧑 move to city 🏙️");

  } else if (count > 80 && count <= 120) {
    background1.draw();
    sun.draw();

    backgroundEffect("day");
    boyIdle.drawAnim(true);
    cloud.drawCloud(true, "🧑 so I can ❔");
  }
  else if (count > 120 && count <= 150) {
    background1.draw();
    sun.draw();
    backgroundEffect("day");
    boyIdle.drawAnim(true);
    cloud.drawCloud(true, "🧑 establish a ...... 🙄");
  }
  else if (count >= 150 && count <= 290) {
    backgroundEffect("day");
    background1.scrollBackground(1, background2, background3, 3, true);
    sun.draw();
    backgroundEffect("day");
    boyWalk.drawAnim(true);
    cloud.drawCloud(false, "Successful 👨‍💻 Career! ");

  }

  else if (count >= 290 && count <= 330) {
    background1.scrollBackground(1, background3, background3, 4, true);
    tweenTwoPolygons(sun, moon, 1 / interval);
    tweenPoly.draw();
    citySound.play();
    backgroundEffect("night");
    drawArticulatedWord();
    boyJump.drawAnim(false);
    cloud.drawCloud(false, "Lets Start 🤩");

  }
  else if (count >= 330 && count <= 400) {
    background2.scrollBackground(1, background3, background3, 4, true);
    moon.draw();
    sideSound.pause();
    backgroundEffect("night");
    drawArticulatedWord();
    boyRun.drawAnim(false);
    cloud.drawCloud(false, "So.............🤔 ");

  }
  else if (count >= 400 && count <= 490) {
    background2.scrollBackground(1, background3, background3, 4.2, true);
    moon.draw();
    backgroundEffect("night");
    obstacle1.drawObstacle();
    drawArticulatedWord();
    boyRun.drawAnim(false);
    cloud.drawCloud(false, "Find🛏️Accomodation");

  }
  else if (count >= 490 && count <= 530) {
    background2.scrollBackground(1, background3, background3, 4.5, true);
    tweenTwoPolygons(moon, sun, 1 / interval);
    tweenPoly.draw();
    backgroundEffect("day");
    drawArticulatedWord();
    obstacle1.drawObstacle();
    boyJump.drawAnim(true);
    cloud.drawCloud(false, "Got it 🛌🏼");

  }
  else if (count >= 530 && count <= 630) {
    background2.scrollBackground(1, background3, background3, 4.8, true);
    sun.draw();
    backgroundEffect("day");
    obstacle2.drawObstacle();
    drawArticulatedWord();
    boyRun.drawAnim(true);
    cloud.drawCloud(false, "Start Studies 📚");

  }
  else if (count >= 630 && count <= 670) {
    background2.scrollBackground(1, background3, background3, 5, true);
    tweenTwoPolygons(sun, moon, 1 / interval);
    tweenPoly.draw();
    backgroundEffect("night");
    obstacle2.drawObstacle();
    drawArticulatedWord();
    boyJump.drawAnim();
    cloud.drawCloud(false, "Studying 📖");

  }
  else if (count >= 670 && count <= 770) {
    background2.scrollBackground(1, background3, background3, 5.3, true);
    moon.draw();
    backgroundEffect("night");
    obstacle3.drawObstacle();
    drawArticulatedWord();
    boyRun.drawAnim();
    cloud.drawCloud(false, "Get Degree 🎓");

  }
  else if (count >= 770 && count <= 810) {
    background2.scrollBackground(1, background3, background3, 5.5, true);
    tweenTwoPolygons(moon, sun, 1 / interval);
    tweenPoly.draw();
    backgroundEffect("day");
    obstacle3.drawObstacle();
    drawArticulatedWord();
    boyJump.drawAnim(true);
    cloud.drawCloud(false, "Graduated 🧑‍🎓 ");

  }
  else if (count >= 770 && count <= 900) {
    background2.scrollBackground(1, background3, background3, 5.7, true);
    sun.draw();
    backgroundEffect("day");
    drawArticulatedWord();
    boyRun.drawAnim(true);
    cloud.drawCloud(false, "Find Job 🔍");

  }
  else if (count >= 900 && count <= 950) {
    background2.scrollBackground(1, background3, background3, 5.7, true);
    backgroundEffect("rain");
    rain.draw();
    rainSound.play();
    drawArticulatedWord();
    boyRun.drawAnim(false);
    cloud.drawCloud(false, "Find Job 🔍");


  }
  else if (count >= 950 && count <= 1030) {
    background2.scrollBackground(1, background3, background3, 6, true);
    backgroundEffect("rain");
    rain1.draw();
    citySound.pause();
    drawArticulatedWord();
    boyRun.drawAnim();
    cloud.drawCloud(false, "Find Job 🔍");


  }
  else if (count >= 1030 && count <= 1080) {
    background2.scrollBackground(1, background3, background3, 6, true);
    backgroundEffect("rain");
    rain1.draw();
    rain2.draw();
    backgroundEffect("rain");
    drawArticulatedWord();
    boyRun.drawAnim(false);
    cloud.drawCloud(false, "Still Finding 😮‍💨 ");
  }
  else if (count >= 1080 && count <= 1130) {
    background2.scrollBackground(1, background3, background3, 6, true);
    backgroundEffect("rain");
    rain2.draw();
    rain3.draw();
    backgroundEffect("rain");
    drawArticulatedWord();
    boyWalk.drawAnim(false);
    cloud.drawCloud(false, "Still Finding 😮‍💨 ");

  }
  else if (count >= 1130 && count <= 1220) {
    background2.scrollBackground(1, background3, background3, 6, false);
    backgroundEffect("rain");
    rain2.draw();
    rain1.draw();
    backgroundEffect("rain");
    drawArticulatedWord();
    boyIdle.drawAnim();
    cloud.drawCloud(false, "Tired 🥺");

  }
  else if (count >= 1220 && count <= 1270) {
    background2.scrollBackground(1, background3, background3, 6, true);
    backgroundEffect("rain");
    rain.draw();
    tensedSound.play();
    drawArticulatedWord();
    boyWalk.drawAnim(false);
    cloud.drawCloud(false, "Depressed 😟 ");


  } else if (count >= 1270 && count <= 1370) {
    background2.scrollBackground(1, background3, background3, 5.3, true);
    tweenTwoPolygons(moon, sun, 1 / 200);
    tweenPoly.draw();
    rainSound.pause();
    backgroundEffect("day");
    obstacle4.drawObstacle();
    drawArticulatedWord();
    boyRun.drawAnim(true);
    cloud.drawCloud(false, "Job Interview 😯");

  }
  else if (count >= 1370 && count <= 1400) {
    background2.scrollBackground(1, background3, background3, 5.5, true);
    sun.draw();
    backgroundEffect("day");
    obstacle4.drawObstacle();
    boyDead.drawAnim(true);
    drawArticulatedWord();
    cloud.drawCloud(false, "Failed 😭 ");

  }

  else {
    window.location.href = "./3dMessage.html";
  }

}
function update(elapsed) {

  scenes();

  //updating number of drain particles from system
  rain.update();
  rain1.update();
  rain2.update();

}
function draw() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  scenes();

}

