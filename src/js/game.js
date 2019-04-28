

import Sprite from './sprite.js';
import Scenes from './scenes.js';
import Scene from './scene.js';

class Game{
	constructor(game){
		this.canvas =  document.getElementsByTagName("canvas")[0];
		this.ctx    = this.canvas.getContext('2d');
		this.handleClick.bind(this);
		this.clickAbleSprites = [];
		this.lastClickX = null;
		this.lastclickY = null;
		/* Some Defaults */
		this.backgroundColor = "#000000";

		/* Timer */
		this.playSound = true;
		this.timer = null;
		this.tickTime = 100;

		// Which Scene is showing
		this.showScene = false;
		this.currentScene = null;
		this.scenes = Scenes;

		this.roundTime = -1;
 		// Round has begun
		this.roundStarted = true;
		
		// Current Number of Runs
		this.roundScore = 0;
		this.backgroundImage = null;

		this.audio = new Audio("dist/sound/loop.mp3");
		
		/* array of images */
		this.backgroundImage = null;
		this.showPlayAgain = false;
		/* Call Methods */
		this.initCanvas();
		this.playButton = true;
		this.firstload = true;
	
		this.canvas.addEventListener('click', (e) => {
		 const pos = {
			x: e.clientX,
			y: e.clientY
		  };
		  this.handleClick(pos.x,pos.y);
		});
		// Start Game Rendering  - Last Method
		this.animateGame();
		
	}

	handleClick(x,y){
		this.lastClickX = x;
		this.lastClickY = y;
		if(this.playButton){
			// Play the game button
			if((x>= 526) & (x <= 850) & (y>= 200) & (y <= 400))  {
				// Stop drawing the menu
				this.firstload = false;
				this.playButton = false;
				this.showScene = true;
				this.audio.play();
				this.audio.loop = true;
				// Start drawing the first scene
				this.currentScene = new Scene(this,this.getSceneByName("start"));
			}
			console.log("x: " + x + "y: " + y);
		}
		// If we want to do something special outside of scenes we can set the currentScene to nothing
		else if(this.showScene){
			
				this.currentScene.click(x,y);
		}	
	}
	getSceneByName(name){
		let selectedScene = null;
		this.scenes.forEach( (scene) => {
				if(scene.name == name){
						selectedScene = scene;
				}
		});
		if(selectedScene == null ){
			return "start";
		}
		else{
			return selectedScene;
		}
	}
	initCanvas(){ 
		this.canvas.width = 1440;
		this.canvas.height = 800;
		this.backgroundImages = [];
		this.Images = [];

		let drawing = new Image();

		drawing.src = "./dist/images/title.png"; // can also be a remote URL e.g. http:// // 0
		this.Images.push(drawing);
		
		drawing = new Image();
		drawing.src = "./dist/images/campaign.png"; // 1
		this.Images.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/frame.png"; // 2
		this.Images.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/campaign.png"; // 3
		this.Images.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/credits.png"; // 4
		this.Images.push(drawing);
	}
	animateGame(){
		this.timer = setInterval(() => {
			// Clear the Canvas
			this.clearCanvas();

   			/* Render Scene Manager */
           	if(this.currentScene != null){
           		this.currentScene.render();
           	}
     
            /* show menu */
			if(this.firstload == true){
				this.drawMenu();
			}
		}), this.tickTime;
	}
	drawMenu(){

		this.ctx.beginPath();
		this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = "black";
		this.ctx.fill();
		// Title Image
		this.ctx.drawImage(this.Images[0],475,80);
		// Play Button
		this.ctx.drawImage(this.Images[1],525,350);
		
		// Draw the frame
		this.ctx.drawImage(this.Images[2],0,0);
		
		this.ctx.strokecolor = "red";
		this.ctx.fillStyle = "red";
		this.ctx.font = "bold 24px BlueSky8x8Monospaced";
		this.ctx.color = "red";
			
	}
	clearCanvas(){
		/*  main background */	
		
		this.ctx.fillStyle = "#000000";
		this.ctx.strokeStyle = "#ffffff";
		//  context.fillRect(10,10, 100,100);
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
let game;
window.addEventListener('load', () => {
	game = new Game();
});
window.addEventListener('resize', () =>{
	console.log("Window Changed");
});