import IDiscoveryTemplate from '../classes/discovery/IDiscoveryTemplate';
import IDiscoveryState from '../classes/discovery/IDiscoveryState';

type DiscoveryData = {
  template: IDiscoveryTemplate,
  startingState: IDiscoveryState
}

let discoveries: DiscoveryData[] = [
  {
    template: {
      id: 'stone-tools-discovery',
      type: 'discovery',
      name: "Discover stone tools",
      desc: "While a sheep can use a sharp rock to dig or cut, it is much easier to tie that rock to a stick.",
      unlocks: ['stone-tools'],
      rawCost: [{ currency: "flint", amount: 50 }, { currency: 'wood', amount: 20 }],
      buyVerb: "Try it!"
    },
    startingState: {
      done: false,
      locks: []
    }
  },
  {
    template: {
      id: 'agriculture-discovery',
      type: 'discovery',
      name: "Domesticate crops",
      desc: "Instead of always looking for grass out there, maybe the tribe could plant its own grass?",
      unlocks: ['agriculture'],
      rawCost: [{ currency: "herbs", amount: 200 }, { currency: "stone tools", amount: 15 }],
      buyVerb: "Dig and plant!"
    },
    startingState: {
      done: false,
      locks: ['stone-tools']
    }
  },
  {
    template: {
      id: 'hunting-discovery',
      type: 'discovery',
      name: "Hunt for meat",
      desc: "Beware a sheep with an ax!",
      unlocks: ['hunting'],
      rawCost: [{ currency: "stone tools", amount: 5 }],
      buyVerb: "Hack and slash!"
    },
    startingState: {
      done: false,
      locks: ['stone-tools']
    }
  },
  {
    template: {
      id: "flour-discovery",
      type: 'discovery',
      name: "Discover flour",
      desc: "It seems that if you hit the grains with a rock, you get something more interesting...",
      unlocks: ['flour'],
      rawCost: [{ currency: 'grain', amount: 100 }],
      buyVerb: "Experiment!"
    },
    startingState: {
      done: false,
      locks: ['agriculture']
    }
  },
  {
    template: {
      id: 'fermentation-discovery',
      type: 'discovery',
      name: "Fermentate grain",
      desc: "The process of fermentation is already known to sheepkind, but now there is chance to take control over it.",
      unlocks: ['fermentation'],
      rawCost: [{ currency: 'grain', amount: 150 }, { currency: 'water', amount: 100 }],
      buyVerb: "Fermentate!"
    },
    startingState: {
      done: false,
      locks: ['agriculture']
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