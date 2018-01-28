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
    gameNs.game.ws = new WebSocket("ws://149.153.106.122:8080/wstest");
    // Darren's Ip college
    //gameNs.game.ws = new WebSocket("ws://149.153.106.121:8080/wstest");
    // Darren's Ip home
    //gameNs.game.ws = new WebSocket("ws://192.168.1.8:8080/wstest");

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
    gameNs.game.lobbyScene = new LobbyScene("Lobby", gameNs.game.touch, gameNs.game.sceneManager)
    gameNs.game.sceneManager.addScene(gameNs.game.lobbyScene);
    gameNs.game.sceneManager.addScene(new CreditsScene("Credits", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.sceneManager.addScene(new GameScene("Game", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.sceneManager.addScene(new LeaderboardScene("Leaderboard", gameNs.game.touch, gameNs.game.sceneManager));
    gameNs.game.sceneManager.goToScene("Menu");
    gameNs.game.sceneManager.renderCurrentScene(gameNs.game.ctx);

    // @todo(darren): This is for testing, playernum should be -1 and remove numofspaces
    gameNs.game.playerNumber = 0;
    gameNs.game.lobbyScene.numOfSpacesLeft = 0
  }

  handleMessage(evt)
  {
    // Parse it twice, it's 3:12 am and i don't really give a fuck, this language is shit
    var eventJSON = JSON.stringify(evt.data)
    var eventJSON_2 = JSON.parse(eventJSON)
    var eventDict = JSON.parse(eventJSON_2)
    console.log(eventDict)
    if(eventDict["event_type"] == "join_game_info")
    {
      // @note(darren): Took this out of lobby screen will need the players number somewhere else. Just store global?
      gameNs.game.playerNumber =  eventDict["players_number"];
      console.log("Hello i have the number: " + eventDict["players_number"]);
    }

    if(eventDict["event_type"] == "lobby_game_info")
    {
      gameNs.game.lobbyScene.numOfSpacesLeft = eventDict["spaces_left"];
      console.log("Hello there is this many space left: " + eventDict["spaces_left"]);
    }
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
