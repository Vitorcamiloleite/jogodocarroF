class Game {
  constructor() {
    this.resetTitle = createElement("h2")
    this.resetButton = createButton("")
    this.leaderBoarTitle = createElement("h2")
    this.leader1 = createElement("h2")
    this.leader2 = createElement("h2")
    this.playerMoving = false
  }

  getState() {//método que irá ler o gameState do banco de dados
      var gameStateRef = database.ref("gameState");//me referindo a chave gameState criada no bd
      //criando um ouvinte que fica acompanhando a mudança no valor da variável gameState no bd.
      gameStateRef.on("value", function(data) {  
        gameState = data.val()      
      
    });
  }

  update(state) {//método que irá atualizar o gameState no bd para um valor passado para ele como parâmetro
    database.ref("/").update({//se refere ao banco de dados principal dentro do qual gameState é criado
      gameState: state
    });

  }
  start() {//método para obter o gameState e então iniciar o jogo
    //instância de um novo jogador
    player = new Player();
    playerCount = player.getCount()
    //inciando a variável playerCount
    form = new Form();
    form.display();

    //criar sprites dos jogadores
      car1 = createSprite(width/2 - 50, height - 100)
      car1.addImage("car1",car1_img)
      car1.scale = 0.07

      car2 = createSprite(width/2 + 100, height - 100)
      car2.addImage("car2",car2_img)
      car2.scale = 0.07

      //atribuindo os objetos ao vetor cars
    cars = [car1, car2]
    fuels = new Group()
    powerCoins = new Group()
    obstacle1 = new Group()
    obstacle2 = new Group()

    var obstacle1Positions = [
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
    ];
    var obstacle2Positions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];
 
    this.addSprites(fuels, 4, fuelImage, 0.02)
    this.addSprites(powerCoins, 18, powerCoinsImage, 0.09)
    //this.addSprites(obstacle1,obstacle1Positions.length,obstacle1Image,0.03,obstacle1Positions)
    //this.addSprites(obstacle2,obstacle2Positions.length,obstacle2Image,0.03,obstacle2Positions)
  }
  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for(var i = 0; i < numberOfSprites; i++) {
      var x, y;

      if(positions.length > 0){
        x = positions[i].x
        y = positions[i].y
        spriteImage = positions[i].image
      }
      x = random(width / 2 + 150, width / 2 - 150);//posição para os dois sprites
      y = random(-height * 4.5, height - 400);//posição para os dois sprites
 
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);
 
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    form.titleImg.class("gameTitleAfterEffects");

    this.resetTitle.html("reniciar o jogo")
    this.resetTitle.class("resetText")
    this.resetTitle.position(width/2 + 230, 40)

    this.resetButton.class("resetButton")
    this.resetButton.position(width/2 + 230,100)

    this.leaderBoarTitle.html("placar")
    this.leaderBoarTitle.class("resetText")
    this.leaderBoarTitle.position(width / 3 - 60, 40)

    this.leader1.class("leadersText")
    this.leader1.position(width/3 - 50,80)

    this.leader2.class("leadersText")
    this.leader2.position(width/3 - 50,130)
  }

  play() {
    //função para esconder os elementos
    this.handleElements();
    this.handleResetButton()
    //desenhar os sprites
    Player.getPlayersInfo()
    if(allPlayers !== undefined){
  image(track,0, - height * 5,width, height *6)
  this.showLeaderboard()
  this.showLife()
  this.showFuelBar()
  var index = 0
  for(var plr in allPlayers){
    var x = allPlayers[plr].positionX
    var y = height - allPlayers[plr].positionY
    index = index +1
    cars[index -1].position.x = x
    cars[index -1].position.y = y
    
  if(index === player.index){
    stroke(10)
    fill("red")
    ellipse(x,y,60,60)
    camera.position.x = cars[index -1].position.x
    camera.position.y = cars[index -1].position.y
    this.handleFuel(index)
    this.handlePowerCoins(index)
  }
  
  } 
  if(this.playerMoving){
    player.positionY += 5;
    player.update()
  }   
    if(keyDown(UP_ARROW)){
      player.positionY += 10
      player.update()
    }
    this.handlePLayerControl()
    const finishline = height * 6 - 100
    if(player.positionY > finishline){
      gameState = 2
      player.rank += 1
      Player.updateCarsAtEnd(player.rank)
      player.update()
      this.showRank()

    }
    drawSprites()


}
    
   
    
  }
handleFuel(index){
cars[index - 1].overlap(fuels,function(colector,colected) {
  player.fuel = 185
  colected.remove()
})
if(player.fuel > 0 && this.playerMoving){
  player.fuel -= 0.2
  
}
if(player.fuel <= 0){
  gameState = 2
  this.gameOver()
}
}
handlePowerCoins(index){
cars[index - 1].overlap(powerCoins,function(colector,colected) {
player.score += 21
player.update()
colected.remove()
})
}
handleResetButton(){
  this.resetButton.mousePressed(() => {
    database.ref("/").set({
      playerCount:0,
      gameState:0,
      players:{},
      //carsAtEnd

    })
    window.location.reload();
  })

  }
  handlePLayerControl(){
    if(keyDown(UP_ARROW)){
      player.positionY += 10
      this.playerMoving = true
      player.update()
    }
    if(keyIsDown(LEFT_ARROW) && player.positionX > width/ 3 - 50){
      player.positionX -= 5
      player.update()
    }
    if(keyIsDown(RIGHT_ARROW) && player.positionX < width/ 2 + 300){
      player.positionX += 5
      player.update()
    }
  }

  showLife() {
    push();
    image(lifeImage, width/2 - 130, height - player.positionY - 400, 20, 20);
    fill("white");
    rect(width/2 - 100, height - player.positionY - 400, 185, 20);
    fill("#f50057");
    rect(width/2 - 100, height - player.positionY - 400, player.life, 20);
    noStroke();
    pop();
  }

  showFuelBar() {
    push();
    image(fuelImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - player.positionY - 350, player.fuel, 20);
    noStroke();
    pop();
  }
 
  
  
  
  showLeaderboard() {
    var leader1, leader2;
    //método que retorna uma array de valores de propriedades enumeradas do próprio objeto
    var players = Object.values(allPlayers);//para obter informacões dos jogadores do bd
  
    //condição para verificar se o primeiro jogador tem classificação 1
    if(
      (players[0].rank === 0 && players[1].rank === 0) ||
      players[0].rank === 1) {
      //&emsp; -> tag usada para exibir 4 espaços
      leader1 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
  
      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
    }
  
    //condição para verificar se o segundoo jogador tem classificação 1
    if (players[1].rank === 1) {
      leader1 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;
  
      leader2 =
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;
    }
    //passar como elemento html para mostrar na tela
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }
  showRank() {
    swal({
      title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
      text: "Você alcançou a linha de chegada com sucesso ",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }
  gameOver(){
    swal({
      title: `fim de jogo!`,
      text: "muito noob, você perdeu",
      imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "perdeu"

    });
  }
}




