const HARRY = 1;
const EUGENE = 2;

export const foyerIntroDialogue = [
    { 
        speaker: HARRY,
        line: "Oh, hello.",
        anim: 'popup',
        delay: 0.7
    },
    { 
        line: "Welcome to the Small Hassles Court, where we give small problems the attention they deserve.",
    },
    {
        line: "I am Harry, and for me, even small issues feel big because I am quite small.",
    },
    {
        line: "Therefore, I am familiar with all kinds of small hassles and will guide you through your journey today."
    },
    {
        line: "First, let's look at a bit of paperwork and select your avatar for the proceedings.",
        sceneAdvance: true
    }
];

export const foyerEndDialogue = [
    {
        speaker: HARRY,
        line: "Click on me for a tour, or if you are ready to join someone to work through a hassle, click the elevator.",
        sceneAdvance: true
    }
];

export const commonGroundEndAgreeDialogue = [
    {
        speaker: HARRY,
        line: "Looks like you came to an agreement.",
    },
    {
        random: true,
        options: [
            "Reminds me of when my band Slaying Dragons had their first hit collab, Slay, Slay, Slay.",
            "Reminds me of when I found my missing quill in a teapot.",
            "Reminds me of solving the court mice cheese dispute with the Cheese Distribution Act of 1256."
        ]
    },
    {
        line: "Well done!",
        sceneAdvance: true,
        waitLine: "Waiting for [other]..."
    }
];

const negativeEnding = [
    {
        speaker: HARRY,
        line: "Sometimes moving through a hassle can take a few tries.",
    },
    {
        random: true,
        options: [
            "I once spent a decade trying to untangle a single shoelace. Then I realised it wasn't even my shoe.",
            "I still don’t know where that buzzing is coming from.",
            "I still cannot breathe fire, but I practice my puffs every day.",
            "I once spent 65 years trying to close a jammed drawer.",
            "It once took me two centuries to stop a door from squeaking. Now it putters.",
            "I spent a full millennium attempting to fold a fitted bedsheet properly.",
            "Between 1055 and 1307, I only grew a tenth of an inch. Must have been the weather."
        ]
    },
]

export const courtTryAgainDialogue = [
    ...negativeEnding,
    {
        line: "Let's take a breath and open the tapestry again.",
        sceneAdvance: true,
        local: true,
        nextScene: 'tapestrySelect'
    }
];

export const courtEndNoAgreeDialogue = [
    ...negativeEnding,
    {
        line: "Sometimes resolutions take time. But you succeeded in talking to each other, and that is most important.",
        sceneAdvance: true,
        waitLine: "Waiting for [other]..."
    }
];

export const tourFoyerDialogue = [
    { 
        speaker: HARRY,
        line: "Let me show you around. I’m just on my way to a case. Follow me.",
        anim: 'popup',
        delay: 0.5
    },
    { 
        line: "To start a two-player session, you click on the elevator.",
        sceneAdvance: true
    }
];

export const tourElevatorDialogue = [
    {
        speaker: HARRY,
        line: "In the elevator, you meet the other player’s avatar. It shows you how they feel entering the session.",
    },
    {
        line: "This is my cousin Eugene. He doesn’t always look like this. But he’s fired up, apparently."
    },
    {
        speaker: EUGENE,
        line: "I don’t even know what this is about, Harry.",
    },
    {
        speaker: HARRY,
        line: "Well, this is what the elevator buttons are for. Click the button pad.",
        sceneAdvance: true
        // speaker switches back to Harry. The "Click me" state of the elevator pad will appear here.
        // Clicking on elevator pad will progress scene to the Elevator tag view.
    }
];

export const tourTagboardDialogue = [
    {
        speaker: HARRY,
        line: "You each select three buttons which represent what you think this conflict is about.",
        delay: 1
    },
    {
        line: "One of you may think this is about trust, while the other thinks this is about toilet paper. ",
    },
    {
        line: "The buttons help you understand whether you are starting on a similar page or not.",
    },
    {
        line: "When you enter the Court, you will be able to see both your own and the other player’s selection."
    },
    {
        line: "I brought Eugene here because he has been using my scales as coasters on his work desk."
    },
    {
        line: "I think that’s disrespectful and also annoying. I am picking Privacy, Boundaries, and Respect.",
        sceneAdvance: true
        // Dialogue button changes to "OK" and then displays the elevator tags where Privacy, Boundaries, and Respect are selected.
        // User can now hit "Next".
        // Scene advances to Inside Medieval Court.
    }
];

