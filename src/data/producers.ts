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
            branch: "herbs",
            rawCost: { herbs: 20 },
            rawProduction: { herbs: 1 },
            rawConsumption: {},
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
            branch: "building",
            rawCost: { herbs: 30 },
            rawProduction: { wood: 1 },
            rawConsumption: { herbs: 0.25 },
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
            branch: "tools",
            rawCost: { herbs: 25 },
            rawProduction: { flint: 0.5 },
            rawConsumption: { herbs: 0.25 },
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
            branch: "herbs",
            rawCost: { herbs: 100, "stone tools": 3 },
            rawProduction: { herbs: 3 },
            rawConsumption: { "stone tools": 0.02 },
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
            desc: "This is the beginning of an agricultural empire, the greatest empire that the sheep ever saw!",
            branch: "agriculture",
            rawCost: { "stone tools": 2, herbs: 50 },
            rawProduction: { grain: 3 },
            rawConsumption: {},
            buyVerb: "Buy"
        },
        startingState: {
            quantity: 0,
            locks: ['agriculture']
        }
    },
    {
        template: {
            id: 'flint-knapper',
            type: 'producer',
            name: "Flint knapper",
            desc: "Sheep with good manual dexterity can produce stone tools - just deliver flint and some sticks.",
            branch: "tools",
            rawCost: { herbs: 100, flint: 10, wood: 10 },
            rawConsumption: { herbs: 1, flint: 2, wood: 1 },
            rawProduction: { "stone tools": 0.1 },
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
            branch: "building",
            rawCost: { herbs: 125, "stone tools": 2 },
            rawConsumption: { herbs: 1, "stone tools": 0.04 },
            rawProduction: { wood: 4 },
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
            branch: "agriculture",
            rawCost: { herbs: 100, grain: 100, "stone tools": 2 },
            rawProduction: { flour: 2 },
            rawConsumption: { grain: 5 },
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
            branch: "agriculture",
            rawCost: { wood: 40, grain: 50, water: 50 },
            rawConsumption: { grain: 5, water: 5 },
            rawProduction: { beer: 1 },
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
            desc: "Simple earth oven used to bake bread.",
            branch: "agriculture",
            rawCost: { herbs: 300, flour: 100 },
            rawProduction: { bread: 1 },
            rawConsumption: { flour: 2, water: 5 },
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
            branch: "agriculture",
            rawCost: { "stone tools": 2, wood: 25 },
            rawProduction: { water: 3 },
            rawConsumption: {},
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
            branch: "building",
            rawCost: { herbs: 50, "stone tools": 2 },
            rawConsumption: { wood: 0.5, "stone tools": 0.01 },
            rawProduction: { "mud bricks": 0.3 },
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: ['stone-tools']
        }
    },
    {
        template: {
            id: 'hunter',
            type: 'producer',
            name: "Hunter",
            desc: "Well armed sheep that hunts animals for their meat.",
            branch: "hunting",
            rawCost: { "stone tools": 2, herbs: 50 },
            rawConsumption: { "stone tools": 0.05, herbs: 0.25 },
            rawProduction: { "raw meat": 1 },
            buyVerb: "Recruit"
        },
        startingState: {
            quantity: 0,
            locks: ['hunting']
        }
    },
    {
        template: {
            id: 'drying-rack',
            type: 'producer',
            name: "Drying rack",
            desc: "Simple wooden rack for drying meat",
            branch: "hunting",
            rawCost: { wood: 33 },
            rawConsumption: { "raw meat": 1 },
            rawProduction: { meat: 0.25 },
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: ['hunting']
        }
    },
    {
        template: {
            id: 'smoke-house',
            type: 'producer',
            name: "Smoke house",
            desc: "Primitive building of mud bricks, used to smoke meat.",
            branch: "hunting",
            rawCost: { "mud bricks": 40, wood: 35 },
            rawConsumption: { "raw meat": 3, wood: 2 },
            rawProduction: { meat: 1.5 },
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: ['hunting', 'stone-tools']
        }
    }
];

export default producersData;
