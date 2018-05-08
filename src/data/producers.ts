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
            rawCost: [{ currency: "herbs", amount: 25 }],
            production: [{ currency: "herbs", amount: 1 }],
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
            rawCost: [{ currency: "herbs", amount: 30 }],
            production: [{ currency: "wood", amount: 1 }],
            consumption: [{ currency: "herbs", amount: 0.25 }],
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
            rawCost: [{ currency: "herbs", amount: 45 }],
            production: [{ currency: "flint", amount: 0.5 }],
            consumption: [{ currency: "herbs", amount: 0.25 }],
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
            rawCost: [{ currency: "herbs", amount: 100 }, { currency: "stone tools", amount: 3 }],
            production: [{ currency: "herbs", amount: 3 }],
            consumption: [{ currency: "stone tools", amount: 0.01 }],
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
            rawCost: [{ currency: "stone tools", amount: 1 }, { currency: "herbs", amount: 50 }],
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
            rawCost: [{ currency: "herbs", amount: 25 }],
            consumption: [{ currency: "grain", amount: 1 }],
            production: [{ currency: "herbs", amount: 1 }],
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
            rawCost: [{ currency: "herbs", amount: 100 }, { currency: "flint", amount: 10 }, { currency: "wood", amount: 10 }],
            consumption: [{ currency: "herbs", amount: 2 }, { currency: "flint", amount: 2 }, { currency: "wood", amount: 1 }],
            production: [{ currency: "stone tools", amount: 0.05 }],
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
            rawCost: [{ currency: "herbs", amount: 125 }, { currency: "stone tools", amount: 1 }],
            consumption: [{ currency: "herbs", amount: 1 }, { currency: "stone tools", amount: 0.02 }],
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
            rawCost: [{ currency: "herbs", amount: 100 }, { currency: "grain", amount: 100 }, { currency: "stone tools", amount: 1}],
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
            id: 'brewing-kettle',
            type: 'producer',
            name: "Brewing kettle",
            desc: "Wooden vessel meant to produce beer",
            rawCost: [{ currency: "wood", amount: 40 }, { currency: "grain", amount: 50 }, { currency: "water", amount: 50 }],
            consumption: [{ currency: "grain", amount: 5 }, { currency: "water", amount: 5 }],
            production: [{ currency: "beer", amount: 1 }],
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: ['fermentation']
        }
    },
    {
        template: {
            id: 'bread-oven',
            type: 'producer',
            name: "Bread oven",
            desc: "A high-temperature oven made out of stone, heated with wood. Used to bake bread.",
            rawCost: [{ currency: "herbs", amount: 300 }, { currency: "flour", amount: 100 }],
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
            rawCost: [{ currency: "stone tools", amount: 1 }, { currency: "wood", amount: 25 }],
            production: [{ currency: "water", amount: 3 }],
            consumption: [],
            buyVerb: "Dig"
        },
        startingState: {
            quantity: 0,
            locks: ['stone-tools']
        }
    },
    {
        template: {
            id: 'mud-brick-maker',
            type: 'producer',
            name: "Mud brick maker",
            desc: "Sheep that makes simple bricks out of sun-dried mud",
            rawCost: [{ currency: "herbs", amount: 50 }, { currency: "stone tools", amount: 1 }],
            consumption: [{ currency: "wood", amount: 0.5 }, { currency: "stone tools", amount: 0.005 }],
            production: [{ currency: "mud bricks", amount: 0.25 }],
            buyVerb: "Recruit"
        },
        startingState: {
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
            rawCost: [{ currency: "herbs", amount: 100 }, { currency: "bread", amount: 30 }],
            production: [{ currency: "herbs", amount: 4 }],
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
