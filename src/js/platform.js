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
export default class Platform extends Sprite{
	constructor(game){
		super(game);
		this.game = game;
		this.platformImages = null;
		this.positionX = 270;
		this.positionY = 430;
		this.loadImages();
	}
	loadImages(){
		this.platformImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/platform.png"; // can also be a remote URL e.g. http://

		this.platformImages.push(drawing);
		
	}
	draw(ctx){
   			ctx.drawImage(this.platformImages[0],this.positionX,this.positionY); // draw first batter image
	}
}