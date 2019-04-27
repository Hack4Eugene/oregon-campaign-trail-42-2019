let Scenes =  [
	{
		"name": "start",
		"choices" : [
				{
					"description" : "go left",
					"sceneDestination" : "left"
				},
				{
					"description" : "go right",
					"sceneDestination" : "right"
				},

		]
	},
	{
		"name": "left",
		"choices" : [
				{
					"description" : "go back to example",
					"sceneDestination" : "start"
				}
		]
	},
	{
		"name": "right",
		"choices" : [
				{
					"description" : "go back to example",
					"sceneDestination" : "start"
				}
		]
	},
];
export default Scenes;