import IProducerTemplate from "../classes/producer/IProducerTemplate";

export let producersData: IProducerTemplate[] = [
    {
        id: 'wheat-field',
        type: 'producer',
        name: "Wheat field",
        desc: "This is the beginning of an agricultural empire, the greatest empire that the man ever saw!",
        rawCost: [{ currency: "cash", amount: 50 }],
        production: [{ currency: "wheat", amount: 3 }],
        consumption: [],
        locks: [],
        buyVerb: "Buy"
    },
    {
        id: 'wheat-seller',
        type: 'producer',
        name: "Wheat seller",
        desc: "Well, one needs to do something with all that wheat...",
        rawCost: [{ currency: "cash", amount: 25 }],
        consumption: [{currency: "wheat", amount: 1}],
        production: [{ currency: "cash", amount: 1 }],
        locks: [],
        buyVerb: "Recruit"
    },
    {
        id: 'mill',
        type: 'producer',
        name: "Mill",
        desc: "Test producer 2",
        rawCost: [{ currency: "cash", amount: 100 }, { currency: "wheat", amount: 100 }],
        production: [{ currency: "cash", amount: 10 }],
        consumption: [{ currency: "wheat", amount: 5 }],
        locks: [ 'flour' ],
        buyVerb: "Build"
    }];