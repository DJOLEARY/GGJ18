/**
  Base class scene.
*/
class Scene
{
  /**
    Inialises the sceneName for the class.
    @param {string} sceneName - The title for the scene.
  */
  constructor(sceneName)
  {
    this.title = sceneName;
  }

  update(deltaTime)
  {

  }

  /**
    Sets the font, text and background of scene.
  */
  render(ctx)
  {
      ctx.font = '48px serif';
      ctx.fillText(this.title, 10, 50);

      document.body.style.backgroundColor = "#48a7c4";
  }

  /**
    Prints to the console that the scene has started.
  */
  start()
  {
    console.log("start called: " + this.title);
  }

  /**
    Prints to the console that the scene has ended.
  */
  stop()
  {
    console.log("stop called: " + this.title);
  }

  /**
    Get the title name for the scene.
    @return {string} - The title of the scene.
  */
  getTitle()
  {
    return this.title;
  }
}
