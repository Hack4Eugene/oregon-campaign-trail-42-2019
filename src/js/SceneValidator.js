import Scenes from scenes.js;

//this.scenes = Scenes
validateEventEndpoints() {
	this.scenes.forEach((sOut) => {
		sOut["choices"].forEach((c) => {
			let hasMatch = false;
			let sceneName = c["sceneDestination"];
			Scenes.forEach((sIn) => {
				if (sIn["name"] == sceneName) {
					hasMatch = true;
				}
			});
			if (!hasMatch) {
				console.log("Scene: " + sOut["name"] + " Decision: " + c["description"] + " has no match!");
			}
		});
	});
}