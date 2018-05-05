import IStorageTemplate from "../classes/storage/IStorageTemplate";
import IStorageState from "../classes/storage/IStorageState";

type StorageData = {
    template: IStorageTemplate,
    startingState: IStorageState
}

let storages: StorageData[] = [
    {
        template: {
            id: 'wheat-silo',
            type: 'storage',
            name: "Wheat silo",
            desc: "A place to store the wheat",
            rawCost: [{ currency: "cash", amount: 50 }],
            storage: [{ currency: "wheat", amount: 100 }],
            buyVerb: "Buy"
        },
        startingState: {
            quantity: 0,
            locks: []
        }
    },
    {
        template: {
            id: 'water-tank',
            type: 'storage',
            name: "Water tank",
            desc: "Large cistern that can store some water for later use",
            rawCost: [{ currency: "cash", amount: 100 }],
            storage: [{ currency: "water", amount: 200 }],
            buyVerb: "Buy"
        }, startingState:
            {
                quantity: 0,
                locks: []
            }
    },
    {
        template: {
            id: 'flour-bag',
            type: 'storage',
            name: "Flour bag",
            desc: "Bag which can be filled with flour",
            rawCost: [{ currency: "cash", amount: 10 }],
            storage: [{ currency: "flour", amount: 10 }],
            buyVerb: "Buy"
        },
        startingState: {
            quantity: 0,
            locks: ['flour']
        }
    },
    {
        template: {
            id: 'bread-storage',
            type: 'storage',
            name: "Bread warehouse",
            desc: "Room with well-ventilated shelves to store bread.",
            rawCost: [{ currency: "cash", amount: 150 }],
            storage: [{ currency: "bread", amount: 15 }],
            buyVerb: "Buy"
        },
        startingState: {
            quantity: 0,
            locks: ['bread']
        }
    }
]

export default storages;