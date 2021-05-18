var player,playerImg;
var chicken,chickenImg,ChickenGroup,obstacle,obstacleImg;
var BackgroundImg,BackGroundS;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var chickenCounter = 5;
var fuelCounter = 0;
var restart,restartImg,gameOver,gameOverImg;
var fuel,fuelImg,fuelGroup;





function preload(){
playerImg = loadImage("Images/SpaceShip1.png");
BackgroundImg = loadImage("Images/Space Back.jpg");
chickenImg = loadImage("Images/Chicken Enemy.png");
restartImg = loadImage("Images/Reset.png");
gameOverImg = loadImage("Images/Game Over.png");
fuelImg = loadImage("Images/Fuel.png");


 }


function setup() {
  createCanvas(800,800);


  //Background
BackGroundS = createSprite(400,400,50,50);
BackGroundS.addImage(BackgroundImg);
BackGroundS.scale = 1;


  //Player
  player = createSprite(400,700,10,10);
  player.addImage(playerImg);
  player.scale = 0.3;

  restart = createSprite(400,400,10,10)
  restart.addImage(restartImg);
  restart.scale = 0.1;

  gameOver = createSprite(400,250,10,10)
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  

  ChickenGroup = new Group();
  fuelGroup = new Group();

  



  
}

function draw() {
  background("black");

BackGroundS.velocityY = 3;


if(gameState === PLAY){

  gameOver.visible = false;
  restart.visible = false;

  if (BackGroundS.y > 650){
    BackGroundS.y = BackGroundS.height/4;
  }


  if(keyDown(RIGHT_ARROW)){
    player.x += 8;

  }

  if(keyDown(LEFT_ARROW)){
    player.x += -8;

  }

  if(keyDown(UP_ARROW)){
    player.y += -8;

  }

  if(keyDown(DOWN_ARROW)){
    player.y += 8;

  }

  if(player.isTouching(ChickenGroup)){
    ChickenGroup.destroyEach();
    chickenCounter -= 1;
  }

  if(player.isTouching(fuelGroup)){
    fuelGroup.destroyEach();
    fuelCounter += 1;
  }

  if(frameCount === 500){
    textSize(20);
    fill('white');
    text("Level 2!",400,400);
  }

  
  


  if(chickenCounter === 0){
    gameState = END;
  }

  spawnFuel()
  spawnChicken()
}

else{

  
  ChickenGroup.destroyEach();
  player.x = 400;
  player.y = 700;
  BackGroundS.velocityY = 0;
  gameOver.visible = true;
  restart.visible = true;
  
}


if(mousePressedOver(restart)){
  reset()
}

  drawSprites();
  textSize(20);
  fill("white");
  text("Life: "+ chickenCounter,50,50);
  text("Fuel: "+ fuelCounter,700,50);
}

function spawnChicken(){
  if(frameCount % 60 === 0){
  chicken = createSprite(Math.round(random(50,750)),0,10,10);
  chicken.addImage(chickenImg)
  chicken.velocityY = 5;
  chicken.scale = 0.2;
  chicken.lifetime = 160;
  ChickenGroup.add(chicken);
  }

}

function spawnRocket(){


}

function reset(){
gameState = PLAY;
chickenCounter = 5;
gameOver.visible = false;
restart.visible = false;

}

function spawnFuel(){
  if(frameCount % 150 === 0){
    fuel = createSprite(Math.round(random(50,750)),0,10,10);
    fuel.addImage(fuelImg);
    fuel.velocityY = 8;
    fuel.lifetime = 160;
    fuel.scale = 0.1;
    fuelGroup.add(fuel);


  }
}