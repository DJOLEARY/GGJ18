class LobbyScene extends Scene
{
  constructor(screenName, touch, sceneManager)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;

    this.numOfPlayersNeeded = 0;
  }

  update(deltaTime)
  {
    if (this.numOfPlayersNeeded === 0 && gameNs.game.gamemode === "music")
    {
      this.sceneManager.goToScene("MusicGame");
    }
    else if (this.numOfPlayersNeeded === 0 && gameNs.game.gamemode === "charades")
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
    ctx.fillText(this.numOfPlayersNeeded.toString(), 420, 650);

    document.body.style.backgroundColor = "grey";
  }
}
