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

					"sceneDestination" : "screen_6_wrong"
				},
				{
					"description" : "Hire a campaign manager",
					"sceneDestination" : "screen_6_right"
				},
				{
					"description" : "Hire a public relations manager",
					"sceneDestination" : "screen_6_wrong"
				},
				{
					"description" : "Find volunteers",
					"sceneDestination" : "screen_6_wrong"
				},
				
		]
	
	},

	{ 
		"name": "screen_6_wrong",
		"question" : `Heather responds with “I’d find someone to manage my campaign and design a logo first, but this could work too!”`,
		"current_date" : "May 2020", // Date for Month
		"campaign_month_count" : 1, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_7"
				}
		]
	
	},
	{ 
		"name": "screen_6_right",
		"question" : `Heather responds with, “A campaign manager and someone to design a logo would be my top priority too!”`,
		"current_date" : "May 2020", // Date for Month

		"campaign_month_count" : 1, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_7"
				}
		]
	
	},
	{ 
		"name": "screen_7",
		"question" : `It’s time to set your budget! Click on the “budget” button to set up your campaign budget. Each item will cost money. Items may generate additional income, and even give bonuses to your polling percentage.`,
		"current_date" : "May 2020", // Date for Month
		"campaign_month_count" : 1, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_8"
				}
		]
	
	},
	{ 
		"name": "screen_8",
		"question" : `The campaign is getting organized, and you meet up with Heather again in June.

		“Now that we’ve got your budget laid out, we should figure out what your goal is,” Heather says. “Do you know how to calculate your vote win number?”
		
		Which is the formula for a “vote win number”?
		`,
		"current_date" : "June 2020", // Date for Month
		"campaign_month_count" : 2, // Counter for Budget
		"choices" : [
			{
				"description" : "The largest number of votes a candidate has received",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "The most recent number of votes that a candidate needed to win",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "The average number of winning votes needed over the last two campaigns, multiplied by .55",
				"sceneDestination" : "screen_8_right"
			},
			{
				"description" : "The number of votes needed to be elected in the previous three elections",
				"sceneDestination" : "screen_8_wrong"
			},
			
	]
	
	},
	{ 
		"name": "screen_8_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "June 2020", // Date for Month
		"campaign_month_count" : 2, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_9"
				}
		]
	
	},
	{ 
		"name": "screen_8_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "June 2020", // Date for Month
		"campaign_month_count" : 2, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_9"
				}
		]
	
	},
	{ 
		"name": "screen_9",
		"question" : `Everyone is getting into a rhythm, but your campaign doesn’t have a lot of visibility in the community yet. Heather advises you to start some community outreach efforts.

		What outreach method do you think will be LEAST effective for Baby Boomers?`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 3, // Counter for Budget
		"choices" : [
			{
				"description" : "Facebook",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "Door-to-door canvassing",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "Instagram",
				"sceneDestination" : "screen_8_right"
			},
			{
				"description" : "Phone banks",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "Radio ads",
				"sceneDestination" : "screen_8_wrong"
			},
			
	]
	
	},
	{ 
		"name": "screen_9_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 3, // Counter for Budget

		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_10"
				}
		]
	
	},
	{ 
		"name": "screen_9_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 3, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_10"
				}
		]
	
	},
	{ 
		"name": "screen_10",
		"question" : `The after school political club has decided to help out. Their coordinator, Tim, has come to you to ask how they can they can get involved. After speaking with Heather, you decide to have them reach out to the younger voter demographic. 

		What outreach method will be MOST effective for Millennials?`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 3, // Counter for Budget
		"choices" : [
			{
				"description" : "Facebook",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "Door-to-door canvassing",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "Phone banks",
				"sceneDestination" : "screen_8_wrong"
			},
			{
				"description" : "Instagram",
				"sceneDestination" : "screen_8_right"
			},
			{
				"description" : "Radio ads",
				"sceneDestination" : "screen_8_wrong"
			},
			
	]
	
	},
	{ 
		"name": "screen_10_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 3, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_10"
				}
		]
	
	},
	{ 
		"name": "screen_10_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 3, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_10"
				}
		]
	
	},


];
export default Scenes;