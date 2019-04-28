import Sprite from './sprite.js';
export default class BudgetMenu extends Sprite {
	constructor(game) {
		super(game);
		this.expanded = false;
		this.expandButton = new Button(400, 600, 160, 50, 24, "View Budget");
		this.budgetItems = [];
		this.budgetItems.push(new BudgetItem(100, 100, 600, 50, 24, "$200 – Something you can purchase"));
		this.budgetItems.push(new BudgetItem(100, 170, 600, 50, 24, "$200 – Something else you can purchase"));
	}
	render() {
		if (this.expanded) {
			this.game.ctx.fillStyle = "rgb(0, 0, 0)";
			this.game.ctx.fillRect(0, 0, 1440, 800);
			this.renderTitle(this.game.ctx);
			this.renderTotals(this.game.ctx);
			for (let i in this.budgetItems) {
				this.budgetItems[i].render(this.game.ctx);
			}
			this.expandButton.render(this.game.ctx);
		} else {
			this.expandButton.render(this.game.ctx);
		}
	}
	click(x, y) {
		if (this.expanded) { // clicked somewhere on menu
			for (let i in this.budgetItems) {
				this.budgetItems[i].click(x, y);
			}
			if (this.expandButton.isClick(x, y)) {
				this.expandButton.text = "View Budget";
				this.expanded = false;
			}
			return true;
		}
		if (this.expandButton.isClick(x, y)) { // clicked button
			this.expandButton.text = "Hide Budget";
			console.log("\'"+this.expandButton.text+"\' button clicked");
			this.expanded = true;
			return true;
		}
		return false;
	}
	// private
	renderTitle(ctx) {
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "40px Arial";
		ctx.fillText("BUDGET", 650, 60);
	}
	renderTotals(ctx) {
		let budge = 1000; // temp
		for (let i in this.budgetItems) {
			if (this.budgetItems[i].checked) budge -= 200;
		}
		ctx.fillStyle = "rgb(200, 250, 200)";
		ctx.font = "30px Arial";
		ctx.fillText("$"+budge, 50, 50);
	}
}
class Button {
	constructor(x, y, w, h, pt, text) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pad = 5;
		this.pt = pt;
		this.text = text;
		this.font = pt+"px Arial";
		this.textColor = "rgb(250, 250, 250)";
		this.backColor = "rgb(50, 50, 50)";
	}
	isClick(x, y) {
		return (x > this.x-this.pad && x < this.x+this.w+this.pad && y > this.y-this.pad && y < this.y+this.h+this.pad);
	}
	render(ctx) {
		ctx.fillStyle = this.backColor;
		ctx.fillRect(this.x, this.y, this.w, this.h); // background
		ctx.fillStyle = this.textColor;
		ctx.font = this.font;
		ctx.fillText(this.text, this.x+10, (this.y+this.h)-(this.h-this.pt)/2); // center text vertically
	}
}
class BudgetItem {
	constructor(x, y, w, h, pt, text) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pt = pt;
		this.text = text;
		this.textColor = "rgb(250, 250, 250)";
		this.font = pt+"px Arial";
		this.csize = 30;
		this.pad = 5;
		this.checked = false;
		this.trueColor = "rgb(250, 250, 250)";
		this.falseColor = "rgb(100, 100, 100)";
		this.backColor = "rgb(50, 50, 50)";
	}
	click(x, y) {
		if (x > this.x-this.pad && x < this.x+this.w+this.pad && y > this.y-this.pad && y < this.y+this.h+this.pad) {
			this.checked = !this.checked;
		}
	}
	render(ctx) {
		ctx.fillStyle = this.backColor;
		ctx.fillRect(this.x-this.pad, this.y-this.pad, this.w+this.pad, this.h+this.pad); // background
		ctx.fillStyle = (this.checked) ? this.trueColor : this.falseColor;
		ctx.fillRect(this.x, this.y+(this.h-this.csize)/2, this.csize, this.csize); // checkbox
		ctx.fillStyle = this.textColor;
		ctx.font = this.font;
		ctx.fillText(this.text, this.x+this.csize+20, (this.y+this.h)-(this.h-this.pt)/2); // center text vertically
	}
}