/**
  Child class of Screen, overrides the render function
*/
class MusicGameScene extends Scene
{
  constructor(screenName, touch, sceneManager, soundManager, numOfPeople, player)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;
    this.player = player;
    this.player = 1;
    this.numOfPeople = numOfPeople;
    this.selectedSongs = {};   
    
    gameNs.game.musicCountdownTimer = 3;
    this.countdownCalled = false;

    this.colours = {1:"#00FFFF", 2:"#0000FF", 3:"#A52A2A", 4:"#7FFF00", 5:"#006400", 6:"#FF8C00", 7:"#9932CC", 8:"#DCDCDC", 9:"#FF69B4", 10:"#FFFFF0", 11:"#FF4500", 12:"#CD853F", 13:"#FFFF00", 14:"#F0E68C", 15:"#008080",  16:"#696969", 17:"#D8BFD8"};
  
    if (this.player === 1 && numOfPeople % 2 === 0)
    {
      var numbersSelected = [];
      var i = 0;

      while (numbersSelected < numOfPeople / 2)
      {
        var randomNum = Math.floor(Math.random * 25) + 1;
        if (numbersSelected.indexOf(randomNum) === -1)
        {
          numbersSelected.push(randomNum);
          this.selectedSongs[i] = this.soundManager[numbersSelected[i]];
          i++;
        }
      }
    }
  }

  update(deltaTime)
  {
    if (this.countdownCalled === false)
    {
      this.countdown();
      this.countdownCalled = true;
    }
  }

  render(ctx)
  {
    document.body.style.backgroundColor = "grey";

    if (gameNs.game.musicCountdownTimer === 0)
    {
      ctx.beginPath();
      ctx.fillStyle = this.colours[this.player];
      ctx.fillRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);
    }
    else
    {
      // Number of players left to connect
      ctx.font="bold 180px Georgia";
      ctx.fillStyle="white";
      ctx.fillText(gameNs.game.musicCountdownTimer.toString(), 420, 650);
    }
  }

  countdown()
  {
    // Update the count down every 1 second
    var x = setInterval(function() 
    {
      if (gameNs.game.musicCountdownTimer > 0)
      {
        gameNs.game.musicCountdownTimer--;
      }
    }, 1000);
  }

  reset()
  {
    this.selectedSongs = {};   
    gameNs.game.musicCountdownTimer = 3;
    this.countdownCalled === false;
  }
}
