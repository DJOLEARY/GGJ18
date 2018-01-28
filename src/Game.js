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

  loadAssets()
  {
    gameNs.game.soundManager = new SoundManager();
    gameNs.game.soundManager.init();

    gameNs.game.jsonLoader = new JsonLoader();
    gameNs.game.jsonLoader.loadJSON("assets");
  }

  /**
  *   Initalises the canvas and set the current render scene.
  */
  init()
  { 
    // Dj's Ip
    //gameNs.game.ws = new WebSocket("ws://149.153.106.122:8080/wstest");
    // Darren's Ip college
    //gameNs.game.ws = new WebSocket("ws://149.153.106.121:8080/wstest");
    // Darren's Ip home
    gameNs.game.ws = new WebSocket("ws://192.168.1.8:8080/wstest");

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

    gameNs.game.ws.addEventListener('message',  gameNs.game.handleMessage);

    //  Initialise game objects.
    gameNs.game.sceneManager = new SceneManager(gameNs.game.ctx, gameNs.game.canvas);
    gameNs.game.sceneManager.addScene(new MenuScene("Menu", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.sceneManager.addScene(new GameSelectScene("GameSelect", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.sceneManager.addScene(new MusicGameScene("MusicGame", gameNs.game.touch, gameNs.game.sceneManager, gameNs.game.soundManager));
    gameNs.game.sceneManager.addScene(new CharadesGameScene("CharadesGame", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.lobbyScene = new LobbyScene("Lobby", gameNs.game.touch, gameNs.game.sceneManager)
    gameNs.game.sceneManager.addScene(gameNs.game.lobbyScene);
    gameNs.game.sceneManager.addScene(new CreditsScene("Credits", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.sceneManager.goToScene("MusicGame");
    gameNs.game.sceneManager.renderCurrentScene(gameNs.game.ctx);
  }

  handleMessage(evt)
  {
    // Called when the client receives a message
    gameNs.game.lobbyScene.numOfPlayersConnected = evt.data;
    console.log("Hello i have the number: " + JSON.stringify(evt.type));
    console.log("Hello i have the number: " + JSON.stringify(evt.data));
  }

  /**
   *  Update method for the game class.
  */
  update()
  {
    if ( gameNs.game.jsonLoader.getLoaded() === true )
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
    this.ctx.drawImage(this.backgroundImage, 0, 0, 960, 1800);
    this.sceneManager.renderCurrentScene(this.ctx);
  }
}
