import IDiscoveryTemplate from '../classes/discovery/IDiscoveryTemplate';
import IDiscoveryState from '../classes/discovery/IDiscoveryState';

type DiscoveryData = {
  template: IDiscoveryTemplate,
  startingState: IDiscoveryState
}

let discoveries: DiscoveryData[] = [
  {
    template: {
      id: "flour-discovery",
      type: 'discovery',
      name: "Discover flour",
      desc: "It seems that if you hit the grains with a rock, you get something more interesting...",
      unlocks: ['flour'],
      rawCost: [{ currency: 'wheat', amount: 100 }],
      buyVerb: "Experiment!"
    },
    startingState: {
      done: false,
      locks: []
    }
  },
  {
    template: {
      id: "bread-discovery",
      type: 'discovery',
      name: "Discover bread",
      desc: "Just flour, water, and heat! Who would think that something so miraculous would be so easy to produce!",
      unlocks: ['bread'],
      rawCost: [{ currency: 'flour', amount: 200 }, { currency: 'water', amount: 200 }],
      buyVerb: "Bake away!"
    },
    startingState: {
      done: false,
      locks: ['flour']
    }
  }
];

export default discoveries;