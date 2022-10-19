var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var allPlayers,car1, car2, car1_img,cars, car2_img
var gameState
var powerCoinsImage,fuels, powerCoins
var lifeImage,fuelImage
var obstacle1Image, obstacle1, obstacle2Image, obstacle2, obstacles

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1_img =loadImage("./assets/car1.png")
  car2_img =loadImage("./assets/car2.png")
  track = loadImage("./assets/track.jpg")
  fuelImage = loadImage("./assets/fuel.png")
  powerCoinsImage = loadImage("./assets/goldCoin.png")
  lifeImage = loadImage( "./assets/life.png")
  obstacle1Image = loadImage("./assets/obstacle1.png")
  obstacle2Image = loadImage("./assets/obstacle2.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState()

  game.start();
  bgImg = backgroundImage;
}

function draw() {
  background(bgImg);
  if(playerCount === 2){
    game.update (1)
  }
  if(gameState === 1){
    game.play()
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}