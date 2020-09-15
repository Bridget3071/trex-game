var trex,trex_img;
var ground_img,ground2,ground,cloud_img;
var cloudsGroup,obstacleGroup;
var obs,obs2,obs3,obs4,obs5,obs6;
var PLAY,END,gamestate;
var trex_stop,score;
var jumpsound,diesound,checkpointsou;
var gameover,restart,gameover_img,restart_img;
var bird,bird_img,bird_stop,birdgroup;
var trex_duct;

function preload(){
  
  trex_img=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_img=loadImage("ground2.png");
  cloud_img=loadImage("cloud.png");
  obs=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
trex_stop=loadAnimation("trex_collided.png");
  jumpsound=loadSound("jump.mp3");
  diesound=loadSound("die.mp3");
  checkpointsou=loadSound("checkPoint.mp3");
  restart_img=loadImage("restart.png");
  gameover_img=loadImage("gameOver.png");
  bird_img=loadAnimation("bird_1.png","bird_2.png");
  bird_stop=loadAnimation("bird_2.png");
  trex_duct=loadAnimation("trex duct.png");
}

function setup() {
   createCanvas(600,200);
  trex=createSprite(50,150,20,10);
  trex.addAnimation("running",trex_img);
  trex.addAnimation("collided",trex_stop);
  
  ground=createSprite(50,170,10,10);
  ground.addImage("ground2",ground_img);
  
  ground.x=ground.width/2;
  ground.velocityX=-4;
   ground2 = createSprite(40,180,400,10);
  ground2.visible = false;
  trex.scale=0.5;
  
  cloudsGroup=new Group ();
  obstacleGroup=new Group ();
 
  PLAY=1;
  END=0;
  gamestate=PLAY;
  
  score=0;
  
  restart=createSprite(300,140,10,10);
  gameover=createSprite(300,100,10,10);
  
  
  restart.addImage(restart_img);
  gameover.addImage(gameover_img);
  
  restart.visible=false;
  gameover.visible=false;
  
  gameover.scale=0.5;
  restart.scale=0.5;
  
  birdgroup=new Group();
 
  trex.addAnimation("duct",trex_duct);
}

function draw() {
  background(180);
  createEdgeSprites();
 
  console.log(trex.y);
  
  if(gamestate===PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
       if(keyDown("space")&& trex.y>=140 ){
      trex.velocityY = -12 ;
         jumpsound.play();
       }
         trex.velocityY=trex.velocityY+0.8;
    
     spawnClouds();
  spawnObstacles();
    
    if(obstacleGroup.isTouching(trex)||birdgroup.isTouching(trex)){
       gamestate=END;
      diesound.play();
       }
    
      score=score+Math.round(getFrameRate()/60);

    if(score>0&&score%100===0){
      checkpointsou.play();
    }
    
    if(score>=50){
      spawnbird();
    }
    
    if(keyWentDown("down")){
      trex.changeAnimation("duct");
    }
    if(keyWentUp("down")){
      trex.changeAnimation("running");
    }
    }
  else if(gamestate===END){
    ground.velocityX=0;
    
    cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    cloudsGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    trex.changeAnimation("collided",trex_stop);
    
    trex.velocityY=0;
    
    restart.visible=true;
    gameover.visible=true;
    
    birdgroup.setLifetimeEach(-1);
    birdgroup.setVelocityXEach(0);
    
   // bird.changeAnimation("stop");
    
    if(mousePressedOver(restart)){
      reset();
       
       }
    
    
  }
  
  
 //console.log(trex.y);
  
  trex.collide(ground);
  
 drawSprites();
  
  text("Score="+score,500,80);
  
  
 
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(90,120  );
    cloud.addImage(cloud_img);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}
  
  function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,150,10,10);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
   switch(rand){
     case 1:obstacle.addImage(obs);
       break;
       case 2:obstacle.addImage(obs2);
       break;
       case 3:obstacle.addImage(obs3);
       break;
       case 4:obstacle.addImage(obs4);
       break;
       case 5:obstacle.addImage(obs5);
       break;
       case 6:obstacle.addImage(obs6);
       break;
       default:break;
   }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}

 function reset(){
   gamestate=PLAY;
   
   restart.visible=false;
   gameover.visible=false;
   
   obstacleGroup.destroyEach();
   cloudsGroup.destroyEach();
   
   score=0;
   
   trex.changeAnimation("running",trex_img);
   
  // bird.visible=false;
 }

function spawnbird(){
  if(frameCount%100===0){
    bird=createSprite(600,140,10,10);
    bird.addAnimation("flying",bird_img);
    bird.scale=0.5;
    bird.y=random(120,150); 
    bird.velocityX=-5;
    bird.lifetime=200;
    
    birdgroup.add(bird);
    
     bird.addAnimation("stop",bird_stop);
    
  }
}
  