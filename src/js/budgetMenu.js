// written by Jeremy King
// github.com/Moarram

import Sprite from './sprite.js';
import MoneyData from './money.js';
export default class BudgetMenu extends Sprite {
	constructor(game) {
		super(game);
		this.expanded = false;
		this.budgetItems = [];
		this.ax1 = 80; // alignment
		this.ax2 = 450; // alignment
		
		let offsetY = 180;
		let data = MoneyData["BudgetItems"];
		for (let i = 0; i < data.length; i++) {
			let name = data[i]["NAME"]+":";
			let c1 = -data[i]["INITCOST"];
			let c2 = -data[i]["MOCOST"];
			let cost = "";
			if (c1 > 0) {
				cost = (c1 > 999 ? "$"+c1/1000+"K" : c1)+" (one time)";
			} else {
				cost = (c2 > 999 ? "$"+c2/1000+"K" : c2)+"/month";
			}
			this.budgetItems.push(new BudgetItem(this.ax2, offsetY, 600, 35, 22, name, cost));
			offsetY += 60;
		}
		
		let img = new Image();
		img.src = './dist/images/BudgetButton.png';
		img.height = 23;
		this.showButton = new Button(this.ax1, 630, 147, 50, img);
		img = new Image();
		img.height = 23;
		img.src = './dist/images/BudgetUpdateButton.png';
		this.hideButton = new Button(this.ax2, 630, 260, 56, img);
	}
	getSelectedIDs() {
		let ret = [];
		for (let i in this.budgetItems) {
			if (this.budgetItems[i].checked) ret.push(i);
		}
		return ret;
	}
	render() {
		if (this.expanded) {
			this.game.ctx.fillStyle = "#141922";
			this.game.ctx.fillRect(0, 0, 1440, 800);
			this.game.ctx.drawImage(this.game.Images[2], 0, 0);
			this.renderTitle(this.game.ctx);
			this.renderCash(this.game.ctx);
			this.renderSummary(this.game.ctx);
			for (let i in this.budgetItems) {
				this.budgetItems[i].render(this.game.ctx);
			}
			this.hideButton.render(this.game.ctx);
		} else {
			this.showButton.render(this.game.ctx);
			this.renderCash(this.game.ctx);
		}
	}
	click(x, y) {
		if (this.expanded) { // clicked somewhere on menu
			this.game.calculateBudget(this.getSelectedIDs());
			for (let i in this.budgetItems) {
				this.budgetItems[i].click(x, y);
			}
			if (this.hideButton.isClick(x, y)) {
				this.hideButton.visible = false;
				this.showButton.visible = true;
				this.expanded = false;
			}
			return true;
		} else if (this.showButton.isClick(x, y)) { // clicked button
			this.showButton.visible = false;
			this.hideButton.visible = true;
			this.expanded = true;
			return true;
		} else {
			return false;
		}
	}
	// private
	renderTitle(ctx) {
		ctx.font = "24px BlueSky";
		ctx.fillStyle = "#389DB1";
		ctx.fillText("BUDGET", this.ax2, 150);
	}
	renderCash(ctx) {
		ctx.font = "12px BlueSky";
		ctx.fillStyle = "#389DB1";
		ctx.fillText("CASH", this.ax1, 180);
		ctx.font = "24px BlueSky";
		ctx.fillText("$"+this.game.money.toLocaleString(), this.ax1, 215);
	}
	renderSummary(ctx) {
		this.game.renderDate();
		this.renderCash(ctx);
		ctx.font = "12px BlueSky";
		ctx.fillStyle = "#389DB1";
		ctx.fillText("MONTHLY NET", this.ax1, 260);
		ctx.fillText("POLLING", this.ax1, 340);
		ctx.font = "24px BlueSky";
		ctx.fillText((this.game.polling*100).toPrecision(3)+"%", this.ax1, 375);
		let net = this.calculateNet();
		if (net < 0) { // losing money
			ctx.fillStyle = "#DA5B66";
			net = "-$"+(-net).toLocaleString();
		} else { // gaining money
			ctx.fillStyle = "#80DB8E";
			net = "$"+net.toLocaleString();
		}
		ctx.fillText(net, this.ax1, 295);
	}
	calculateNet() {
		let ids = this.getSelectedIDs();
		let net = 0;
		for (let i in ids) {
			net += MoneyData["BudgetItems"][ids[i]]["MOCOST"];
		}
		return net;
	}
}
class Button {
	constructor(x, y, w, h, img, visible=true) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
		this.pad = 5; // buffer that still counts as click
		// this.backColor = "rgb(50, 50, 50)"; // debug
		this.visible = visible;
	}
	isClick(x, y) {
		return (this.visible && x > this.x-this.pad && x < this.x+this.w+this.pad && y > this.y-this.pad && y < this.y+this.h+this.pad);
	}
	render(ctx) {
		if (!this.visible) return;
		// ctx.fillStyle = this.backColor;
		// ctx.fillRect(this.x-this.pad, this.y-this.pad, this.w+(this.pad*2), this.h+(this.pad*2)); // background
		ctx.drawImage(this.img, this.x, this.y);
	}
}
class BudgetItem {
	constructor(x, y, w, h, pt, text1, text2) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pt = pt;
		this.text1 = text1;
		this.text2 = text2;

		this.imgChecked = new Image();
		this.imgChecked.src = './dist/images/CheckButton_Selected.png';
		this.imgUnchecked = new Image();
		this.imgUnchecked.src = './dist/images/CheckButton_Static.png';

		this.font = pt+"px LeagueMono";
		this.pad = 5;
		this.checked = false;
		// this.backColor = "rgb(50, 50, 50)"; // debug
	}
	click(x, y) {
		if (x > this.x-this.pad && x < this.x+this.w+this.pad && y > this.y-this.pad && y < this.y+this.h+this.pad) {
			this.checked = !this.checked;
		}
	}
	render(ctx) {
		// ctx.fillStyle = this.backColor;
		// ctx.fillRect(this.x-this.pad, this.y-this.pad, this.w+(this.pad*2), this.h+(this.pad*2)); // background
		let img = (this.checked) ? this.imgChecked : this.imgUnchecked;
		ctx.drawImage(img, this.x, this.y+(this.h-img.height)/2); // checkbox
		ctx.font = this.font;
		ctx.fillStyle = "#EBE6DD";
		ctx.fillText(this.text1, this.x+img.width+20, (this.y+this.h)-(this.h-this.pt)/2-3);
		ctx.fillStyle = "#389DB1";
		ctx.fillText(this.text2, this.x+img.width+20+(this.text1.length+1)*(this.pt/1.7), (this.y+this.h)-(this.h-this.pt)/2-3);
	}
}