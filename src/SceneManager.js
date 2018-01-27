/**
  Manages all the scene in the game, renders the current scene.
*/
class SceneManager
{
  /**
    Initalises the currentScene, sceneDictionary, scenelist and index.
  */
  constructor(ctx, canvas)
  {
    this.ctx = ctx;
    this.canvas = canvas;
    this.currentScene = null;
    this.sceneDictionary = {};
    this.scenelist = [];
    this.index = -1;
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'assets/background.jpg';
  }

  /**
    Addes the scene to the dictionary and scene list.
    @param {Scene} scene - The scene to add to SceneManager
  */
  addScene(scene)
  {
    var title = scene.getTitle();
    this.sceneDictionary[title] = scene;
    this.scenelist.push(title);
  }

  /**
    Assings the currentScene by using the title as the key for looking
    up the dictionary.
  */
  goToScene(title)
  {
      this.currentScene = this.sceneDictionary[title];
      // Gets the current index using the title as the key.
      this.index = Object.keys(this.sceneDictionary).indexOf(title);
      console.log("Index: " + this.index);
      this.currentScene.start();
      this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  /**
    Increases the current index and get the scene from the dictionary
    at the current index.
  */
  goToNextScene()
  {
    // Check if the index is at the end so we can cycle back.
    if(this.index >= this.scenelist.length - 1)
      this.index = 0;
    else
      this.index++;

      // Stop th current scene, get the key title using the index,
      // start the now current scene.
      this.currentScene.stop();
      var title = this.scenelist[this.index];
      this.currentScene = this.sceneDictionary[title]
      this.currentScene.start();
  }

 /**
  *
  */
  updateCurrentScene(deltaTime)
  {
    this.currentScene.update(deltaTime);
  }

  /**
    Renders the current scene.
  */
  renderCurrentScene()
  {
    this.ctx.drawImage(this.backgroundImage, 0, 0, 960, 1800);
    this.currentScene.render(this.ctx);
  }
}
