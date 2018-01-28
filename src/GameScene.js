/**
  Child class of Screen, overrides the render function
*/
class GameScene extends Scene
{
  constructor(screenName, touch, sceneManager)
  {
    super(screenName);
    this.touch = touch;
    this.sceneManager = sceneManager;
    this.currentRound = 1;
    this.timeLeft = 30;
    this.buttons = [];
    this.choosenPlayer = false;

    gameNs.game.countdownTimer = 3;
    gameNs.game.timeLeft = 30;

    this.countdownCalled = false;
    this.timerCalled = false;

    this.colours = { 1:"#00FFFF", 2:"#0000FF", 3:"#A52A2A", 4:"#7FFF00", 
                     5:"#006400", 6:"#FF8C00", 7:"#9932CC", 8:"#DCDCDC"};
    
    gameNs.game.charades = { 1: "chicken", 2: "monkey", 3: "robot", 4: "guitar", 
                      5: "jester", 6: "director", 7: "magician", 8: "superman", 
                      9: "spiderman", 10: "zombie", 11: "bicycle", 12: "cheerleader", 
                      13: "elvis", 14: "spock", 15: "beetoven", 16: "butler", 17: "jetpack", 
                      18: "sailor", 19: "president", 20: "actor", 21: "selfie", 22: "ninja", 
                      23: "spy", 24: "saddle", 25: "mirror" };

    gameNs.game.songs = { 1: "children", 2: "classical", 3: "country", 4: "dance", 
                   5: "dubstep", 6: "jazz", 7: "latin", 8: "metal", 
                   9: "pop", 10: "rap", 11: "reggae", 12: "rnb"};


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
  }

  update(deltaTime)
  {
    if (this.countdownCalled === false)
    {
      this.countdown();
      this.countdownCalled = true;
    }
    
    if(this.timerCalled === false && gameNs.game.countdownTimer === 0)
    {
      this.countdownTillEnd();
      this.timerCalled = true;
    }
    
    if (gameNs.game.timeLeft === 0)
    {
      // @note(darren): Going to change the scene into the leaderboard, get whole game working for 1 round first
      // then worry about rounds.
      this.sceneManager.goToScene("Leaderboard");

      if (gameNs.game.gamemode === "music")
      {
        gameNs.game.soundManager.stop();
      }
    }

    if(!this.choosenPlayer)
    {
      for (var i = 0; i < this.buttons.length; i++)
      {
        if(gameNs.game.playerNumber - 1 != i)
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

    // Finished counting down
    if (gameNs.game.countdownTimer === -1)
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
      ctx.fillText("Time Left: " + gameNs.game.timeLeft.toString(), 500, 100);

      if(!this.choosenPlayer)
      {
        // Draw the vote text
        ctx.font="bold 50px Georgia";
        ctx.fillStyle="black";
        ctx.fillText("Vote who you think", 220, 500);

        if(gameNs.game.gamemode === "music")
        {
          ctx.fillText("has the same song as you", 140, 550);
        }
        else
        {
          ctx.fillText("has the same thing as you", 140, 550);
        }

        for (var i = 0; i < this.buttons.length; i++)
          if(gameNs.game.playerNumber - 1 != i)
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

        if(gameNs.game.gamemode === "music")
        {
          ctx.fillText("thinking you don't have their song", 120, 900);
        }
        else
        {
          ctx.fillText("thinking you don't have their thing", 120, 900);
        }
      }
    }
    // Display the count down timer
    else
    {
      // Number of players left to connect
      ctx.font="bold 180px Georgia";
      ctx.fillStyle="white";
      ctx.fillText(gameNs.game.countdownTimer.toString(), 420, 650);

      if (gameNs.game.gamemode === "charades")
      {
        ctx.font="bold 100px Georgia";
        ctx.fillText(gameNs.game.charades[gameNs.game.assignedGameNum], (gameNs.game.canvas.width / 2) - 150, (gameNs.game.canvas.height / 2) + 100 );
      }
    }
  }

  countdown()
  {
    // Update the count down every 1 second
    var x = setInterval(function() 
    {
      if (gameNs.game.countdownTimer > 0)
      {
        gameNs.game.countdownTimer--;
      }
      else if (gameNs.game.countdownTimer === 0)
      {
        if(gameNs.game.gamemode === "music")
        {
          gameNs.game.soundManager.playSound(gameNs.game.songs[gameNs.game.assignedGameNum], false, 2);
        }

        gameNs.game.countdownTimer--;
      }
    }, 1000);
  }

  countdownTillEnd()
  {
    // Update the count down every 1 second
    var x = setInterval(function() 
    {
      if (gameNs.game.timeLeft  > 0)
      {
        gameNs.game.timeLeft --;
      }
    }, 1000);
  }

  reset()
  { 
    gameNs.game.countdownTimer = 3;
    this.countdownCalled === false;
    this.choosenPlayer = false;
  }
}
