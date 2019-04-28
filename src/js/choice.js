
import Sprite from './sprite.js';
export default class Choice extends Sprite{
	constructor(game,scene){

		super(game);
		this.game = game;

		this.positionX = 0;
		this.positionY = 0;
		//this.scoreboardImages = null;

		this.font = "30px Arial";
		this.fontColor = "red";
		this.scene = scene;
		
	}
	// This gets called if its clickable
	click(){
			this.game.loadScene(scene);
	}
	
	
}