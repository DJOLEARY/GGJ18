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

    this.colours = {1:"#00FFFF", 2:"#0000FF", 3:"#A52A2A", 4:"#7FFF00", 5:"#006400", 6:"#FF8C00", 7:"#9932CC", 8:"#DCDCDC", 9:"#FF69B4", 10:"#FFFFF0", 11:"#FF4500", 12:"#CD853F", 13:"#FFFF00", 14:"#F0E68C", 15:"#008080",  16:"#696969", 17:"#D8BFD8"};
  }

  update(deltaTime)
  {

    
  }

  render(ctx)
  {
    document.body.style.backgroundColor = "grey";
  }
}
