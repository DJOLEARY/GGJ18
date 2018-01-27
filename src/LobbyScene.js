class LobbyScene extends Scene
{
  constructor(screenName, touch, sceneManager)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;

<<<<<<< HEAD
    this.numOfPlayersNeeded = 0;
=======
    this.numOfPlayersNeeded = 8;
>>>>>>> 81906c16568136b452320af7ab26f983c391fdb8
    this.numOfPlayersConnected = 0;
    this.displayNum = 0;
  }

  update(deltaTime)
  {
    this.displayNum = this.numOfPlayersNeeded - this.numOfPlayersConnected;
    if (this.displayNum === 0 && gameNs.game.gamemode === "music")
    {
      this.sceneManager.goToScene("MusicGame");
    }
    else if (this.displayNum === 0 && gameNs.game.gamemode === "charades")
    {
      this.sceneManager.goToScene("CharadesGame");
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
    ctx.fillText(this.displayNum.toString(), 420, 650);

    document.body.style.backgroundColor = "grey";
  }
}
