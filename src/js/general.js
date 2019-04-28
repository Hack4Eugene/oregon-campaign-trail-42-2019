/*
	Interstellar Home Run Derby
	License: Attribution-NonCommercial-ShareAlike 3.0 United States (CC BY-NC-SA 3.0 US)

	Developed By

	Lead Art 
	----------
	Eric Hill  
		twitter.com/erichill1232
		instagram.com/eric.hill.1232
		https://www.deviantart.com/beza
		https://nightmarenetherworld.tumblr.com/

	Lead Programming
	----------
	Robert Moore
		http://www.eugeneprogramming.com
		https://www.linkedin.com/in/robertbenmoore/

	Programming
	----------
	Gordon Wallace

	Q & A / System Design
	----------
	Jack Kimball

	Github Copy @ 
	https://github.com/bobby5892/InterstellarHomeRunDerby



*/
class Viewport {
	constructor(){
		this.canvas =  document.getElementsByTagName("canvas")[0];
		this.viewport_meta = document.getElementById('viewport-meta');
		this.setViewport();
	}
	setViewport(){
		if(screen.width > 960){
			this.viewport_meta.setAttribute('content',"width=" + screen.width);
			console.log("Setting viewport to " + screen.width);
		}
		else{
			this.viewport_meta.setAttribute('content',"width=" + screen.width + ",initial-scale=0.75,height=" + screen.height + ",user-scalable=no, minimal-ui");
		}
	}
}

let viewport;
window.addEventListener('load', () => {
	viewport = new Viewport();
});