import IStorageState from "../classes/storage/IStorageState";
import IStorageTemplate from "../classes/storage/IStorageTemplate";

type StorageData = {
    template: IStorageTemplate,
    startingState: IStorageState
};

const storages: StorageData[] = [
    {
        template: {
            id: 'shed',
            type: 'storage',
            name: "Shed",
            desc: "Barely more than a stack of sticks itself, but sheep can store some excess material here.",
            branch: "construction",
            rawCost: { wood: 20 },
            storage: { wood: 50, flint: 50, "stone tools": 10, "mud bricks": 10, charcoal: 15, pottery: 15 },
            buyVerb: "Build",
            originalLocks: []
        },
        startingState: {
            quantity: 0,
        }
    },
    {
        template: {
            id: 'herb-storage',
            type: 'storage',
            name: "Herb rack",
            desc: "Shoddy wooden rack to keep more herbs on it.",
            branch: "herbs",
            rawCost: { wood: 15 },
            storage: { herbs: 150 },
            buyVerb: "Build",
            originalLocks: []
        },
        startingState: {
            quantity: 0
        }
    },
    {
        template: {
            id: 'wheat-silo',
            type: 'storage',
            name: "Grain silo",
            desc: "A place to store the grain gathered from the fields.",
            branch: "bread",
            rawCost: { "stone tools": 1, "mud bricks": 20 },
            storage: { grain: 100 },
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
            rawCost: { wood: 50, "stone tools": 1 },
            storage: { water: 200 },
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
            rawCost: { wood: 30, "mud bricks": 15 },
            storage: { flour: 30, bread: 15, meat: 30 },
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
            rawCost: { wood: 15 },
            storage: { beer: 5 },
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
            rawCost: { "stone tools": 1, pottery: 15 },
            storage: { bread: 5, meat: 15, beer: 10, flour: 15 },
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
            rawCost: { stone: 50, "stone tools": 1 },
            storage: { clay: 100, stone: 75, "stone tools": 10, "mud bricks": 15 },
            buyVerb: "Fence",
            originalLocks: ['pyrotechnology']
        },
        startingState: {
            quantity: 0,
        }
    }
];

export default storages;
