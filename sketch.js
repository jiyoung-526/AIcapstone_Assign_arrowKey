let startImg;
let gameState = 'start';
let bgImg;
let bgx1 = 0;
let bgx2;
let bgimgwidth;
let birdImg;
let birdY;
let velocity; // Y speed of bird
let gravity = 0.3;
let mosImg;
let mosX, mosY;
let score;
let bulidImg;
let buildX;
let buildImg2;
let buildX2;
let overImg;
let bgm;

function preload(){
  startImg = loadImage('Asset/Start.png');
  bgImg = loadImage('Asset/Background.png');
  birdImg = loadImage('Asset/bird.png');
  mosImg = loadImage('Asset/mos.png');
  buildImg = loadImage('Asset/build1.png');
  buildImg2 = loadImage('Asset/build3.png');
  overImg=loadImage('Asset/Over.png');
  bgm = loadSound('Asset/Bandicoot.mp3');
}

function setup() {
  createCanvas(1600, 900);
  bgimgwidth = bgImg.width;
  bgx2 = bgimgwidth;
  
  birdY = height/2;
  velocity = 0;
  
  mosX = width;
  mosY = random(height);
  
  score = 0;
  
  buildX = width;
  buildX2 = width+600;
}

function draw() {
  background(0);
  
  switch(gameState){
    case "start":
      image(startImg, width/2-startImg.width/2, height/2-startImg.height/2);
      // if (bgm.isPlaying()){
      //   bgm.stop();
      // }
      if (!bgm.isPlaying()){
      bgm.play();
      }
      break;
      
    case "game":
      Back();
      if (!bgm.isPlaying()){
      bgm.play();
      }
      drawGame();
      break;
    
    case "over":
      image(overImg, width/2-startImg.width/2, height/2-startImg.height/2);
      textSize(64);
      fill(255);
      stroke(0);
      strokeWeight(10);
      text("SCORE: " + score, width / 2-160, height / 2 + 150);
      
      if (bgm.isPlaying()){
        bgm.stop();
      }
      break;
  }
}


function Back(){
  image(bgImg, bgx1, 0);
  image(bgImg, bgx2, 0);
  
  bgx1 -= 0.6;
  bgx2 -= 0.6;
  
  if(bgx1<= - bgimgwidth){
    bgx1 = bgimgwidth;
  }
  
  if(bgx2 <= -bgimgwidth){
    bgx2 = bgimgwidth;
  }
}

function drawGame(){
  // if (!bgm.isPlaying()){
  //     bgm.play();
  // }
  image(birdImg, width/4, birdY, 150, 150);
  image(mosImg, mosX, mosY, 50, 50);
  image(buildImg2, buildX2, height-buildImg2.height+650, 240, 480);
  image(buildImg, buildX, height-buildImg.height+500, 270, 540);
  
  
  velocity += gravity;
  birdY += velocity;
  birdY = constrain(birdY, 20, height - birdImg.height/2+100);
  
  mosX -= (3, 5.5);
  buildX -= 1.7;
  buildX2 -= 1.4;
  
  if(mosX < -50){
    mosX = width+50;
    mosY = random(50, height-50);
  }
  
  let d = dist(width/4, birdY, mosX, mosY);
  if (d< (birdImg.width / 2 + 25)){
    mosX = width;
    mosY = random(height);
    score += 1;
  }
  
  textSize(30);
  fill(0);
  text("SCORE: " + score, 10, 30);
  
  if(buildX < -buildImg.width){
    buildX = width;
  }
  if(buildX2 < -buildImg2.width){
    buildX2 = width-100;
  }
  
  let birdRect = {
    x: width/4,
    y: birdY,
    width: 150,
    height: 150
  };
  
  let buildRect = {
    x: buildX,
    y: height-buildImg.height+500,
    width: 270,
    height: 540
  };
  
  let buildRect2 = {
    x: buildX2,
    y: height-buildImg2.height+500,
    width: 270,
    height: 540
  };
  
  if (isIntersecting(birdRect, buildRect)) {
    gameState = "over";
  }
  
  if (isIntersecting(birdRect, buildRect2)) {
    gameState = "over";
  }
}

function isIntersecting(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}



function keyPressed() {
  if (key == 'ArrowUp' && gameState == "game") { // 위쪽 방향키 & 게임 중일 때
    velocity = -10; // 새 점프!
  }
}

function mousePressed(){
  switch(gameState){
    case "start":
      if (mouseX > width/2 - startImg.width/2 && mouseX < width/2 + startImg.width/2 && 
          mouseY > height/2 - startImg.height/2 && mouseY < height/2 + startImg.height/2){ 
      gameState = "game";
    }
  }
  
  switch(gameState){
    case "over":
      if (mouseX > width/2 - startImg.width/2 && mouseX < width/2 + startImg.width/2 && 
          mouseY > height/2 - startImg.height/2 && mouseY < height/2 + startImg.height/2){ 
      gameState = "start";
    }
  }
}