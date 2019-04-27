
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