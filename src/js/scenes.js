let Scenes =  [
	{
		// Screen 3
		"name": "start", // Name of the Scene "Scene"
		"question" : "At a school board meeting in April 2020, the school board surprises the community with plans to change the location of your local school. You are upset by these plans, and take the opportunity to speak out against the move. ", // Question 
		"current_date" : "April 2020", // Date for Month
		"campaign_month_count" : 0, // Counter for Budget
		"img" : "Animation_School.gif",
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
		"img" : "Animation_Heather_Walking.gif",
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
		"img": "Animation_Heather_Coffee.gif",
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
		"img" : "Animation_Heather_Planning.gif",
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
		"img" : "Animation_Heather_Planning.gif",
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
		"img" : "Animation_Heather_Planning.gif",
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
		"img" : "Animation_Heather_Planning.gif",
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_8"
				}
		]
	
	},
	{ 
		"name": "screen_8",
		"question" : `The campaign is getting organized, and you meet up with Heather again in June. “Now that we’ve got your budget laid out, we should figure out what your goal is,” Heather says. “Do you know how to calculate your vote win number?” Which is the formula for a “vote win number”?`
		,
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
				"sceneDestination" : "screen_9_wrong"
			},
			{
				"description" : "Door-to-door canvassing",
				"sceneDestination" : "screen_9_wrong"
			},
			{
				"description" : "Instagram",
				"sceneDestination" : "screen_9_right"
			},
			{
				"description" : "Phone banks",
				"sceneDestination" : "screen_9_wrong"
			},
			{
				"description" : "Radio ads",
				"sceneDestination" : "screen_9_wrong"
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
				"sceneDestination" : "screen_10_wrong"
			},
			{
				"description" : "Door-to-door canvassing",
				"sceneDestination" : "screen_10_wrong"
			},
			{
				"description" : "Phone banks",
				"sceneDestination" : "screen_10_wrong"
			},
			{
				"description" : "Instagram",
				"sceneDestination" : "screen_10_right"
			},
			{
				"description" : "Radio ads",
				"sceneDestination" : "screen_10_wrong"
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
		
	{ 
		"name": "screen_11",
		"question" : `You’re out at the Public House for dinner one night and see Heather. She asks, “How’s your budget doing? In the second quarter, you’ll probably need to start finding some volunteers. A volunteer coordinator could be a real help finding people and getting them organized!”`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 3, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_12"
				}
		]
	
	},{ 
		"name": "screen_12",
		"question" : `As the summer wears on, your campaign manager decides that it’s time to start recruiting volunteers to help out with the campaign. There are many different benefits that different volunteers could bring, but what is the MOST important quality to look for?`,
		"current_date" : "August 2020", // Date for Month
		"campaign_month_count" : 4, // Counter for Budget
		"choices" : [
			{
				"description" : "Skills",
				"sceneDestination" : "screen_12_wrong"
			},
			{
				"description" : "Alignment of goals",
				"sceneDestination" : "screen_12_right"
			},
			{
				"description" : "Availability",
				"sceneDestination" : "screen_12_right"
			},
			{
				"description" : "Dedication to the cause",
				"sceneDestination" : "screen_12_wrong"
			},
			{
				"description" : "Personality",
				"sceneDestination" : "screen_12_wrong"
			},
			
		]},
	{ 
		"name": "screen_12_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 4, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_13"
				}
		]
	
	},
	{ 
		"name": "screen_12_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "July 2020", // Date for Month
		"campaign_month_count" : 4, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_13"
				}
		]
	
	},
	{ 
		"name": "screen_13",
		"question" : `You check the funds with your team and discover that the money is getting low. You’ve already solicited donations from everyone you know, so you need to find some new sources of funding. How can you refill your coffers?`,
		"current_date" : "September 2020", // Date for Month
		"campaign_month_count" : 4, // Counter for Budget
		"choices" : [
			{
				"description" : "Visit the Oregon Secretary of State Finance Page (ORESTAR)",
				"sceneDestination" : "screen_13_right"
			},
			{
				"description" : "High-interest loan",
				"sceneDestination" : "screen_13_wrong"
			},
			{
				"description" : "An unpublicized Go Fund Me campaign",
				"sceneDestination" : "screen_13_wrong"
			},
			{
				"description" : "Cold-calling local businesses",
				"sceneDestination" : "screen_13_wrong"
			},
			
	]
	
	},
	{ 
		"name": "screen_13_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens." Check out ORESTAR for more help: https://sos.oregon.gov/elections/Pages/orestar.aspx`,
		"current_date" : "May 2020", // Date for Month
		"campaign_month_count" : 1, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_14"
				}
		]
	
	},
	{ 
		"name": "screen_13_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "May 2020", // Date for Month
		"campaign_month_count" : 1, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_14"
				}
		]
	
	},
	{ 
		"name": "screen_14",
		"question" : `You’re reading the paper one morning in October, and notice that there’s a letter to the editor supporting one of your opponents in the race. You realize that you need to get your name in the paper somehow too. What’s the best way to achieve this goal?`,
		"current_date" : "October 2020", // Date for Month
		"campaign_month_count" : 6, // Counter for Budget
		"choices" : [
			{
				"description" : "Invite a reporter you know of out for drinks",
				"sceneDestination" : "screen_14_wrong"
			},
			{
				"description" : "E-mail the paper asking them to write an article about you",
				"sceneDestination" : "screen_14_wrong"
			},
			{
				"description" : "Prepare an editorial with your policy ideas and submit it for publication",
				"sceneDestination" : "screen_14_right"
			},
			{
				"description" : "Show up unannounced at the front desk and demand a meeting with the editor",
				"sceneDestination" : "screen_14_wrong"
			},
			
	]
	
	},
	{ 
		"name": "screen_14_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "October 2020", // Date for Month
		"campaign_month_count" : 6, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_15"
				}
		]
	
	},
	{ 
		"name": "screen_14_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "October 2020", // Date for Month
		"campaign_month_count" : 6, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_15"
				}
		]
	
	},
	{ 
		"name": "screen_15",
		"question" : `It’s the morning after the 2020 presidential election and the world is abuzz. Although all of the attention is at the White House, you’re organizing for the most local elected level of office. You’re excited to run and want to make it official when you realize
		How do you qualify for the ballot? `,
		"current_date" : "November 2020", // Date for Month
		"campaign_month_count" : 7, // Counter for Budget
		"choices" : [
			{
				"description" : "You pay $10 or collect 25 signatures",
				"sceneDestination" : "screen_15_right"
			},
			{
				"description" : "You pay $30",
				"sceneDestination" : "screen_15_wrong"
			},
			{
				"description" : "You pay $10 fee and collect 25 signatures",
				"sceneDestination" : "screen_15_wrong"
			},
			{
				"description" : "You pay $30 or collect 20 signatures",
				"sceneDestination" : "screen_15_wrong"
			},
			
	]
	
	},
	{ 
		"name": "screen_15_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "November 2020", // Date for Month
		"campaign_month_count" : 7, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_15"
				}
		]
	
	},
	{ 
		"name": "screen_15_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "November 2020", // Date for Month
		"campaign_month_count" : 7, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_15"
				}
		]
	
	},
	{ 
		"name": "screen_16",
		"question" : `BOOM. You were hit by a negative TV ad, and your jaw drops at how vicious and untrue it is. No names are listed as the sponsors of the ad, just a PAC. How can you find out who is funding this smear campaign?`,
		"current_date" : "November 2020", // Date for Month
		"campaign_month_count" : 7, // Counter for Budget
		"choices" : [
			{
				"description" : "Contact the TV station that aired the ad",
				"sceneDestination" : "screen_16_right"
			},
			{
				"description" : "Call the current school board",
				"sceneDestination" : "screen_16_wrong"
			},
			{
				"description" : "Send an e-mail to the county elections clerk",
				"sceneDestination" : "screen_16_wrong"
			},
			{
				"description" : "Check the Oregon Secretary of State ORESTAR page",
				"sceneDestination" : "screen_16_wrong"
			},
			
	]
	
	},
	{ 
		"name": "screen_16_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens. I'd really suggest checking out ORESTAR at https://sos.oregon.gov/elections/Pages/orestar.aspx"`,
		"current_date" : "November 2020", // Date for Month
		"campaign_month_count" : 7, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_16"
				}
		]
	
	},
	{ 
		"name": "screen_16_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "November 2020", // Date for Month
		"campaign_month_count" : 7, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_16"
				}
		]
	
	},
];
export default Scenes;