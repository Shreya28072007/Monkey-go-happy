
var monkey , monkey_running,monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadImage("sprite_0.png");
 
}



function setup() {
  
  createCanvas(400,400);
  monkey = createSprite(80,330,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
    ground = createSprite(200,350,800,10);
    ground.velocityX = -7;
    ground.x = ground.width /2;
  
  //creating groups
  FoodGroup = createGroup() ; 
  obstacleGroup = createGroup();
}


function draw() {
background("white");

  if(gameState===PLAY){
    
    //creating moving ground
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y>150){
    monkey.velocityY = -12;
  }
  //giving gravity
  monkey.velocityY = monkey.velocityY+0.8;
  
   if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+1;}
     
     food();
  obstacles();
     
   survivalTime=Math.ceil(frameCount/frameRate());
     
     if(obstacleGroup.isTouching(monkey)){
       gameState = END;
     }}
  
   
    
  
  else if(gameState === END){
  
    text("Game Over",200,200);
   
    
     ground.velocityX = 0;
     monkey.velocityY = 0;
  
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0); 
     
  }
 
  

  
  
  stroke("white");
  textSize(20);
  fill("white");
  
  stroke("black");
  textSize(20);
  fill("black");
 
  text("Survival Time : "+survivalTime,100,50);
  
  text("Score:"+score,300,20);
  
 
 
  monkey.collide(ground);
  drawSprites(); 
}

function food(){
  if(frameCount % 80===0){
    banana = createSprite(400,100,10,10);
    banana.y = Math.round(random(100,200));
    banana.addImage("yummy",bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}

function obstacles(){
 if(frameCount % 200 === 0){
  obstacle = createSprite(400,330,10,10);
  obstacle.addImage("hit",obstacleImage);
   obstacle.scale = 0.15;
   obstacle.velocityX = -5;
   obstacle.lifetime = 200;
   obstacleGroup.add(obstacle);
 }
}





