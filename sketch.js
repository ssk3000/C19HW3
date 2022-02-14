var character, characterImg;
var spike, spikeImg, spikesGroup;
var floor, floorImg, floor2, floorimg2;
var gameState = "play";
var frameRateResetSpike;
var score;

function preload(){
    characterImg = loadImage("character.png");
    spikeImg = loadImage("spike.png");
    floorImg = loadImage("floor.png");
    floorImg2 = loadImage("floor.png")
}

frameRateResetSpike = 80

function spawnObstacles() {
    if(frameCount % frameRateResetSpike == 0) {
        spike = createSprite(300,300);
        spike.addImage("spike", spikeImg);
        spike.velocityX = -4
        spike.x = 800
        spike.y = 380
        spike.scale = 0.2
        spike.lifetime = 900
        spikesGroup.add(spike)
        spike.setCollider("rectangle",0,0,spike.width,spike.height)
        spike.debug = true
        frameRateResetSpike = Math.round(random(100,200))
        console.log(frameRateResetSpike)
       
       character.depth += 2
    }
}

function setup() {
    createCanvas(800,400)

    floor = createSprite(200,50)
    floor.addImage("floor", floorImg)
    floor.velocityX = -4
    floor.y = 400
    floor.x = 800
    floor.scale = 2

    floor2 = createSprite(200,50)
    floor2.addImage("floor", floorImg2)
    floor2.y = 200
    floor2.x = 800
    floor2.scale = 2
    floor2.visible = false

    spikesGroup = createGroup()

    character = createSprite(300,300);
    character.addImage("character", characterImg)
    character.x = 50;
    character.y = 370;
    character.scale = 0.12
    character.setCollider("rectangle",0,0,character.width+50,character.height+50)
    character.debug = true;
    score = 0
}

function draw() {
    background(0,0,0)
    textSize(20)
    text("Score: " + score,680,20)
    if(gameState == "play") {
    spawnObstacles();
        if(keyDown("space") || keyDown("up")) {
            character.velocityY -= 10
            console.log(character.y)
        }
        if(character.velocityY < 100) {
             character.velocityY += 1
    }
    if(gameState == "play") {
        if(floor.x < 600){
            floor.x = 700
          }
          if(character.isTouching(floor)) {
            score += 1
          }
        
        }
    if(spikesGroup.isTouching(character)){
        gameState = "end"
          
    }
    
    character.collide(floor2)
    
    if(gameState == "end") {
        floor.velocityX = 0;
        character.velocityY = 0;
        spikesGroup.setVelocityXEach(0)
        spikesGroup.setLifetimeEach(-1)
        text("Game Over",400,200)
        
    }
}
    
    character.collide(floor)
    drawSprites();
}