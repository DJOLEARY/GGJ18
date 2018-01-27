class CreditsScene extends Scene
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

    this.backButton = new Button(this.touch, 320, 620, 300, 120, "Back", {
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
    this.backButton.update();

    if(this.backButton.getIsClicked() === true)
    {
      this.backButton.reset();
      this.sceneManager.goToScene("Menu");
    }
  }

  render(ctx)
  {
    this.backButton.render(ctx);

    ctx.fillStyle="black";
    ctx.font="bold 80px Georgia";
    ctx.fillText("Darren Sweeney", 150, 250);
    ctx.fillText("D.J. O' Leary", 220, 380);
    ctx.fillText("David Scott", 240, 510);
  }
}
