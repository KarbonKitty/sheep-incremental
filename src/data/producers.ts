import IProducerTemplate from "../classes/producer/IProducerTemplate";
import IProducerState from "../classes/producer/IProducerState";

type ProducerData = {
    template: IProducerTemplate,
    startingState: IProducerState
}

let producersData: ProducerData[] = [
    {
        template: {
            id: 'herbs-gatherer',
            type: 'producer',
            name: "Herb gatherer",
            desc: "Little sheep collecting herbs and flowers for the tribe.",
            rawCost: [{ currency: "cash", amount: 25 }],
            production: [{ currency: "cash", amount: 1 }],
            consumption: [],
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 1,
            locks: []
        }
    },
    {
        template: {
            id: 'wood-gatherer',
            type: 'producer',
            name: "Wood gatherer",
            desc: "What do you get when you combine sheep and forest? Sheep and sticks.",
            rawCost: [{ currency: "cash", amount: 30 }],
            production: [{ currency: "wood", amount: 1 }],
            consumption: [{ currency: "cash", amount: 0.25 }],
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: []
        }
    },
    {
        template: {
            id: 'flint-gatherer',
            type: 'producer',
            name: "Flint gatherer",
            desc: "Flint is a rock that can be easily broken to produce a sharp edge. Very useful to any tribe.",
            rawCost: [{ currency: "cash", amount: 45 }],
            production: [{ currency: "flint", amount: 0.5 }],
            consumption: [{ currency: "cash", amount: 0.25 }],
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: []
        }
    },
    {
        template: {
            id: 'herb-garden',
            type: 'producer',
            name: "Herb garden",
            desc: "Give that little sheep a sturdy hoe, and you are gonna get way more herbs.",
            rawCost: [{ currency: "cash", amount: 100 }, { currency: "stone-tools", amount: 3 }],
            production: [{ currency: "cash", amount: 3 }],
            consumption: [{ currency: "stone-tools", amount: 0.01 }],
            buyVerb: "Plant"
        },
        startingState: {
            quantity: 0,
            locks: ['stone-tools']
        }
    },
    {
        template: {
            id: 'wheat-field',
            type: 'producer',
            name: "Grain field",
            desc: "This is the beginning of an agricultural empire, the greatest empire that the man ever saw!",
            rawCost: [{ currency: "cash", amount: 50 }],
            production: [{ currency: "grain", amount: 3 }],
            consumption: [],
            buyVerb: "Buy"
        },
        startingState: {
            quantity: 0,
            locks: ['agriculture']
        }
    },
    {
        template: {
            id: 'wheat-seller',
            type: 'producer',
            name: "Grain seller",
            desc: "Well, one needs to do something with all that wheat...",
            rawCost: [{ currency: "cash", amount: 25 }],
            consumption: [{ currency: "grain", amount: 1 }],
            production: [{ currency: "cash", amount: 1 }],
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: ['__impossible__']
        }
    },
    {
        template: {
            id: 'flint-knapper',
            type: 'producer',
            name: "Flint knapper",
            desc: "Sheep with good manual dexterity who can produce stone tools.",
            rawCost: [{ currency: "cash", amount: 100 }, { currency: "flint", amount: 10 }, { currency: "wood", amount: 10 }],
            consumption: [{ currency: "cash", amount: 2 }, { currency: "flint", amount: 2 }, { currency: "wood", amount: 1 }],
            production: [{ currency: "stone-tools", amount: 0.05 }],
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: ['stone-tools']
        }
    },
    {
        template: {
            id: 'wood-cutter',
            type: 'producer',
            name: "Wood cutter",
            desc: "Sheep + forest + axe = more sticks.",
            rawCost: [{ currency: "cash", amount: 125 }, { currency: "stone-tools", amount: 1 }],
            consumption: [{ currency: "cash", amount: 1 }, { currency: "stone-tools", amount: 0.02 }],
            production: [{ currency: "wood", amount: 4 }],
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: ['stone-tools']
        }
    },
    {
        template: {
            id: 'mill',
            type: 'producer',
            name: "Quern",
            desc: "Two simple stones, but good enough to make flour out of wheat",
            rawCost: [{ currency: "cash", amount: 100 }, { currency: "grain", amount: 100 }],
            production: [{ currency: "flour", amount: 2 }],
            consumption: [{ currency: "grain", amount: 5 }],
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: ['flour']
        }
    },
    {
        template: {
            id: 'bread-oven',
            type: 'producer',
            name: "Bread oven",
            desc: "A high-temperature oven made out of stone, heated with wood. Used to bake bread.",
            rawCost: [{ currency: "cash", amount: 300 }, { currency: "flour", amount: 100 }],
            production: [{ currency: "bread", amount: 1 }],
            consumption: [{ currency: "flour", amount: 2 }, { currency: "water", amount: 5 }],
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: ['bread']
        }
    },
    {
        template: {
            id: 'well',
            type: 'producer',
            name: "Well",
            desc: "Deep hole in the ground that fills with water on its own.",
            rawCost: [{ currency: "cash", amount: 50 }],
            production: [{ currency: "water", amount: 3 }],
            consumption: [],
            buyVerb: "Dig"
        }, startingState: {
            quantity: 0,
            locks: ['stone-tools']
        }
    },
    {
        template: {
            id: 'bread-seller',
            type: 'producer',
            name: "Bread merchant",
            desc: "While selling wheat or flour is nice, selling ready-made bread is a more surefire way to earn reasonable amount of money.",
            rawCost: [{ currency: "cash", amount: 100 }, { currency: "bread", amount: 30 }],
            production: [{ currency: "cash", amount: 4 }],
            consumption: [{ currency: "bread", amount: 1 }],
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: ['bread', '__impossible__']
        }
    }
];

export default producersData;
