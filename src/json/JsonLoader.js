class JsonLoader
{
  /**
  *   Default empty constructor.
  */
  constructor()
  {
    this.loaded = false;
    this.numOfSounds = 12;
  }

  loadJSON(url)
  {
    var request = new XMLHttpRequest();
    request.open("GET", "src/json/" + url + ".json", true);
    request.responseType = 'json';
    request.send();

    request.onload = function()
    {
      gameNs.game.jsonLoader.loaded = true;
      var assets = request.response;

      //  Images.
      gameNs.game.backgroundImage = new Image();
      gameNs.game.backgroundImage.src = assets.images[0].path;

      //  Sounds.
      for (var i = 0; i < this.numOfSounds; i++)
      {
        gameNs.game.soundManager.loadSoundFile(assets.music[i].name, assets.music[i].path);
      }
    }
  }

  getLoaded()
  {
    return this.loaded;
  }
}