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
export default class Scoreboard extends Sprite{
	constructor(game){
		super(game);
		this.game = game;

		this.positionX = 6;
		this.positionY = 10;
		this.scoreboardImages = null;

		this.font = "30px Arial";
		this.fontColor = "red";
		this.loadImages();
	}
	loadImages(){
		this.scoreboardImages = [];
		let drawing = new Image();
		drawing.src = "./dist/images/scoreboard.png"; // can also be a remote URL e.g. http://

		this.scoreboardImages.push(drawing);

	}
	drawTime(ctx,timeText){
		ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.fillText(timeText, 40, 65);
	}
	drawScore(ctx,scoreText){
		ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.fillText(scoreText, 190, 85);
	}
	draw(ctx){
		ctx.drawImage(this.scoreboardImages[0],this.positionX ,this.positionY ); // draw first batter image
		this.drawTime(ctx,this.getTime()/100);
		this.drawScore(ctx,this.game.roundScore);
	}
	getTime(){
		return Math.ceil(this.game.roundTime/2.5);
	}
}