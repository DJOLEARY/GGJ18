var gameNs = {};

/**
  The main entry point into the application
*/
function main()
{
  const game = new Game();

  gameNs.game = game;
  gameNs.game.loadAssets();
  gameNs.game.init();
  gameNs.game.update();
}
