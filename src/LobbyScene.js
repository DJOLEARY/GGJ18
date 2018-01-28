class LobbyScene extends Scene
{
  constructor(screenName, touch, sceneManager)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;
    this.init = false;
    
    gameNs.game.playerPairs  = {};
  }

  update(deltaTime)
  {
    if (gameNs.game.lobbyScene.numOfSpacesLeft === 0)
    {
      this.sceneManager.goToScene("Game");
    }

    if (gameNs.game.playerNumber === 1 && this.init === false)
    {
      this.init === true;
      gameNs.game.numbersSelected = [];
      var i = 0;

      while (gameNs.game.numbersSelected.length < 4)
      {
        var randomNum = 0;
        randomNum = Math.floor(Math.random() * 12) + 1;
        if (gameNs.game.numbersSelected.indexOf(randomNum) === -1)
        {
          gameNs.game.numbersSelected.push(randomNum);
          i++;
        }
      }

      var players = [1, 2, 3, 4, 5, 6, 7, 8];

      players = this.shuffle(players);

      gameNs.game.playerPairs[players[0]] = gameNs.game.numbersSelected[0];
      gameNs.game.playerPairs[players[1]] = gameNs.game.numbersSelected[0];
      gameNs.game.playerPairs[players[2]] = gameNs.game.numbersSelected[1];
      gameNs.game.playerPairs[players[3]] = gameNs.game.numbersSelected[1];
      gameNs.game.playerPairs[players[4]] = gameNs.game.numbersSelected[2];
      gameNs.game.playerPairs[players[5]] = gameNs.game.numbersSelected[2];
      gameNs.game.playerPairs[players[6]] = gameNs.game.numbersSelected[3];
      gameNs.game.playerPairs[players[7]] = gameNs.game.numbersSelected[3];
    }
  }

  render(ctx)
  {
    // Lobby title
    ctx.font="bold 130px Georgia";
    ctx.fillStyle="#000000";
    ctx.fillText("Lobby", 260, 250);

    // Player left to connect title
    ctx.font="bold 50px Georgia";
    ctx.fillStyle="#000000";
    ctx.fillText("Players left to connect", 200, 450);

    // Number of players left to connect
    ctx.font="bold 180px Georgia";
    ctx.fillStyle="#680505";
    ctx.fillText(gameNs.game.lobbyScene.numOfSpacesLeft.toString(), 420, 650);

    document.body.style.backgroundColor = "grey";
  }

  
  shuffle(array) 
  {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) 
    {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}