export const tourCourtDialogue = [
    {
        speaker: HARRY,
        line: "This is the Medieval Court, one of our many courtrooms.",
    },
    {
        line: "We also have a Basketball Court and a Food Court, in case you get hungry later."
    },
    {
        line: "Eugene selected Freedom, Space, and Communication. Looks like we’re not on the same page at all."
    },
    {
        line: "But that’s okay. We’re here to understand each other better."
    },
    {
        line: "To start, you both take a seat at the table. Let me grab it really quick.",
        sceneAdvance: true
    },
    {
        line: "Now, we open the tapestry. The tapestry will ask you to state, in your own words, what the issue is about.",
        // After player closes dialogue, tapestry activates and says "Click me"
        // Scene advances into the tapestry
        // Tapestry shows Opening Statements
        // Tapestry shows Opening Statements with Harry's response typed into the screen
        // User hits Next, proceeds to show both players' Opening Statements
        sceneAdvance: true
    }
];

export const tourTapestryDialogue = [
    {
        speaker: HARRY,
        line: "Hey, Eugene! You know that the Small Hassles Court is not a space to insult others!",
        delay: 1
    },
    {
        line: "We’re here to understand each other, not make things worse."
    },
    {
        speaker: EUGENE,
        line: "I’m sorry."
    },
    {
        speaker: HARRY,
        line: "It’s okay. We can all get carried away, but it’s good to recognize when you’ve hurt someone else’s feelings."
    },
    {
        line: "Once you’ve both stated what you think the issue is, click next to move onto the next prompt."
    }
];

export const tourAssumptionsDialogue = [
    {
        speaker: HARRY,
        line: "This prompt is about assumptions. I do think Eugene has made some assumptions.",
        sceneAdvance: true
        // Progress to the next screen where Harry can input what he sees are assumptions
        // Harry's response gets populated.
        // User submits, screen progresses to Eugene's response
    }
];

export const tourAssumptionsResponseDialogue = [
    {
        speaker: HARRY,
        line: "I don’t know how that’s an assumption, that’s just a fact... but we’re not at the point of discussing yet."
    },
    {
        line: "We’re just trying to establish where we both stand. I’ll send good vibes to keep the peace.",
        sceneAdvance: true
        // Close tapestry and return to Inside Medieval Court.
        // Show Harry and Eugene both with "Good vibes"
    },
    {
        line: "Next, the tapestry is going to give you another a prompt to attempt problem solving."
    },
    {
        line: "It’s okay if you don’t resolve the issue. You can go through multiple rounds of negotiation."
    },
    {
        line: "If none of them work, you can always come back another time and try again."
    },
    {
        line: "Don’t be disheartened if you can’t work things out straight away. Some resolutions need time.",
        sceneAdvance: true
        // After user hits Next in Dialogue Box, Tapestry becomes clickable again.
        // Player opens tapestry and the prompt is Perfect Scenarios.
    }
];

export const tourPerfectScenariosDialogue = [
    {
        speaker: HARRY,
        line: "This is about my perfect scenario. I will use the ad-lib to tell Eugene how I’d like to change this situation.",
        sceneAdvance: true        
        // Harry response to ad-lib populates the fields
        // Player can hit Submit
        // Player sees waiting screen
    }
];

export const tourPerfectScenariosWaitDialogue = [
    {
        speaker: HARRY,
        line: "Now I wait while Eugene reads my proposal. He will be able to accept the proposal, or amend it.",
        sceneAdvance: true
        // Progress to Eugene's response to Harry
    },
    {
        line: "I don’t think he gets my point at all. I’m not being sensitive.",
        delay: 2
    },
    {
        line: "I just don’t want his office to snicker behind my back every time I come to pick him up for pilates class."
    },
    {
        line: "I can accept his proposal, or amend. We’re on very different pages right now, so this may take a while.",
        sceneAdvance: true
    },
    {
        line: "This is my amendment. Let’s give Eugene a moment to review it.",
        sceneAdvance: true,
        // Return player to Inside Medieval Court
    },
    {
        line: "If we don’t resolve our conflict this round, we will revisit our original statements."
    },
    {
        line: "Then, there are up to two more rounds with different prompts to find a compromise, or make concessions."
    },
    {
        line: "I won’t keep you here through all of that, as Eugene can be very stubborn."
    },
    {
        line: "If you take someone to the Small Hassles Court, try and bring time and patience."
    },
    {
        line: "Conflicts take time to resolve, even if they’re small on the surface."
    },
    {
        line: "If you don’t resolve things fully, that’s okay too. This is a space to understand each other better..."
    },
    {
        line: "...and that can happen even if you don’t find a specific solution to a problem."
    },
    {
        line: "Let me show you back to the Foyer while Eugene thinks about his answer.",
        sceneAdvance: true
        // Return player to Lobby Idle State
    }
];