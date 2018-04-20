import { IProducer } from "../classes/buyableObject";

export let producersData = <IProducer[]>[
    {
        name: "Coal mine",
        desc: "Test producer",
        id: 'coal-mine',
        cost: { currency: "carbon", amount: 50 },
        production: { currency: "carbon", amountPerSecond: 3 },
        quantity: 1,
        visible: true,
        tooltip: "",
        buyVerb: "Dig"
    },
    {
        name: "Oxygen extractor",
        desc: "Test producer 2",
        id: 'oxygen-extractor',
        cost: { currency: "carbon", amount: 100 },
        production: { currency: "oxygen", amountPerSecond: 1 },
        quantity: 0,
        visible: true,
        tooltip: "",
        buyVerb: "Build"
    }];