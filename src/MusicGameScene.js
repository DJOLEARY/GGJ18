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
    this.currentPlayNumber = 0;
    this.numOfPeople = numOfPeople;
    this.selectedSongs = {};   
    this.currentRound = 1;
    this.timeLeft = 30;
    this.buttons = [];
    this.choosenPlayer = false;
    
    gameNs.game.musicCountdownTimer = 3;
    this.countdownCalled = false;

    this.colours = {1:"#00FFFF", 2:"#0000FF", 3:"#A52A2A", 4:"#7FFF00", 
                    5:"#006400", 6:"#FF8C00", 7:"#9932CC", 8:"#DCDCDC"};


    this.colorButtonOne = new Button(this.touch, 100, 600, 100, 100, "", {
      'default': {
        top: this.colours[1],
        bottom: this.colours[1]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");

    this.colorButtonTwo = new Button(this.touch, 320, 600, 100, 100, "", {
      'default': {
        top: this.colours[2],
        bottom: this.colours[2]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");

    this.colorButtonThree = new Button(this.touch, 530, 600, 100, 100, "", {
      'default': {
        top: this.colours[3],
        bottom: this.colours[3]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");

    this.colorButtonFour = new Button(this.touch, 750, 600, 100, 100, "", {
      'default': {
        top: this.colours[4],
        bottom: this.colours[4]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");

    this.colorButtonFive = new Button(this.touch, 100, 750, 100, 100, "", {
      'default': {
        top: this.colours[5],
        bottom: this.colours[5]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");

    this.colorButtonSix = new Button(this.touch, 320, 750, 100, 100, "", {
      'default': {
        top: this.colours[6],
        bottom: this.colours[6]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");

    this.colorButtonSeven = new Button(this.touch, 530, 750, 100, 100, "", {
      'default': {
        top: this.colours[7],
        bottom: this.colours[7]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");

    this.colorButtonEight = new Button(this.touch, 750, 750, 100, 100, "", {
      'default': {
        top: this.colours[8],
        bottom: this.colours[8]
      },
      'active': {
        top: '#EB7723',
        bottom: '#A80000'
      }
    }, "40");
  

    this.buttons = [this.colorButtonOne, this.colorButtonTwo, this.colorButtonThree, this.colorButtonFour,
                this.colorButtonFive, this.colorButtonSix, this.colorButtonSeven, this.colorButtonEight];
  
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

    if(!this.choosenPlayer)
    {
      for (var i = 0; i < this.buttons.length; i++)
      {
        if(gameNs.game.playerNumber != i)
        {
          this.buttons[i].update();

          if(this.buttons[i].getIsClicked() === true)
          {
            this.buttons[i].reset();
            // Hey we have selected something now hide the choice colors
            this.choosenPlayer = true;
          }
        }
      }
    }
  }

  render(ctx)
  {
    document.body.style.backgroundColor = "grey";

    gameNs.game.musicCountdownTimer = 0;

    // Finished counting down
    if (gameNs.game.musicCountdownTimer === 0)
    {
      ctx.beginPath();
      ctx.fillStyle = this.colours[gameNs.game.playerNumber];
      ctx.fillRect(0, 0, gameNs.game.canvas.width, gameNs.game.canvas.height);

      // Round display
      ctx.font="bold 50px Georgia";
      ctx.fillStyle="black";
      ctx.fillText("Round: " + this.currentRound.toString() + "/3" , 50, 100);

      // Time display
      ctx.font="bold 50px Georgia";
      ctx.fillStyle="black";
      ctx.fillText("Time Left: " + this.timeLeft.toString(), 500, 100);

      if(!this.choosenPlayer)
      {
        // Draw the vote text
        ctx.font="bold 50px Georgia";
        ctx.fillStyle="black";
        ctx.fillText("Vote who you think", 220, 500);
        ctx.fillText("has the same song as you", 140, 550);

        for (var i = 0; i < this.buttons.length; i++)
          if(this.gameNs.game.playerNumber != i)
            this.buttons[i].render(ctx); 
      }
      else
      {
        // Draw the you have voted text
        ctx.font="bold 80px Georgia";
        ctx.fillStyle="black";
        ctx.fillText("You have voted", 150, 700);

        ctx.font="bold 40px Georgia";
        ctx.fillStyle="black";
        ctx.fillText("Wait for the round to end", 200, 800);
        ctx.fillText("Try to deceive your opponents into", 110, 850);
        ctx.fillText("thinking you don't have their song", 120, 900);
      }
    }
    // Display the count down timer
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
    this.choosenPlayer = false;
  }
}
