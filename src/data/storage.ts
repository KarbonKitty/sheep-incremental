import IStorageTemplate from "../classes/storage/IStorageTemplate";
import IStorageState from "../classes/storage/IStorageState";

type StorageData = {
    template: IStorageTemplate,
    startingState: IStorageState
}

let storages: StorageData[] = [
    {
        template: {
            id: 'shed',
            type: 'storage',
            name: "Shed",
            desc: "Barely more than a stack of sticks itself, but sheep can store some excess material here.",
            branch: "construction",
            rawCost: { wood: 20 },
            storage: { wood: 50, flint: 50, "stone tools": 20, "mud bricks": 10 },
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: []
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
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: []
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
            buyVerb: "Buy"
        },
        startingState: {
            quantity: 0,
            locks: ['agriculture']
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
            buyVerb: "Buy"
        }, startingState:
            {
                quantity: 0,
                locks: ['stone-tools']
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
            buyVerb: "Build"
        },
        startingState: {
            quantity: 0,
            locks: ['hunting']
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
            buyVerb: "Craft"
        },
        startingState: {
            quantity: 0,
            locks: ['fermentation']
        }
    }
]

export default storages;