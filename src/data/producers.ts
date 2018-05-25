import IProducerState from "../classes/producer/IProducerState";
import IProducerTemplate from "../classes/producer/IProducerTemplate";

type ProducerData = {
    template: IProducerTemplate,
    startingState: IProducerState
};

const producersData: ProducerData[] = [
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
            buyVerb: "Recruit",
            originalLocks: []
        },
        startingState: {
            quantity: 1
        }
    },
    {
        template: {
            id: 'wood-gatherer',
            type: 'producer',
            name: "Wood gatherer",
            desc: "What do you get when you combine sheep and forest? Sheep and sticks.",
            branch: "construction",
            rawCost: { herbs: 30 },
            rawProduction: { wood: 1 },
            rawConsumption: { herbs: 0.25 },
            buyVerb: "Recruit",
            originalLocks: []
        },
        startingState: {
            quantity: 0
        }
    },
    {
        template: {
            id: 'flint-gatherer',
            type: 'producer',
            name: "Flint gatherer",
            desc: "Flint is a rock that can be easily broken to produce a sharp edge. Very useful to any tribe.",
            branch: "construction",
            rawCost: { herbs: 25 },
            rawProduction: { flint: 0.5 },
            rawConsumption: { herbs: 0.25 },
            buyVerb: "Recruit",
            originalLocks: []
        },
        startingState: {
            quantity: 0
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
            buyVerb: "Plant",
            originalLocks: ['stone-tools']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'wheat-field',
            type: 'producer',
            name: "Grain field",
            desc: "This is the beginning of an agricultural empire, the greatest empire that the sheep ever saw!",
            branch: "bread",
            rawCost: { "stone tools": 2, herbs: 50 },
            rawProduction: { grain: 3 },
            rawConsumption: {},
            buyVerb: "Buy",
            originalLocks: ['agriculture']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'flint-knapper',
            type: 'producer',
            name: "Flint knapper",
            desc: "Sheep with good manual dexterity can produce stone tools - just deliver flint and some sticks.",
            branch: "construction",
            rawCost: { herbs: 100, flint: 10, wood: 10 },
            rawConsumption: { herbs: 1, flint: 2, wood: 1 },
            rawProduction: { "stone tools": 0.1 },
            buyVerb: "Recruit",
            originalLocks: ['stone-tools']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'wood-cutter',
            type: 'producer',
            name: "Wood cutter",
            desc: "Sheep + forest + axe = more sticks.",
            branch: "construction",
            rawCost: { herbs: 125, "stone tools": 2 },
            rawConsumption: { herbs: 1, "stone tools": 0.04 },
            rawProduction: { wood: 4 },
            buyVerb: "Recruit",
            originalLocks: ['stone-tools']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'mill',
            type: 'producer',
            name: "Quern",
            desc: "Two simple stones, but good enough to make flour out of wheat",
            branch: "bread",
            rawCost: { herbs: 50, grain: 50, "stone tools": 1 },
            rawProduction: { flour: 1.5 },
            rawConsumption: { grain: 5 },
            buyVerb: "Build",
            originalLocks: ['flour']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'brewing-kettle',
            type: 'producer',
            name: "Brewing kettle",
            desc: "Wooden vessel meant to produce beer",
            branch: "beer",
            rawCost: { wood: 40, grain: 50, water: 50 },
            rawConsumption: { grain: 5, water: 5 },
            rawProduction: { beer: 1 },
            buyVerb: "Build",
            originalLocks: ['fermentation']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'bread-oven',
            type: 'producer',
            name: "Bread oven",
            desc: "Simple earth oven used to bake bread.",
            branch: "bread",
            rawCost: { herbs: 200, flour: 100, water: 100 },
            rawProduction: { bread: 0.5 },
            rawConsumption: { flour: 2, water: 5 },
            buyVerb: "Build",
            originalLocks: ['fire', 'flour']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'well',
            type: 'producer',
            name: "Well",
            desc: "Deep hole in the ground that fills with water on its own.",
            branch: "beer",
            rawCost: { "stone tools": 2, wood: 25 },
            rawProduction: { water: 3 },
            rawConsumption: {},
            buyVerb: "Dig",
            originalLocks: ['stone-tools']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'mud-brick-maker',
            type: 'producer',
            name: "Mud brick maker",
            desc: "Sheep that makes simple bricks out of sun-dried mud",
            branch: "construction",
            rawCost: { herbs: 50, "stone tools": 2 },
            rawConsumption: { wood: 0.5, "stone tools": 0.01 },
            rawProduction: { "mud bricks": 0.3 },
            buyVerb: "Recruit",
            originalLocks: ['stone-tools']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'hunter',
            type: 'producer',
            name: "Hunter",
            desc: "Well armed sheep that hunts animals for their meat.",
            branch: "hunting",
            rawCost: { "stone tools": 1, herbs: 50 },
            rawConsumption: { "stone tools": 0.03, herbs: 0.25 },
            rawProduction: { "raw meat": 0.6 },
            buyVerb: "Recruit",
            originalLocks: ['hunting']
        },
        startingState: {
            quantity: 0,
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
            buyVerb: "Build",
            originalLocks: ['hunting']
        },
        startingState: {
            quantity: 0,
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
            buyVerb: "Build",
            originalLocks: ['hunting', 'fire']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'clay-digger',
            type: 'producer',
            name: "Clay digger",
            desc: "Large hole by the water, where the sheep are toiling away digging the clay from the earth.",
            branch: "construction",
            rawCost: { "stone tools": 3, herbs: 50 },
            rawConsumption: { "stone tools": 0.1 },
            rawProduction: { "clay": 2 },
            buyVerb: "Dig",
            originalLocks: ['pyrotechnology']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'pottery-fire-pit',
            type: 'producer',
            name: "Fire pit",
            desc: "Large hole where the simple clay vessels can be put alongside wood to be baked.",
            branch: "pottery",
            rawCost: { "stone tools": 3 },
            rawConsumption: { clay: 3, wood: 3 },
            rawProduction: { pottery: 0.5 },
            buyVerb: "Dig",
            originalLocks: ['pyrotechnology', 'fire', 'pottery']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'charcoal-burner',
            type: 'producer',
            name: "Charcoal burner",
            desc: "There are sheep in the woods with wool always black, covered in soot. They are burning wood to producer charcoal.",
            branch: "pottery",
            rawCost: { wood: 50 },
            rawConsumption: { wood: 4.5 },
            rawProduction: { charcoal: 1 },
            buyVerb: "Recruit",
            originalLocks: ['pyrotechnology', 'fire']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'stone-gatherer',
            type: 'producer',
            name: "Stone gatherer",
            desc: "Some of the building require something non-flammable and harder than mud bricks. Those sheep collect stones for use in such buildings.",
            branch: "construction",
            rawCost: { herbs: 50 },
            rawConsumption: { herbs: 0.25 },
            rawProduction: { stone: 1 },
            buyVerb: "Recruit",
            originalLocks: ['pyrotechnology', 'fire']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'stone-kiln',
            type: 'producer',
            name: "Stone pottery kiln",
            desc: "Primitive kiln used for baking simple pottery. Much more efficient use of fuel than a simple burning pit.",
            branch: "pottery",
            rawCost: { stone: 100, charcoal: 10 },
            rawConsumption: { clay: 7.5, charcoal: 1 },
            rawProduction: { pottery: 1.25 },
            buyVerb: "Build",
            originalLocks: ['pyrotechnology', 'pottery', 'fire']
        },
        startingState: {
            quantity: 0,
        }
    }
];

export default producersData;
