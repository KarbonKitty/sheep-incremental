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
        consumption: [{ currency: "wheat", amount: 1 }],
        production: [{ currency: "cash", amount: 1 }],
        locks: [],
        buyVerb: "Recruit"
    },
    {
        id: 'mill',
        type: 'producer',
        name: "Quern",
        desc: "Two simple stones, but good enough to make flour out of wheat",
        rawCost: [{ currency: "cash", amount: 100 }, { currency: "wheat", amount: 100 }],
        production: [{ currency: "flour", amount: 2 }],
        consumption: [{ currency: "wheat", amount: 5 }],
        locks: ['flour'],
        buyVerb: "Build"
    },
    {
        id: 'bread-oven',
        type: 'producer',
        name: "Bread oven",
        desc: "A high-temperature oven made out of stone, heated with wood. Used to bake bread.",
        rawCost: [{ currency: "cash", amount: 300 }, { currency: "flour", amount: 100 }],
        production: [{ currency: "bread", amount: 1 }],
        consumption: [{ currency: "flour", amount: 2 }, { currency: "water", amount: 5 }],
        locks: ['bread'],
        buyVerb: "Build"
    },
    {
        id: 'well',
        type: 'producer',
        name: "Well",
        desc: "Deep hole in the ground that fills with water on it's own.",
        rawCost: [{ currency: "cash", amount: 50 }],
        production: [{ currency: "water", amount: 3 }],
        consumption: [],
        locks: [],
        buyVerb: "Dig"
    },
    {
        id: 'bread-seller',
        type: 'producer',
        name: "Bread merchant",
        desc: "While selling wheat or flour is nice, selling ready-made bread is a more surefire way to earn reasonable amount of money.",
        rawCost: [{ currency: "cash", amount: 100 }, { currency: "bread", amount: 30 }],
        production: [{ currency: "cash", amount: 4 }],
        consumption: [{ currency: "bread", amount: 1 }],
        locks: ['bread'],
        buyVerb: "Recruit"
    }
];