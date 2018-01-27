/**
  Child class of Screen, overrides the render function
*/
class GameSelectScene extends Scene
{
  constructor(screenName, touch, sceneManager)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;

    this.musicButton = new Button(this.touch, 200, 70, 570, 100, "Music", {
               'default': {
                 top: '#1879BD',
                 bottom: '#084D79'
               },
               'active': {
                 top: '#EB7723',
                 bottom: '#A80000'
               }
             }, "40");

      this.charadesButtons = new Button(this.touch, 200, 280, 570, 100, "Charades", {
                 'default': {
                   top: '#1879BD',
                   bottom: '#084D79'
                 },
                 'active': {
                   top: '#EB7723',
                   bottom: '#A80000'
                 }
               }, "40");
  }

  update(deltaTime)
  {
    this.musicButton.update();
    this.charadesButtons.update();

    if(this.musicButton.getIsClicked() === true)
    {
      this.musicButton.reset();
      gameNs.game.gamemode = "music";

      var message = {};
      message.gameType = "join_music_game";
      message.data = "music_game_hello!:)";

      // Join server here
      gameNs.game.ws.send(JSON.stringify(message));

      this.sceneManager.goToScene("Lobby");
    }
    else if(this.charadesButtons.getIsClicked() === true)
    {
      this.charadesButtons.reset();
      gameNs.game.gamemode = "charades";

      var message = {};
      message.gameType = "join_charades_game";
      message.data = "charades_game_hello!:)";

      // Join server here
      gameNs.game.ws.send(JSON.stringify(message));

      this.sceneManager.goToScene("Lobby");
    }
  }

  render(ctx)
  {
    document.body.style.backgroundColor = "grey";

    this.musicButton.render(ctx);
    this.charadesButtons.render(ctx);
  }
}
