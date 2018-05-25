import IDiscoveryState from '../classes/discovery/IDiscoveryState';
import IDiscoveryTemplate from '../classes/discovery/IDiscoveryTemplate';

type DiscoveryData = {
  template: IDiscoveryTemplate,
  startingState: IDiscoveryState
};

const discoveries: DiscoveryData[] = [
  {
    template: {
      id: 'stone-tools-discovery',
      type: 'discovery',
      name: "Discover stone tools",
      desc: "While a sheep can use a sharp rock to dig or cut, it is much easier to tie that rock to a stick.",
      branch: "construction",
      unlocks: ['stone-tools'],
      rawCost: { flint: 50, wood: 20 },
      buyVerb: "Try it!",
      originalLocks: []
    },
    startingState: {
      done: false,
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
      buyVerb: "Dig and plant!",
      originalLocks: ['stone-tools']
    },
    startingState: {
      done: false,
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
      buyVerb: "Hack and slash!",
      originalLocks: ['stone-tools']
    },
    startingState: {
      done: false,
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
      buyVerb: "Experiment!",
      originalLocks: ['agriculture']
    },
    startingState: {
      done: false,
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
      buyVerb: "Fermentate!",
      originalLocks: ['agriculture']
    },
    startingState: {
      done: false,
    }
  },
  {
    template: {
      id: "controlled-fire",
      type: 'discovery',
      name: "Tame the fire!",
      desc: "Once the domain of nature, now the fire rests solely in the hands of the sheep!... Well, with the sheep, anyway.",
      branch: "construction",
      unlocks: ['fire'],
      rawCost: { wood: 100 },
      buyVerb: "Stoke the fires!",
      originalLocks: ['hunting']
    },
    startingState: {
      done: false,
    }
  },
  {
    template: {
      id: 'pottery',
      type: 'discovery',
      name: "Create pottery",
      desc: "Clay, when burned in high temperature, becomes strong and beautiful ceramics. Time to put that knowledge to use!",
      branch: "pottery",
      unlocks: ['pottery'],
      rawCost: { charcoal: 50, clay: 100 },
      buyVerb: "Bake!",
      originalLocks: ['pyrotechnology', 'fire']
    },
    startingState: {
      done: false,
    }
  }
];

export default discoveries;
