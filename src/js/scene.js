
import Sprite from './sprite.js';
export default class Scene extends Sprite{
	constructor(game,options){

		super(game);
		this.game = game;

		this.positionX = 0;
		this.positionY = 0;
		//this.scoreboardImages = null;
		this.startY = 350;
		this.font = "30px Arial";
		this.fontColor = "red";
		
		console.log("options" + JSON.stringify(options));
		this.sceneImage = new Image();
		this.sceneImage.src = "./dist/images/scenes/" + options.name + ".png"; // 1
		this.options = options;
		this.buildOptions();
	}
	render(){
			// Draw main image
		this.game.ctx.drawImage(this.sceneImage,0,0);
		// Draw choices
		startY = this.startY;
		for(let i=0; i < this.options.choices.length; i++){

			this.game.ctx.strokecolor = "white";
			this.game.ctx.fillStyle = "white";
			this.game.ctx.font = " 24px Arial";
			this.game.ctx.color = "white";
			this.game.ctx.fillText(this.options.choices[i].description, 50, startY );
			// Spacing of question
			startY+= 50;
			
		}
	}
	// This gets called if its clickable
	buildOptions(){
		console.log(this.options);
	}
	click(x,y){
			if(y > 350 & y < 600){
				if(this.options.choices.length < 4){
						
				}
				else if(this.options.choices.length > 1){
						if(y > 400) & (y < 450){
							// load option 1
							console.log("load option 2");
						}
				}
				else if(this.options.choices.length > 2){
						 if(y > 450) & (y < 500){
							// load option 1
							console.log("load option 3");
						}
				}
				else if(this.options.choices.length > 3){

				}
				else if(this.options.choices.length > 4){

				}
				let selection = y
				console.log("I was clicked x:" +x+ "y:" + y);
			}
	}
	
	
}