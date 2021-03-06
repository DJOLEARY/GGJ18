class LeaderboardScene extends Scene
{
  /**
    Inialises the sceneName for the class.
    @param {string} sceneName - The title for the scene.
  */
  constructor(sceneName, touch, sceneManager)
  {
    super(sceneName);
    this.touch = touch;
    this.sceneManager  = sceneManager;
    
    this.colours = { 1:"#00FFFF", 2:"#0000FF", 3:"#A52A2A", 4:"#7FFF00", 
                     5:"#006400", 6:"#FF8C00", 7:"#9932CC", 8:"#DCDCDC"};

    this.doneButton = new Button(this.touch, 320, 1420, 300, 120, "Done", {
                                'default': {
                                    top: '#1879BD',
                                    bottom: '#084D79'
                                },
                                'active': {
                                    top: '#EB7723',
                                    bottom: '#A80000'
                                }
    }                           , "40");

    gameNs.game.playerScore = Math.floor(Math.random() * 5000) + 1;
  }

  update(deltaTime)
  {
    this.doneButton.update();

    if(this.doneButton.getIsClicked() === true)
    {
      this.doneButton.reset();
      this.sceneManager.goToScene("Menu");
    }
  }

  render(ctx)
  {
    this.doneButton.render(ctx);

    ctx.font="bold 80px Georgia";
    ctx.fillStyle="black";
    ctx.fillText("Your Score: " + gameNs.game.playerScore, 100, 200);

    ctx.font="bold 50px Georgia";
    ctx.fillStyle="black";
    ctx.fillText("Decide who won amongst yourself", 50, 500);
    ctx.fillText("because coding is hard", 200, 550);

    // for (var i = 1; i < 9; i++)
    // {
    //     ctx.beginPath();
    //     ctx.fillStyle = this.colours[i];
    //     ctx.fillRect(100, 100 * i, 80, 80);
    // }

    // for (var i = 1; i < 9; i++)
    // {
    //     ctx.beginPath();
    //     ctx.fillStyle = this.colours[i];
    //     ctx.fillRect(450, 100 * i, 80, 80);
    // }
  }
}