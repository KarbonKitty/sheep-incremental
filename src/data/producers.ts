import IProducer from "../classes/IProducer";

export let producersData: IProducer[] = [
    {
        name: "Wheat seller",
        desc: "Test seller",
        id: 'wheat-seller',
        cost: [{ currency: "cash", amount: 25 }],
        consumption: [{currency: "wheat", amount: 1}],
        production: [{ currency: "cash", amount: 1 }],
        quantity: 0,
        visible: true,
        tooltip: "",
        buyVerb: "Recruit"
    },
    {
        name: "Wheat field",
        desc: "Test producer",
        id: 'wheat-field',
        cost: [{ currency: "cash", amount: 50 }],
        production: [{ currency: "wheat", amount: 3 }],
        consumption: [],
        quantity: 1,
        visible: true,
        tooltip: "",
        buyVerb: "Buy"
    },
    {
        name: "Mill",
        desc: "Test producer 2",
        id: 'mill',
        cost: [{ currency: "cash", amount: 100 }, { currency: "wheat", amount: 100 }],
        production: [{ currency: "cash", amount: 10 }],
        consumption: [{ currency: "wheat", amount: 5 }],
        quantity: 0,
        visible: true,
        tooltip: "",
        buyVerb: "Build"
    }];