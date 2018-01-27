class JsonLoader
{
  /**
  *   Default empty constructor.
  */
  constructor()
  {
    JsonLoader.splash = null;
    JsonLoader.sprite = null;
    JsonLoader.loaded = false;
  }

  loadJSON(url)
  {
    var request = new XMLHttpRequest();
    request.open("GET", "assets/Json/" + url + ".json", true);
    request.responseType = 'json';
    request.send();

    request.onload = function()
    {
      JsonLoader.loaded = true;
      var assets = request.response;

      //  Images.
      JsonLoader.splash = assets.images[0];
      JsonLoader.sprite = assets.images[1];

      //  Sounds.
    }
  }

  getSplash()
  {
    return this.splash.path;
  }

  getSprite()
  {
    return this.sprite.path;
  }

  getLoaded()
  {
    return this.loaded;
  }
}