import { IBuildingTemplate, IBuildingState } from "../classes/Building";

type BuildingData = {
    template: IBuildingTemplate,
    startingState: IBuildingState
};

const producersData: BuildingData[] = [
    {
        template: {
            id: 'lean-to',
            type: 'building',
            name: "Lean-to",
            desc: "One of the most primitive shelters for sheep, this is a bundle of sticks leaned against a wall, a tree, or some similiar object.",
            branch: "construction",
            rawCost: { wood: 10, territory: 5 },
            housing: 1,
            buyVerb: "Construct",
            originalLocks: []
        },
        startingState: {
            quantity: 2
        }
    },
    {
        template: {
            id: 'wanderer',
            type: 'building',
            name: "Wanderer",
            desc: "Some sheep just can't sit in one place; so you give them a stick and send them forth, to explore new land for the tribe to use.",
            branch: "hunting",
            rawCost: { wood: 5 },
            rawProduction: { territory: 0.25 },
            employees: 1,
            buyVerb: "Send forth",
            originalLocks: []
        },
        startingState: {
            quantity: 1
        }
    },
    {
        template: {
            id: 'shed',
            type: 'storage',
            name: "Shed",
            desc: "Barely more than a stack of sticks itself, but sheep can store some excess material here.",
            branch: "construction",
            rawCost: { wood: 20, territory: 1 },
            rawStorage: { wood: 50, flint: 50, "stone tools": 10, "mud bricks": 10, charcoal: 15, pottery: 15 },
            buyVerb: "Build",
            originalLocks: []
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'wheat-silo',
            type: 'storage',
            name: "Grain silo",
            desc: "A place to store the grain gathered from the fields.",
            branch: "bread",
            rawCost: { "stone tools": 1, "mud bricks": 20, territory: 1 },
            rawStorage: { grain: 100 },
            buyVerb: "Buy",
            originalLocks: ['agriculture']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'water-tank',
            type: 'storage',
            name: "Water tank",
            desc: "Large cistern that can store some water for later use.",
            branch: "beer",
            rawCost: { wood: 50, "stone tools": 1, territory: 1 },
            rawStorage: { water: 200 },
            buyVerb: "Buy",
            originalLocks: ['stone-tools']
        },
        startingState:
        {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'pantry',
            type: 'storage',
            name: "Pantry",
            desc: "Little more than a simple shed, but it can protect food from being eaten by pests too quickly.",
            branch: "bread",
            rawCost: { wood: 30, "mud bricks": 15, territory: 1 },
            rawStorage: { flour: 30, bread: 15, meat: 30 },
            buyVerb: "Build",
            originalLocks: ['hunting']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'beer-cask',
            type: 'storage',
            name: "Beer cask",
            desc: "Very simple cask made out of wood to keep beer.",
            branch: "beer",
            rawCost: { wood: 15, territory: 1 },
            rawStorage: { beer: 5 },
            buyVerb: "Craft",
            originalLocks: ['fermentation']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'cellar',
            type: 'storage',
            name: "Cellar",
            desc: "Underground room used for food storage",
            branch: "bread",
            rawCost: { "stone tools": 1, pottery: 15, territory: 1 },
            rawStorage: { bread: 5, meat: 15, beer: 10, flour: 15 },
            buyVerb: "Dig",
            originalLocks: ['pottery']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'storage-yard',
            type: 'storage',
            name: "Storage yard",
            desc: "Some clear ground with a low fence around. It can be used to easily store a lot of non-perishable materials.",
            branch: "construction",
            rawCost: { stone: 50, "stone tools": 1, territory: 3 },
            rawStorage: { clay: 100, stone: 75, "stone tools": 10, "mud bricks": 15 },
            buyVerb: "Fence",
            originalLocks: ['pyrotechnology']
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'wood-gatherer',
            type: 'producer',
            name: "Wood gatherer",
            desc: "What do you get when you combine sheep and forest? Sheep and sticks.",
            branch: "construction",
            rawCost: { territory: 5 },
            rawProduction: { wood: 1 },
            employees: 1,
            buyVerb: "Recruit",
            originalLocks: []
        },
        startingState: {
            quantity: 1
        }
    },
    {
        template: {
            id: 'flint-gatherer',
            type: 'producer',
            name: "Flint gatherer",
            desc: "Flint is a rock that can be easily broken to produce a sharp edge. Very useful to any tribe.",
            branch: "construction",
            rawCost: { territory: 5 },
            rawProduction: { flint: 0.5 },
            employees: 1,
            buyVerb: "Recruit",
            originalLocks: []
        },
        startingState: {
            quantity: 0
        }
    },
    {
        template: {
            id: 'wheat-field',
            type: 'producer',
            name: "Grain field",
            desc: "This is the beginning of an agricultural empire, the greatest empire that the sheep ever saw!",
            branch: "bread",
            rawCost: { "stone tools": 1, territory: 3 },
            rawProduction: { grain: 3 },
            employees: 1,
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
            rawCost: { flint: 10, wood: 10, territory: 1 },
            rawConsumption: { flint: 2, wood: 1 },
            rawProduction: { "stone tools": 0.1 },
            employees: 1,
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
            rawCost: { "stone tools": 2, territory: 5 },
            rawConsumption: { "stone tools": 0.04 },
            rawProduction: { wood: 4 },
            employees: 1,
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
            rawCost: { grain: 50, "stone tools": 1, territory: 1 },
            rawProduction: { flour: 1.5 },
            rawConsumption: { grain: 5 },
            employees: 1,
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
            rawCost: { wood: 40, grain: 50, water: 50, territory: 1 },
            rawConsumption: { grain: 5, water: 5 },
            rawProduction: { beer: 1 },
            employees: 1,
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
            rawCost: { flour: 100, water: 100, territory: 1 },
            rawProduction: { bread: 0.5 },
            rawConsumption: { flour: 2, water: 5, wood: 3 },
            employees: 1,
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
            rawCost: { "stone tools": 2, wood: 25, territory: 1 },
            rawProduction: { water: 5 },
            employees: 1,
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
            rawCost: { "stone tools": 2, territory: 1 },
            rawConsumption: { wood: 0.5, "stone tools": 0.01 },
            rawProduction: { "mud bricks": 0.3 },
            employees: 1,
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
            desc: "Well armed sheep that hunts animals for their meat. They are known for going beyond the known lands on occasion, too.",
            branch: "hunting",
            rawCost: { "stone tools": 1, territory: 5 },
            rawConsumption: { "stone tools": 0.03 },
            rawProduction: { "raw meat": 0.6, territory: 0.05 },
            employees: 1,
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
            rawCost: { wood: 33, territory: 1 },
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
            rawCost: { "mud bricks": 40, wood: 40, territory: 1 },
            rawConsumption: { "raw meat": 4, wood: 2.5 },
            rawProduction: { meat: 2 },
            employees: 1,
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
            rawCost: { "stone tools": 2, territory: 3 },
            rawConsumption: { "stone tools": 0.1 },
            rawProduction: { "clay": 2 },
            employees: 1,
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
            rawCost: { "stone tools": 3, territory: 3 },
            rawConsumption: { clay: 3, wood: 3 },
            rawProduction: { pottery: 0.5 },
            employees: 1,
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
            rawCost: { wood: 50, territory: 3 },
            rawConsumption: { wood: 4.5 },
            rawProduction: { charcoal: 1 },
            employees: 1,
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
            rawCost: { wood: 10, territory: 5 },
            rawProduction: { stone: 1 },
            employees: 1,
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
            rawCost: { stone: 100, charcoal: 10, territory: 3 },
            rawConsumption: { clay: 7.5, charcoal: 1 },
            rawProduction: { pottery: 1.25 },
            employees: 2,
            buyVerb: "Build",
            originalLocks: ['pyrotechnology', 'pottery', 'fire']
        },
        startingState: {
            quantity: 0,
        }
    }
];

export default producersData;
