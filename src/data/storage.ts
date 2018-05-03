import IStorageTemplate from "../classes/storage/IStorageTemplate";

let storages: IStorageTemplate[] = [
    {
        id: 'wheat-silo',
        type: 'storage',
        name: "Wheat silo",
        desc: "A place to store the wheat",
        rawCost: [{ currency: "cash", amount: 50 }],
        storage: [{ currency: "wheat", amount: 100 }],
        locks: [],
        buyVerb: "Buy"
    }
  ]

export default storages;