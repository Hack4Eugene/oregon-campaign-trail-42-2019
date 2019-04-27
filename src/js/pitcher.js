/*
	Interstellar Home Run Derby
	License: Attribution-NonCommercial-ShareAlike 3.0 United States (CC BY-NC-SA 3.0 US)

	Developed By

	Lead Art 
	----------
	Eric Hill  
		twitter.com/erichill1232
		instagram.com/eric.hill.1232
		https://www.deviantart.com/beza
		https://nightmarenetherworld.tumblr.com/

	Lead Programming
	----------
	Robert Moore
		http://www.eugeneprogramming.com
		https://www.linkedin.com/in/robertbenmoore/

	Programming
	----------
	Gordon Wallace

	Q & A / System Design
	----------
	Jack Kimball

	Github Copy @ 
	https://github.com/bobby5892/InterstellarHomeRunDerby



*/
import Sprite from './sprite.js';
export default class Pitcher extends Sprite{

	constructor(game){
		super(game);
		this.game = game;
		this.pitchThrown = true;
	
		//  Storage of actual loaded images
		this.pitcherImages = null;
		// For Animation
		this.pitchTime = null;
		
		this.frameIndex = 0;
		this.tickCount = 0;
		this.ticksPerFrame = 20;

		this.pitching = false;

		/* pitcher location */
		this.positionX = 480;
		this.positionY = 20;

		/* how often to pitch*/
		this.pitchInterval = 800;
		

		/* speed of pitch */
		this.maxSpeedIncrease = 0.6;
		this.minSpeedIncrease = 0.1;

		/* interval between pitches*/
		this.maxPitchTime = 850;
		this.minPitchTime = 700;
		this.loadImages();
	}
	updatePitch() {
		// 0,6,7,8,9,10
        this.tickCount += 1;
        if (this.tickCount > this.ticksPerFrame) {
        	this.tickCount = 1;
            // Go to the next frame
           	this.frameIndex += 1;
        }
        // Stop swinging at end of animation
        if(this.frameIndex==11){
        	this.frameIndex = 0;
        	this.pitching = false;
        }
        else if (this.frameIndex==6){
        	this.game.ball.startBalling();
        }
    }
    // Animation
  

	throwPitch(){
		if(this.game.ball.frameIndex == 7){
			this.pitchSpeed = 10;
			this.tickCount = 5;
	    	this.pitching = true;
	    	this.game.batter.throwIsHit = false;
	    	this.game.ball.isHomeRun = false;
	    	this.game.ball.Ydelta = 1 + ( Math.random() * (this.maxSpeedIncrease - this.minSpeedIncrease) + this.minSpeedIncrease);
	    	this.pitchInterval =  Math.ceil( Math.random() * (this.maxPitchTime  - this.minPitchTime ) + this.minPitchTime);

	    }
    }
	loadImages(){
		this.pitcherImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/pitcher.png"; 
		this.pitcherImages.push(drawing);
	}
	draw(ctx){
   			ctx.drawImage(this.pitcherImages[0],
   			this.frameIndex * this.pitcherImages[0].width / 11, //
   			0, //
   			90, // 1314 / 7
   			120, //
   			this.positionX, // 
   			this.positionY, //
   			90,//
   			120 ); //

   			if(this.pitching){
   				this.updatePitch();
   			}

   			// Trigger Pitches if game is playing
   			if(this.game.roundStarted && this.game.roundTime%this.pitchInterval == 0){
   				this.throwPitch();
   			}
	}
	
}


