[
	{
		"name": "start",
		"mainImage" : "./images/example.jpg",
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
		"mainImage" : "./images/left.jpg",
		"choices" : [
				{
					"description" : "go back to example",
					"sceneDestination" : "start"
				}
		]
	},
	{
		"name": "right",
		"mainImage" : "./images/example.jpg",
		"choices" : [
				{
					"description" : "go back to example",
					"sceneDestination" : "start"
				}
		]
	},
];