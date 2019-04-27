
export default class Sprite{
	constructor(game){
		this.game = game;
		/* Where on the canvas is it */
		this.positionX = 0;
		this.positionY = 0;
		/* How fast is it going */
		this.speed = 0;
		
		/* Where is it going */

		this.destinationX = 0;
		this.destinationY = 0;

		/* Do we draw this in the canvas */
		this.visible = false;

		/* Center of Screen */
		this.centerX = this.game.canvas.width/2;
		this.centerY = this.game.canvas.height/2;

		
	}
}