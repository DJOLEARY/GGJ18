/**
  Child class of Screen, overrides the render function
*/
class MenuScene extends Scene
{
  constructor(screenName, touch, sceneManager)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;

    this.playButton = new Button(this.touch, 200, 70, 570, 100, "Play", {
               'default': {
                 top: '#1879BD',
                 bottom: '#084D79'
               },
               'active': {
                 top: '#EB7723',
                 bottom: '#A80000'
               }
             }, "40");

      this.creditsButtons = new Button(this.touch, 200, 280, 570, 100, "Credits", {
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
    this.playButton.update();
    this.creditsButtons.update();

    if(this.playButton.getIsClicked() === true)
    {
      this.playButton.reset();
      //this.sceneManager.goToScene("Playing");
    }
    else if(this.creditsButtons.getIsClicked() === true)
    {
      this.creditsButtons.reset();
      //this.sceneManager.goToScene("Credits");
    }
  }

  render(ctx)
  {
    document.body.style.backgroundColor = "grey";

    this.playButton.render(ctx);
    this.creditsButtons.render(ctx);
  }
}
