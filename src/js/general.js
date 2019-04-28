
class Viewport {
	constructor(){
		this.canvas =  document.getElementsByTagName("canvas")[0];
		this.viewport_meta = document.getElementById('viewport-meta');
		this.setViewport();
	}
	setViewport(){
		if(screen.width > 960){
		//	this.viewport_meta.setAttribute('content',"width=" + screen.width);
			console.log("Setting viewport to " + screen.width);
		}
		else{
			//this.viewport_meta.setAttribute('content',"width=" + screen.width + ",initial-scale=1,height=" + screen.height + ",user-scalable=no, minimal-ui");
		}
	}
}

let viewport;
window.addEventListener('load', () => {
	viewport = new Viewport();
});