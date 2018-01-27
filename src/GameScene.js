/**
  Child class of Screen, overrides the render function
*/
class GameScene extends Scene
{
  constructor(screenName, touch, sceneManager)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;

    this.colours = {1:"red", 2:"blue", 3:"green", 4:"", 5:"", 6:"", 7:"", 8:"", 9:"", 10:"", 11:"", 12:"", 13:"", 14:"", 15:"",  16:"", 17:"", 18:"", 19:"", 20:"", 21:"", 22:"", 23:"", 24:"", 25:""};
  }

  update(deltaTime)
  {

    
  }

  render(ctx)
  {
    document.body.style.backgroundColor = "grey";
  }
}
