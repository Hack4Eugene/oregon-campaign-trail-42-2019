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
				"description" : "The average number of winning votes needed over last 2 campaigns",
				"sceneDestination" : "screen_8_right"
			},
			{
				"description" : "The number of votes needed to be elected in last 3 elections",
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
					"sceneDestination" : "screen_11"
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
					"sceneDestination" : "screen_11"
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
					"sceneDestination" : "screen_16"
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
					"sceneDestination" : "screen_16"
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
					"sceneDestination" : "screen_17"
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
					"sceneDestination" : "screen_17"
				}
		]
	
	},

	{ 
		"name": "screen_17",
		"question" : `You’re having lunch with your co-workers, and they’re curious about your campaign. Your cube-mate Aaron asks, “How many voters are there in the school district anyway?” and you start to wonder as well. You know that Lane County has a document with the voter totals for the different districts, and decided to figure out just how many registered voters there are in Springfield School District #19.(link page)`,
		"current_date" : "January 2021", // Date for Month
		"campaign_month_count" : 9, // Counter for Budget
		"choices" : [
				{
					"description" : "51650",
					"sceneDestination" : "screen_17_right"
				},
				{
					"description" : "48459",
					"sceneDestination" : "screen_17_wrong"
				},
				{
					"description" : "40060",
					"sceneDestination" : "screen_17_wrong"
				},
				{
					"description" : "35680",
					"sceneDestination" : "screen_17_wrong"
				},
		]
	
	},
	{ 
		"name": "screen_17_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "January 2021", // Date for Month
		"campaign_month_count" : 9, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_18"
				}
		]
	
	},

	{ 
		"name": "screen_17_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "January 2021", // Date for Month
		"campaign_month_count" : 9, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_18"
				}
		]
	
	},
	{ 
		"name": "screen_18",
		"question" : `Your top canvasser Dean comes back from a long afternoon of spreading the word. He says that he got a lot of friendly comments, but there were some houses where he had to knock for a while before anyone answered. A few residents never answered their doors, but Dean says he left flyers in their mailboxes. Your volunteer coordinator turns red and takes Dean back into her office to talk about Dos and Don’ts of canvassing. What did Dean do wrong?`,
		"current_date" : "February 2021", // Date for Month
		"campaign_month_count" : 10, // Counter for Budget
		"choices" : [
				{
					"description" : "Accepted a glass of water from a resident",
					"sceneDestination" : "screen_18_wrong"
				},
				{
					"description" : "Left flyers in mailboxes",
					"sceneDestination" : "screen_18_right"
				},
				{
					"description" : "Knocked too long",
					"sceneDestination" : "screen_18_wrong"
				},
				{
					"description" : "Didn’t have canvassing permit",
					"sceneDestination" : "screen_18_wrong"
				},
		]
	
	},
	{ 
		"name": "screen_18_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "February 2021", // Date for Month
		"campaign_month_count" : 10, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_19"
				}
		]
	
	},

	{ 
		"name": "screen_18_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "February 2021", // Date for Month
		"campaign_month_count" : 10, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_19"
				}
		]
	
	},
	{ 
		"name": "screen_19",
		"question" : `Election day is nearing, and you really want to take on your opponent in a public forum so that you can show everyone how much better you would be as a member of the school board. You realize you don’t know how to get a debate set up, and decide to look into it. After some searches and talking to your campaign manager, you know that debates are organized by:`,
		"current_date" : "March 2021", // Date for Month
		"campaign_month_count" : 11, // Counter for Budget
		"choices" : [
				{
					"description" : "Political parties",
					"sceneDestination" : "screen_19_wrong"
				},
				{
					"description" : "The superintendent of the school district",
					"sceneDestination" : "screen_19_wrong"
				},
				{
					"description" : "The county elections clerk",
					"sceneDestination" : "screen_19_wrong"
				},
				{
					"description" : "Community organizations",
					"sceneDestination" : "screen_19_right"
				},
		]
	
	},

	{ 
		"name": "screen_19_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "March 2021", // Date for Month
		"campaign_month_count" : 11, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_20"
				}
		]
	
	},

	{ 
		"name": "screen_19_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "March 2021", // Date for Month
		"campaign_month_count" : 11, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_20"
				}
		]
	
	},

	{ 
		"name": "screen_20",
		"question" : `You’re checking out books at the Springfield Library when the librarian asks what sorts of things you’re doing in this final month of the election. You pause for a moment, uncertain. What SHOULD you be doing in the final month of the election?`,
		"current_date" : "April 2021", // Date for Month
		"campaign_month_count" : 12, // Counter for Budget
		"choices" : [
				{
					"description" : "Fundraise as much as possible",
					"sceneDestination" : "screen_20_wrong"
				},
				{
					"description" : "GOTV (Get out the vote)",
					"sceneDestination" : "screen_20_right"
				},
				{
					"description" : "Recruit more volunteers",
					"sceneDestination" : "screen_20_wrong"
				},
				{
					"description" : "Issue policy statements",
					"sceneDestination" : "screen_20_wrong"
				},
		]
	
	},

	{ 
		"name": "screen_20_right",
		"question" : `Heather responds with, “Yes! This is exactly what I would suggest!”`,
		"current_date" : "April 2021", // Date for Month
		"campaign_month_count" : 12, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_21"
				}
		]
	
	},
	
	{ 
		"name": "screen_20_wrong",
		"question" : `Heather responds with “That isn't what I'd do. But I guess you could try it and see what happens."`,
		"current_date" : "April 2021", // Date for Month
		"campaign_month_count" : 12, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_21"
				}
		]
	
	},

	{ 
		"name": "screen_21",
		"question" : `Election Day is tomorrow morning, and there’s not much more you can do to support your candidacy. In a rare bit of quiet, you realize how much of a toll this campaign has taken on everyone you love and everyone who has helped you. What can you do to start to make amends and repair your relationships?`,
		"current_date" : "May 2021", // Date for Month
		"campaign_month_count" : 13, // Counter for Budget
		"choices" : [
				{
					"description" : "Show gratitude to your volunteers by giving them all hugs",
					"sceneDestination" : "screen_22"
				},
				{
					"description" : "Let your staff know they will get a Win Bonus whether or not you win",
					"sceneDestination" : "screen_22"
				},
				{
					"description" : "Thank your donors for believing in you",
					"sceneDestination" : "screen_22"
				},
				{
					"description" : "Thank your family and friends for putting up with you while you were being absent",
					"sceneDestination" : "screen_22"
				}
		]
	
	},
	
	{
		"name": "screen_22",
		"question" : `You’re at Roaring Rapids on a warm spring evening and it’s election night. It’s been one year of hard work and you’re looking forward to the ending, win or lose. Your family, staff, volunteers, friends, and donors are all with you, enjoying pizza and waiting for the election results to come in….`,
		"current_date" : "May 2021", // Date for Month
		"campaign_month_count" : 13, // Counter for Budget
		"choices" : [
				{
					"description" : "Win",
					"sceneDestination" : "screen_23"
				},
				{
					"description" : "Lose",
					"sceneDestination" : "screen_24"
				}
		]
	},
	
	{
		"name": "screen_24",
		"question" : `It’s Wednesday morning at the Washburne and you’re getting ready to see Heather for a cup of coffee before work. You feel that you may have let her down. When Heather gets to the table she gives you a big hug and says, “You ran such a great campaign! One thing I didn’t tell you because I didn’t want to scare you: I served two terms on the school board, and it was great. But I also ran two times before and lost. Your next campaign will be so much better!”`,
		"current_date" : "May 2021", // Date for Month
		"campaign_month_count" : 13, // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "credits"
				}
		]
	},
	{
		"name": "credits",
		"question" : ``,
		"current_date" : "H4C 42", // Date for Month
		"campaign_month_count" : 1,
		"img" : "Credits.png", // Counter for Budget
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "start"
				}
		]
	},

	{
		"name": "screen_25",
		"question" : `Game Over
		We created this game at Hack For A Cause 2019. The intention of this game is to inspire and help get some new faces in office. We hope you enjoyed playing the game. 		
		Thanks!
		`,
		"current_date" : "", // Date for Month
		"campaign_month_count" : "", // Counter for Budget
		"choices" : [
				{
					"description" : "Play Again",
					"sceneDestination" : "start"
				}
		]
	}

];
export default Scenes;