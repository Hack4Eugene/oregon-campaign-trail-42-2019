let Scenes =  [
	{
		// Screen 3
		"name": "start", // Name of the Scene "Scene"
		"question" : "At a school board meeting in April 2020, the school board surprises the community with plans to change the location of your local school. You are upset by these plans, and take the opportunity to speak out against the move. ", // Question 
		"current_date" : "April 2020", // Date for Month
		"campaign_month_count" : 0, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_4"
				}

		]
	},
	{   // Screen 4
		"name": "screen_4",
		"question" : `After the meeting, your friend Heather, a former school board member, says, "Hey, you should run. Have you thought about it?" 
		“I wouldn’t even know where to start--these people seem like they’ve been doing this their whole lives.”
		“Let’s have coffee in May,” Heather says. “I was on the school board a few years ago, and I can help you get started.”`,
		"current_date" : "April 2020", // Date for Month
		"campaign_month_count" : 0, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_5"
				}
		]
	},
	{   // Screen 5
		"name": "screen_5",
		"question" : `You meet up with Heather for coffee at The Old Washburne.
		“I’ve never even thought about running for office before,” you tell Heather.
		
		Heather smiles and tells you, “It’s not that hard, but it does take some planning. The school board elections happen every 2 years, and our next one is in May 2021. This is a great time to get started!”`,
		"current_date" : "April 2020", // Date for Month
		"campaign_month_count" : 0, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_6"
				}
		]
	},
	{ 
		"name": "screen_6",
		"question" : `“What do I need to do? Do I have to go declare my intention somewhere?”
		Heather takes out a pad of paper. “Actually, the best place to start is with budgeting. What’s your top budget priority?” 
		`,
		"current_date" : "May 2020", // Date for Month
		"campaign_month_count" : 1, // Counter for Budget
		"choices" : [
				{
					"description" : "Rent an office to run your campaign from",
					"sceneDestination" : "start"
				},
				{
					"description" : "Hire a campaign manager",
					"sceneDestination" : "start"
				},
				{
					"description" : "Hire a public relations manager",
					"sceneDestination" : "start"
				},
				{
					"description" : "Find volunteers",
					"sceneDestination" : "start"
				},
				
		]
	
	},

	{ 
		"name": "screen_7",
		"question" : "Example Question? Wecome to the game?",
		"current_date" : "April 2020", // Date for Month
		"campaign_month_count" : 1, // Counter for Budget
		"choices" : [
				{
					"description" : "go back to example",
					"sceneDestination" : "start"
				}
		]
	
	},
	{ 
		"name": "screen_6",
		"question" : "Example Question? Wecome to the game?",
		"current_date" : "April 2020", // Date for Month
		"campaign_month_count" : 0, // Counter for Budget
		"choices" : [
				{
					"description" : "go back to example",
					"sceneDestination" : "start"
				}
		]
	
	},
];
export default Scenes;