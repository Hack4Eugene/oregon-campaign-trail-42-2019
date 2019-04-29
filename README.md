# Oregon Campaign Trail
>The goal of this project is to gamify learning about how to run a local level political campaign.  
>The campaign in its current state is the Springfield, OR school board campaign.
>This was initially created during a 2 1/2 day hackathon in Eugene OR called Hack 4 a cause
### Developer Information
>Setup : in the project folder run npm update to grab all the correct modules - if you have any errors/problems delete the node_modules folder and 
>*run npm update*
>To pack a copy for distribution - this will build a production copy in the ./dist folder - make sure to grab the index.html from the root folder
>* run npm webpack*
>To change slides edit the *src/scenes.js * then run the *run npm webpack*
>>~~~~{   
		"name": "screen_4",
		"question" : `After the meeting, your friend Heather, a former school board member, says, "Hey, you should run. Have you thought about it?" 

		“I wouldn’t even know where to start--these people seem like they’ve been doing this their whole lives.”

		“Let’s have coffee in May,” Heather says. “I was on the school board a few years ago, and I can help you get started.”`,

		"current_date" : "April 2020", 
		"campaign_month_count" : 0,
		"img" : "Animation_Heather_Walking.gif",
		"choices" : [
				{
					"description" : "Continue",
					"sceneDestination" : "screen_5"
				}
		]
	},
~~~~

>The limit is 5 choices - if you exceed this it will not be clickable
>The description is the text that will show on the choice, the sceneDestination is which slide to goto next - so a sceneDestination of "start" would send you back to the beginning of the game.
>The img is which image to show on the left (optional).


