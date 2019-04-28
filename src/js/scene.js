
import Sprite from './sprite.js';
export default class Scene extends Sprite{
	constructor(game,options){

		super(game);
		this.game = game;
		this.offset = 110;
		this.positionX = 0;
		this.positionY = 0;
		this.startY = 500;
		// this.font = "30px Arial";
		// this.fontColor = "red";
		this.question = options.question;
		this.current_date = options.current_date;
		this.campaign_month_count = options.campaign_month_count;

		// this is for checking if it exists before using

		if(options.img != null){
			this.image = "./dist/images/" + options.img;
		}		
		this.options = options;
		this.width = window.innerWidth;
		this.height = window.innerHeight;		
	}
	render(){
		// Draw main image
		if(this.image != null){
			try{
				let sceneImage = new Image();
				sceneImage.src = this.image;

				this.game.ctx.drawImage(sceneImage,50,200);
			

			}
			catch(error){
				null;
			}
		}
		// Draw choices
		let startY = this.startY ;
		for(let i=0; i < this.options.choices.length; i++){

			this.game.ctx.strokecolor = "white";
			this.game.ctx.fillStyle = "white";
			this.game.ctx.fillStyle = "EBE6DD";
			this.game.ctx.font = "22px LeagueMono";
			this.game.ctx.color = "white";
			this.game.ctx.fillText("> "+this.options.choices[i].description, 500, startY );
			// Spacing of question
			startY+= 50;
		}
		
		// Lets work on drawing the final questions
		this.game.ctx.strokecolor = "white";
		this.game.ctx.fillStyle = "white";
		this.game.ctx.fillStyle = "EBE6DD";
		this.game.ctx.font = "22px LeagueMono";
		this.wrapText(this.game.ctx,this.question,500,200, 700, 22);

		

		this.game.ctx.drawImage(this.game.Images[2],0,0);
	}
	click(x,y){
		/*
		opt 1 : 350 - 400
		opt 2 : 400 - 450
		opt 3: 450 - 500
		opt 4: 500 - 550
		opt 5: 550 - 600*/
			if (x < 300) return; // definitely out of range
			if(this.options.choices.length >= 5){
					if((y > 550+this.offset) && (y < 600+this.offset)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[4].sceneDestination));
					}
					
			}
			 if(this.options.choices.length >= 4){
					if((y > 500+this.offset) && (y < 550+this.offset)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[3].sceneDestination));
					}
			}
			if(this.options.choices.length >= 3){
					 if((y > 450+this.offset) && (y < 500+this.offset)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[2].sceneDestination));
					}
			}
			if(this.options.choices.length >= 2){
					 if((y > 400+this.offset) && (y < 450+this.offset)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[1].sceneDestination));
					}
			}
			 if(this.options.choices.length >= 1){
					 if((y > 350+this.offset) && (y < 400+this.offset)){
						this.game.currentScene = new Scene(this.game,this.game.getSceneByName(this.options.choices[0].sceneDestination));
					}
			}			
	}
	// Helper
	 wrapText(context, text, x, y, line_width, line_height)
	{
	    var line = '';
	    var paragraphs = text.split('\n');
	    for (var i = 0; i < paragraphs.length; i++)
	    {
	        var words = paragraphs[i].split(' ');
	        for (var n = 0; n < words.length; n++)
	        {
	            var testLine = line + words[n] + ' ';
	            var metrics = context.measureText(testLine);
	            var testWidth = metrics.width;
	            if (testWidth > line_width && n > 0)
	            {
	                context.fillText(line, x, y);
	                line = words[n] + ' ';
	                y += line_height;
	            }
	            else
	            {
	                line = testLine;
	            }
	        }
	        context.fillText(line, x, y);
	        y += line_height;
	        line = '';
	    }
	}
}