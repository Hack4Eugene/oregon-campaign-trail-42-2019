
import Sprite from './sprite.js';
export default class Scene extends Sprite{
	constructor(game,options){

		super(game);
		this.game = game;

		this.positionX = 0;
		this.positionY = 0;
		//this.scoreboardImages = null;

		this.font = "30px Arial";
		this.fontColor = "red";
		
	}
	// This gets called if its clickable
	click(){

	}
	
	
}