import { sessionId, socket } from "../socket";
import * as lines from "./DialogueLines";

const START_QUEUE = [
    'foyerIntro',
    'conditions',
    'name',
    'avatar',
    'foyerEnd',
    'menuSelect'
]

const TOUR_QUEUE = [
    'tourIntro',
    'tourDoor',
    'tourElevator',
    'tourElevatorPanel',
    'tourIntakeForm',
    'tourIntakeFormSelected',
    'tourCourtIntro',
    'tourCourtTable',
    'tourTapestrySelect',
    'tourOpeningStatements',
    'tourOpeningStatementsReview',
    'tourAssumptions',
    'tourAssumptionsInput',
    'tourAssumptionsResponse',
    'tourPositionFeedback',
    'tourTapestrySelect',
    'tourPerfectScenariosIntro',
    'tourPerfectScenariosFilled',
    'tourPerfectScenariosWaiting',
    'tourPerfectScenariosResponse',
    'tourPerfectScenariosAmend',
    'tourCourtClosing',
    'tourEnd'
];

export let actionQueue = [...START_QUEUE];

export function startTour() {
    actionQueue = [...TOUR_QUEUE];
}

const openingStatementsBlank = {
    roundName: "Opening Statments",
    prompt: "State what you think the issue is in one sentence. Your perspective will be visible to the other player.",
    actionType: ["tourResponse", "tourResponse"],
    responses: [],
    isActive: true,
    stepCount: 0
};

const openingStatementsFilled = {
    ...openingStatementsBlank,
    responses: [
        {
            step: 0,
            player: sessionId,
            content: "You use my scales as coasters on your work desk."
        },
        {
            step: 0,
            content: "This is about Harry being an over-sensitive little baby dragon."
        }
    ],
    isActive: false
};

const assumptionsInit = {
    roundName: "Assumptions",
    prompt: "Read their perspective carefully. Do you think they have made any assumptions or judgments?",
    display: 'otherPlayerInitialResponse',
    actionType: ['tourButtonRow', 'tourButtonRow'],
    actionOptions: ['Yes', 'No'],

    responses: [],
    isActive: true,
    stepCount: 0
};

const assumptionsInput = {
    ...assumptionsInit,
    prompt: "What assumptions or judgments do you think have been made?",
    actionType: ['tourResponse', 'tourResponse']
};

const assumptionsResponses = [{
    step: 0,
    player: sessionId,
    content: { 
        action: 'Yes',
        response: 'You are judging me for being "over-sensitive" and a "baby."'
    }
},
{
    step: 0,
    content: {
        action: 'Yes',
        response: 'You\'re assuming I use your scales as coasters on my work desk.'
    }
}];

const assumptionsResponse = {
    ...assumptionsInit,
    actionType: ['action', 'action'],
    actionOptions: ['Send Good Vibes', 'Say I\'m Sorry'],
    display: 'otherPlayerLastResponse',
    prompt: 'Eugene thinks you made assumptions or judgments. This is their perspective below.',
    responses: assumptionsResponses,
    stepCount: 1
};

const assumptionsEnd = {
    ...assumptionsResponse,
    responses: [...assumptionsResponses, {
        step: 1,
        player: sessionId,
        content: { action: "*Good vibes*" }
    }, {
        step: 1,
        content: { action: "*Good vibes*" }
    }]
};

const perfectScenariosInit = {
    roundName: "Perfect Scenarios",
    prompt: "Knowing both of your positions now, what is your ideal alternative scenario to the described issue?",
    actionAdlib: [
        "I would like",
        "[this to happen]",
        "so that you can",
        "[activity or feeling]",
        "and I can",
        "[activity or feeling]",
        "."
    ],
    actionType: ['tourAdlib', 'tourAdlib'],
    responses: [],
    stepCount: 0
};

const perfectScenariosAdlibFilled = {
    ...perfectScenariosInit,
    actionAdlib: [
        "I would like",
        "you to stop using my scales as coasters",
        "so that you can",
        "be more respectful towards me",
        "and I can",
        "do my work in peace",
        "."
    ],
};

const perfectScenariosWaiting = {
    ...perfectScenariosAdlibFilled,
    actionType: ['wait', 'wait'],
    stepCount: 3
}

const perfectScenariosResponse = {
    ...perfectScenariosInit,
    responses: [{}, {
        step: 1,
        content: {
            adlib: [
                "I would like",
                "you to stop being so sensitive",
                "so that you can",
                "put your cup down without staining the table",
                "and I can",
                "do my work in peace",
                "."
            ]
        }
    }],
    actionType: ['tourAdlibWithActionScreen1', 'tourAdlibWithActionScreen1'],
    actionAdlib: [
        "I would like",
        "you to stop being so sensitive",
        "so that you can",
        "put your cup down without staining the table",
        "and I can",
        "do my work in peace",
        "."
    ],
    actionOptions: [
        "Amend",
        "Agree"
    ],
    stepCount: 2
}

