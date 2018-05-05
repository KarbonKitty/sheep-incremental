import IDiscoveryTemplate from '../classes/discovery/IDiscoveryTemplate';

let discoveries: IDiscoveryTemplate[] = [
  {
    id: "flour-discovery",
    type: 'discovery',
    name: "Discover flour",
    desc: "It seems that if you hit the grains with a rock, you get something more interesting...",
    locks: [],
    unlocks: ['flour'],
    rawCost: [{ currency: 'wheat', amount: 100 }],
    buyVerb: "Experiment!"
  },
  {
    id: "bread-discovery",
    type: 'discovery',
    name: "Discover bread",
    desc: "Just flour, water, and heat! Who would think that something so miraculous would be so easy to produce!",
    locks: ['flour'],
    unlocks: ['bread'],
    rawCost: [{ currency: 'flour', amount: 200 }, { currency: 'water', amount: 200 }],
    buyVerb: "Bake away!"
  }
];

export default discoveries;