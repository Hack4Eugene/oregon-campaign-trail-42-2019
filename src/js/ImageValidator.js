import Scenes from scenes.js;

//this.scenes = Scenes

ValidateImageEndpoints() {
	Scenes.Foreach(sOut => {
		sOut["choices"].Foreach(c => {
			let hasMatch = false;
			let sceneName = c["sceneDestination"];
			Scenes.Foreach(sIn => {
				if (sIn["name"] == sceneName) {
					hasMatch = true;
					break;
				}
			});
			if (!hasMatch) {
				console.log("Scene: " sOut["name"] + " Decision: " + c["description"] + " has no match!");
			}
		});
	});
}