/**
  Manages the scene manager and creates the canvas.
  Renders the current scene and provides access to change to next scene.
*/
class Game
{
  /**
  *   Default empty constructor for the game object.
  */
  constructor()
  {
    
  }

  /**
  *   Initalises the canvas and set the current render scene.
  */
  init()
  {
    console.log("Initalising Game");
    gameNs.game.loaded = true;

    //  Initialise the canvas
    gameNs.game.canvas = document.createElement("canvas");
    gameNs.game.canvas.id = 'mycanvas';
    gameNs.game.canvas.width = window.innerWidth;
    gameNs.game.canvas.height = window.innerHeight;
    gameNs.game.ctx = gameNs.game.canvas.getContext("2d");
    document.body.appendChild(gameNs.game.canvas);

    //  Initialise events.
    gameNs.game.touch = new TouchTest();
    document.addEventListener("touchstart", gameNs.game.touch.onTouchStart.bind(null, gameNs.game.touch), {passive: false});
    document.addEventListener("touchmove", gameNs.game.touch.onTouchMove.bind(null, gameNs.game.touch), {passive: false});
    document.addEventListener("touchend", gameNs.game.touch.onTouchEnd.bind(null, gameNs.game.touch), {passive: false});

    //  Initialise game objects.
    gameNs.game.sceneManager = new SceneManager(gameNs.game.ctx, gameNs.game.canvas);
    gameNs.game.sceneManager.addScene(new MenuScene("Menu", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.sceneManager.goToScene("Menu");
    gameNs.game.sceneManager.renderCurrentScene(gameNs.game.ctx);
  }

  /**
   *  Update method for the game class.
  */
  update()
  {
    if ( gameNs.game.loaded === true )
    {
      var now = Date.now();
      var deltaTime = (now - gameNs.game.previousTime);
      gameNs.game.previousTime = now;

      //  Call update for game objects here.
      gameNs.game.sceneManager.updateCurrentScene(deltaTime);

      //  Draw new frame.
      gameNs.game.draw();
    }
    // Recursive call to Update method.
    window.requestAnimationFrame(gameNs.game.update);
  }

  /**
  * draw method where the game is rendered.
  */
  draw()
  {
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    this.sceneManager.renderCurrentScene(this.ctx);
  }
}
