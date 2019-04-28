let Scenes = [
	{
		"name": "Start Campaign",
		"choices": [
			{
				"description": "Begin the Campaign.",
				"sceneDestination": "start"
			},
			{
				"description": "Learn About the Game.",
				"sceneDestination": "aboutTheGame"
			},
			{
				"description": "Credits",
				"sceneDestination": "credits"
			}
		]
	},

]

let TestScenes =  [
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