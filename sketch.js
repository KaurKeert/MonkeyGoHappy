var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var score=0

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png")
stoneImage=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup=new Group()
  stoneGroup=new Group()


}

function draw() { 
 
 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  


    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
spawnFood()
spawnStone()
  if(FoodGroup.isTouching(player)){
FoodGroup.destroyEach()
score=score+1
player.scale+=0.01
  }

  if(stoneGroup.isTouching(player)){
   gameState=END
      }

   

  drawSprites();
  fill("white")
textSize(14)
  text("Score  : " + score,700,50)
  if(gameState === END){

    backgr.velocityX=0
    player.visible=false
    
    FoodGroup.destroyEach()
    stoneGroup.destroyEach()
    
    textSize(30);
    fill(255);
    text("GAME OVER !",300,200)
    
        }  
}
function spawnFood(){
if(frameCount % 80 === 0){
  var banana =createSprite(1200,250,40,10)
  banana.y=random(120,200)
  banana.addImage(bananaImage)
  banana.scale=0.05;
  banana.velocityX=-4;

  banana.lifetime =400
  player.depth=banana.depth+1
  FoodGroup.add(banana)
}

}
function spawnStone(){
  if(frameCount % 100 === 0){
    var stone =createSprite(1150,300,40,10)
   stone.addImage(stoneImage)
    stone.scale=0.2;
    stone.velocityX=-5;
  
    stone.lifetime =400
    player.depth=stone.depth+1
    stoneGroup.add(stone)
  }
  
  }