const perfectScenariosAmend = {
    ...perfectScenariosResponse,
    responses: [],
    actionType: ['tourAdlibWithActionScreen2', 'tourAdlibWithActionScreen2'],
    actionAdlib: [
        "I would like",
        "you to use other coasters",
        "so that you can",
        "put your cup down",
        "and I can",
        "be respected in the office",
        "."
    ],
    stepCount: 3
}

export const actions = {
    'foyerIntro': {
        scene: 'foyer',
        dialogueLines: JSON.stringify(lines.foyerIntroDialogue),
        isTour: true
    },
    'foyerEnd': {
        dialogueLines: JSON.stringify(lines.foyerEndDialogue)
    },
    'tourIntro': {
        scene: 'foyer',
        dialogueLines: JSON.stringify(lines.tourFoyerDialogue)
    },
    'tourElevator': {
        scene: 'elevator',
        dialogueLines: JSON.stringify(lines.tourElevatorDialogue),
        player2: {
            avatar: 4,
            name: 'Eugene'
        }
    },
    'tourIntakeForm': {
        dialogueLines: JSON.stringify(lines.tourTagboardDialogue)
    },
    'tourCourtIntro': {
        scene: 'court',
        dialogueLines: JSON.stringify(lines.tourCourtDialogue),
        player1: {
            avatar: 5,
            name: 'Harry',
            tags: `[{ "name": "Privacy", "category": "above" }, { "name": "Boundaries", "category": "above" }, { "name": "Respect", "category": "below" }]`,
            socketId: socket.id
        },
        player2: {
            avatar: 4,
            name: 'Eugene',
            tags: `[{ "name": "Freedom", "category": "below" }, { "name": "Space", "category": "above" }, { "name": "Communication", "category": "below" }]`
        }
    },
    'tourOpeningStatements': {
        scene: 'tapestry',
        roundData: JSON.stringify([openingStatementsBlank]),
        harryResponse: 'You use my scales as coasters on your work desk.'
    },
    'tourOpeningStatementsReview': {
        dialogueLines: JSON.stringify(lines.tourTapestryDialogue),
        roundData: JSON.stringify([openingStatementsFilled])
    },
    'tourAssumptions': {
        dialogueLines: JSON.stringify(lines.tourAssumptionsDialogue),
        roundData: JSON.stringify([openingStatementsFilled, assumptionsInit])
    },
    'tourAssumptionsInput': {
        roundData: JSON.stringify([openingStatementsFilled, assumptionsInput]),
        harryResponse: 'You are judging me for being "over-sensitive" and a "baby."'
    },
    'tourAssumptionsResponse': {
        dialogueLines: JSON.stringify(lines.tourAssumptionsResponseDialogue),
        roundData: JSON.stringify([openingStatementsFilled, assumptionsResponse])
    },
    'tourPositionFeedback': {
        scene: 'court',
        roundData: JSON.stringify([openingStatementsFilled, assumptionsEnd])
    },
    'tourPerfectScenariosIntro': {
        scene: 'tapestry',
        roundData: JSON.stringify([openingStatementsFilled, assumptionsEnd, perfectScenariosInit]),
        dialogueLines: JSON.stringify(lines.tourPerfectScenariosDialogue)
    },
    'tourPerfectScenariosFilled': {
        roundData: JSON.stringify([openingStatementsFilled, assumptionsEnd, perfectScenariosAdlibFilled]),
    },
    'tourPerfectScenariosWaiting': {
        dialogueLines: JSON.stringify(lines.tourPerfectScenariosWaitDialogue),
        roundData: JSON.stringify([openingStatementsFilled, assumptionsEnd, perfectScenariosWaiting]),
    },
    'tourPerfectScenariosResponse': {
        roundData: JSON.stringify([openingStatementsFilled, assumptionsEnd, perfectScenariosResponse])
    },
    'tourPerfectScenariosAmend': {
        roundData: JSON.stringify([openingStatementsFilled, assumptionsEnd, perfectScenariosAmend])
    },
    'tourCourtClosing': {
        scene: 'court'
    },
    'tourEnd': {
        scene: 'foyer'
    }
}

export const nextAction = (gameState) => {
    const action = actionQueue.shift();
    const actionData = actions[action] ?? {};

    return {
        ...gameState,
        currentAction: action,
        ...actionData
    }
}

