
import Sprite from './sprite.js';
export default class Ball extends Sprite{
	constructor(game){
		super(game);

		this.ballImages = null;
		this.positionX = -100;
		this.positionY = -100;
		this.loadImages();

		this.Ydelta = 1;

		this.balling = false;
		this.frameIndex = 7;
		this.tickCount = 0;
		this.ticksPerFrame = 85;

		/* Hit Animation for Ball leaving bottom of screen going towards top */
		this.hitAnimation = false;
		this.showHomeRun = false;
		this.showHomeRunTimeRemaining = 0;

    /* Is the current hit a homerun*/
    this.isHomeRun = false;


	}
	loadImages(){
		this.ballImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/ball.png"; // can also be a remote URL e.g. http://
		this.ballImages.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/homerun.png";
		this.ballImages.push(drawing);
	}
	updateBall(){
	// 0,6,7,8,9,10
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 1;
            // Go to the next frame
           	this.frameIndex -= 1;
        }
        // Stop swinging at end of animation
        
        if(this.frameIndex==0){
        	this.frameIndex = 7;
        	this.balling = false;
        }
        this.positionY += this.Ydelta;
    }
    updateHitAnimation(){
    	this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 1;
            // Go to the next frame
           	this.frameIndex = 0;
        }
        // Stop swinging at end of animation
        if(this.frameIndex == 0){
        	this.frameIndex = 1;
        }
      	else{
      		this.frameIndex = 0;
      	}
        /* stop */
        if(this.positionY < -90){
        	this.frameIndex = 7;
        	this.hitAnimation = false;
        	// This only runs once so lets show the homerun
        }
        if(this.isHomeRun){
            this.startHomeRun();
          }
        this.positionY -= this.Ydelta*3;
    }
    startHomeRun(){
    	this.showHomeRun = true;
    	this.showHomeRunTimeRemaining = 250;
    	this.game.audio[3].play();
    }
    updateShowHomeRun(){
		if(this.showHomeRunTimeRemaining > 0){
			this.game.ctx.drawImage(this.ballImages[1],270,330);
			this.showHomeRunTimeRemaining--;
		}
    }
	startBalling(){
		this.balling = true;
		this.frameIndex=6;
		/* Starting Location */
		this.positionX = 490;
		this.positionY = -20;

		this.destinationX = 480;
		this.destinationY = 540;
	}
	draw(ctx){
   			//ctx.drawImage(this.ballImages[0],this.ballX,this.ballY); // draw first batter image
   			ctx.drawImage(this.ballImages[0],
   			this.frameIndex * this.ballImages[0].width / 6, //
   			0, //
   			50, // 1314 / 7
   			90, //
   			this.positionX, // 
   			this.positionY, //
   			50,//
   			90 ); //

   			if(this.balling){
   				this.updateBall();
   			}
   			if(this.hitAnimation){
   				this.updateHitAnimation();
   			}
   			if(this.showHomeRun){
   				this.updateShowHomeRun();
   			}
   			// Trigger Pitches if game is playing
   			if(this.game.roundStarted && this.game.roundTime%this.game.pitcher.pitchInterval == 0){
   				//this.startBalling();
  			}

  			// Stop the ball
  			if(this.positionY > window.innerHeight){
  				this.balling = false;
          this.frameIndex = 7;
			}
  	}
}