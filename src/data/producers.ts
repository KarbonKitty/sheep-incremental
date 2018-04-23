import IProducer from "../classes/IProducer";

export let producersData: IProducer[] = [
    {
        name: "Wheat field",
        desc: "This is the beginning of an agricultural empire, the greatest empire that the man ever saw!",
        id: 'wheat-field',
        cost: [{ currency: "cash", amount: 50 }],
        production: [{ currency: "wheat", amount: 3 }],
        consumption: [],
        quantity: 0,
        visible: true,
        buyVerb: "Buy"
    },
    {
        name: "Wheat seller",
        desc: "Well, one needs to do something with all that wheat...",
        id: 'wheat-seller',
        cost: [{ currency: "cash", amount: 25 }],
        consumption: [{currency: "wheat", amount: 1}],
        production: [{ currency: "cash", amount: 1 }],
        quantity: 0,
        visible: true,
        buyVerb: "Recruit"
    },
    {
        name: "Mill",
        desc: "Test producer 2",
        id: 'mill',
        cost: [{ currency: "cash", amount: 100 }, { currency: "wheat", amount: 100 }],
        production: [{ currency: "cash", amount: 10 }],
        consumption: [{ currency: "wheat", amount: 5 }],
        quantity: 0,
        visible: false,
        buyVerb: "Build"
    }];