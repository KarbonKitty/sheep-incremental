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
            rawCost: { wood: 20 },
            storage: [{ currency: "wood", amount: 50 }, { currency: "flint", amount: 50 }, { currency: "stone tools", amount: 10 }, { currency: "mud bricks", amount: 10 }],
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
            rawCost: { wood: 15 },
            storage: [{ currency: "herbs", amount: 150 }],
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
            rawCost: { "stone tools": 1, "mud bricks": 20 },
            storage: [{ currency: "grain", amount: 100 }],
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
            rawCost: { wood: 50, "stone tools": 1 },
            storage: [{ currency: "water", amount: 200 }],
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
            rawCost: { wood: 30, "mud bricks": 15 },
            storage: [{ currency: "flour", amount: 30 }, { currency: "bread", amount: 10 }, { currency: "meat", amount: 30 }],
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
            rawCost: { wood: 15 },
            storage: [{ currency: "beer", amount: 5 }],
            buyVerb: "Craft"
        },
        startingState: {
            quantity: 0,
            locks: ['fermentation']
        }
    }
]

export default storages;