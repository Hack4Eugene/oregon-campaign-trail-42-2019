

import Sprite from './sprite.js';
import Scenes from './scenes.js';
import Scene from './scene.js';
import BudgetMenu from './budgetMenu.js';
import MoneyData from './money.js';

class Game{
	constructor(game){
		this.canvas =  document.getElementsByTagName("canvas")[0];
		this.ctx    = this.canvas.getContext('2d');
		this.handleClick.bind(this);
		this.clickAbleSprites = [];
		this.lastClickX = null;
		this.lastclickY = null;
		/*
		type {
			x.pos
			x.width
			y.pos
			y.width
		}
		*/
		/* Refactor into array of sprites */
		
		//this.batter = new Batter(this);
		//this.pitcher = new Pitcher(this);
		//this.ball = new Ball(this);
		//this.platform = new Platform(this);
		//this.scoreboard = new Scoreboard(this);
 
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

		// budget
		this.budgetMenu = new BudgetMenu(this, MoneyData);
		this.showBudgetMenu = false; // budget menu or menu access button is visible
		this.money = 10000; // starting budget

		// Round has begun
		this.roundTime = -1;
		this.roundStarted = true;
		
		// Current Number of Runs
		this.roundScore = 0;
		this.backgroundImage = null;

		this.audio = null;
		/* array of images */
		this.backgroundImage = null;


		this.showPlayAgain = false;
		/* Call Methods */
		/* stretch canvas */
		this.initCanvas();
		this.playButton = true;
		this.firstload = true;
	
		this.canvas.addEventListener('click', (e) => {
			console.log("mousedown @ "+e.clientX+" "+e.clientY);
			const pos = {
				x: e.clientX,
				y: e.clientY
			};
			this.handleClick(pos.x,pos.y);
		});
		// Start Game Rendering  - Last Method
		this.animateGame();
	}
	calculateBudget(selectedIDs, month) {
		for (var i = 0; i < selectedIDs.length; i++){
			if (budget_ledger["BudgetItems"][i].ID = selectedIDs[i])
			budget_ledger.LedgerItems.push(
		   {    "EntryName": budget_ledger["BudgetItems"][i]["NAME"], 
				"Value": (budget_ledger["BudgetItems"][i]["MOCOST"] == 0) ? budget_ledger["BudgetItems"][i]["INITCOST"]:budget_ledger["BudgetItems"][i]["MOCOST"], 
				"MONTH":month, 
				"MOD": budget_ledger["BudgetItems"][i]["MOD"] 
			}) 
			}
		var CashFlow = budget_ledger.LedgerItems;
		this.money = 0;
		
		for (i = 0; i < CashFlow.length; i++) {  
		this.money += CashFlow[i].Value  } 
	}
	handleClick(x,y){
		this.lastClickX = x;
		this.lastClickY = y;
		if(this.showBudgetMenu) {
			if (this.budgetMenu.click(x,y) === true) return;
		}
		if(this.playButton){
			// Play the game button
			if((x>= 526) & (x <= 850) & (y>= 354) & (y <= 400))  {
				// Stop drawing the menu
				this.firstload = false;
				this.playButton = false;
				this.showScene = true;
				this.showBudgetMenu = true;
				// Start drawing the first scene
				this.currentScene = new Scene(this,this.getSceneByName("start"));
			}
			// console.log("x: " + x + "y: " + y);
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

/*		
		drawing = new Image();
		drawing.src = "./dist/images/keys.png"; // 4
		this.backgroundImages.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/playagain.png"; // 4
		this.backgroundImages.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/title.png"; // 5
		this.backgroundImages.push(drawing);

		drawing = new Image();
		drawing.src = "./dist/images/play.png"; // 6
		this.backgroundImages.push(drawing);

		this.audio = [];
		this.audio.push(new Audio('./dist/audio/47356__fotoshop__oof.wav')); //0
		this.audio.push(new Audio('./dist/audio/fart01.wav')); // 1 / 
		this.audio.push(new Audio('./dist/audio/hitbat_v1.wav')); // 2 / 
		this.audio.push(new Audio('./dist/audio/stadiumcheer1.wav')); // 3 / 
		this.audio.push(new Audio('./dist/audio/whooshbat1.wav')); //4 
		
*/
	}
	animateGame(){
		this.timer = setInterval(() => {

			// Clear the Canvas
			this.clearCanvas();

			// Draw the platform
			//this.platform.draw(this.ctx);
			// Draw the pitcher
			//this.pitcher.draw(this.ctx);
			// Draw the scoreboard
			//this.scoreboard.draw(this.ctx);
			// Draw the Ball
			//this.ball.draw(this.ctx);
			// Draw the Batter
			//this.batter.draw(this.ctx);

			if(this.currentScene != null){
				this.currentScene.render();
			}

			if (this.budgetMenu !== null) this.budgetMenu.render();

			// draw play again
			/*if(this.showPlayAgain){
				this.drawPlayAgain();
			}*/

			/* show menu */
			if(this.firstload == true){
				this.drawMenu();
			}

			// Round Timer Update
			//this.roundTimerTick();

		}), this.tickTime;
	}
	/*startGame(){
		this.startroundTimer();
		this.roundStarted = true;
		this.roundScore = 0;
		this.showPlayAgain = false;
	}
	startroundTimer(){
		this.roundTime = 15000;
		//this.roundTime = 1000;
	}
	roundTimerTick(){
		if(this.roundStarted){
			if(this.roundTime > 0){
				this.roundTime--;  // so this is 100ms
			}
		}
		
		if(this.roundTime == 0){
			this.showPlayAgain = true;
			
		}
	}*/
	loadScene(scene){
		console.log("load scene" + scene);
	}
	drawPlayAgain(){
		this.ctx.drawImage(this.backgroundImages[4],375,110);
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
		this.ctx.font = "bold 24px Arial";
		this.ctx.color = "red";
		//this.ctx.fillText("Touch to Start", 365, 450 );
			/*
		this.ctx.font = "24px Georgia";
		this.ctx.color = "white";
		this.ctx.fillStyle = "white";
		this.ctx.strokecolor = "white";
		this.ctx.fillText("Lead Art", 10, 350);
		this.ctx.fillText("Eric Hill", 10, 370);
		this.ctx.fillText("Lead Programming", 10, 400);
		this.ctx.fillText("Robert Moore", 10, 420);

		this.ctx.fillText("Programming", 10, 450);
		this.ctx.fillText("Gordon Wallace", 10, 470);
		this.ctx.fillText("QA / System Design", 10, 500);
		this.ctx.fillText("Jack Kimball", 10, 520);

		this.ctx.font = "18px Arial";
		this.ctx.fillText("Copyright 2019 - Made for GameJam 2019", 660, 520);

		this.ctx.drawImage(this.backgroundImages[6],470,430);*/
	}
	clearCanvas(){
		/*  main background */
		//this.ctx.drawImage(this.backgroundImages[0],0,0); // draw first batter image
		
		this.ctx.fillStyle = "#000000";
		this.ctx.strokeStyle = "#ffffff";
		//context.fillRect(10,10, 100,100);
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		/*  stars alt */
		/*if(this.roundTime%2 == 0){
			this.ctx.drawImage(this.backgroundImages[1],0,0);
		}
	
		else{ 
			this.ctx.drawImage(this.backgroundImages[2],0,0);
		}
		
		/*  keys */
		//this.ctx.drawImage(this.backgroundImages[3],50,360);
	}
}
let game;
window.addEventListener('load', () => {
	game = new Game();
});
window.addEventListener('resize', () =>{
	console.log("Window Changed");
});