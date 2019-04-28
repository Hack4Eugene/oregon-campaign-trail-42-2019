
import Sprite from './sprite.js';
export default class Scene extends Sprite{
	constructor(game,options){

		super(game);
		this.game = game;

		this.positionX = 0;
		this.positionY = 0;
		//this.scoreboardImages = null;
		this.startY = 375;
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
		let startY = this.startY;
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
		/*
		opt 1 : 350 - 400
		opt 2 : 400 - 450
		opt 3: 450 - 500
		opt 4: 500 - 550
		opt 5: 550 - 600*/

			if(this.options.choices.length >= 5){
					if((y > 550) && (y < 600)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[4].sceneDestination));
					}
					
			}
			 if(this.options.choices.length >= 4){
					if((y > 500) && (y < 550)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[3].sceneDestination));
					}
			}
			if(this.options.choices.length >= 3){
					 if((y > 450) && (y < 500)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[2].sceneDestination));
					}
			}
			if(this.options.choices.length >= 2){
					 if((y > 400) && (y < 450)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[1].sceneDestination));
					}
			}
			 if(this.options.choices.length >= 1){
					 if((y > 350) && (y < 400)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[0].sceneDestination));
					}
			}			

			let selection = y
			// console.log("I was clicked x:" +x+ "y:" + y);
		    console.log("options:" + this.options.choices.length);
	}
	
	
}