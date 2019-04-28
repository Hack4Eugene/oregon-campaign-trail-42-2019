import Sprite from './sprite.js';
export default class BudgetMenu extends Sprite {
	constructor(game) {
		super(game);
		this.expanded = false;
	}
	render() {
		if (this.expanded) {

		} else {
			this.game.ctx.color = "grey";
			this.game.ctx.fillRect(1190, 700, 200, 50);

			this.game.ctx.font = " 24px Arial";
			this.game.ctx.color = "white";
			this.game.ctx.fillText("Manage Budget", 1200, 750);
		}
	}
	click(x, y) {
		if (this.expanded) {

		} else {
			if (x > 1180 && y > 700) {
				this.expanded = true;
			}
		}
	}
}