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
      branch: "construction",
      unlocks: ['stone-tools'],
      rawCost: { flint: 50, wood: 20 },
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
      branch: "bread",
      unlocks: ['agriculture'],
      rawCost: { herbs: 200, "stone tools": 20 },
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
      branch: "hunting",
      unlocks: ['hunting'],
      rawCost: { "stone tools": 10 },
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
      branch: "bread",
      unlocks: ['flour'],
      rawCost: { grain: 100 },
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
      branch: "beer",
      unlocks: ['fermentation'],
      rawCost: { grain: 150, water: 100 },
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
      branch: "bread",
      unlocks: ['bread'],
      rawCost: { flour: 200, water: 200 },
      buyVerb: "Bake away!"
    },
    startingState: {
      done: false,
      locks: ['flour']
    }
  }
];

export default discoveries;