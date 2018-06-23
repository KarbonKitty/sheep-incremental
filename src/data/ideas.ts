import { IIdeaState, IIdeaTemplate } from '../classes/Idea';

type IdeaData = {
  template: IIdeaTemplate,
  startingState: IIdeaState
};

const ideas: IdeaData[] = [
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
      rawCost: { "stone tools": 5, territory: 15 },
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
  },
  {
    template: {
      id: 'soft-hammer-percussion',
      type: "upgrade",
      name: "Soft hammer percussion",
      desc: "With time, your flint knappers can learn a new technique for creation of sharp edges: instead of striking rocks with other rocks, strike them with softer material, like wood. It takes more work, but wastes less material and leads to better tools.",
      branch: "construction",
      objectId: 'flint-knapper',
      rawCost: { wood: 50, flint: 25, "stone tools": 1 },
      effects: [{
        affectedObjectId: 'flint-knapper',
        affectedProperty: "production",
        type: "mul",
        scale: { "stone tools": 1.5 }
      },
      {
        affectedObjectId: 'flint-knapper',
        affectedProperty: "consumption",
        type: "add",
        scale: { wood: 0.2, flint: -0.1 }
      }],
      buyVerb: "Train",
      originalLocks: ['stone-tools'],
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'heat-treatment-flint',
      type: 'idea',
      name: "Heat treatment of flint",
      desc: "It seems that some tools are easier to make with a flint that has been baked in fire for some time.",
      branch: "construction",
      objectId: 'flint-knapper',
      rawCost: { charcoal: 30, "stone tools": 1 },
      effects: [{
        affectedObjectId: 'flint-knapper',
        affectedProperty: 'production',
        type: "mul",
        scale: { "stone tools": 1.5 }
      },
      {
        affectedObjectId: 'flint-knapper',
        affectedProperty: 'consumption',
        type: 'add',
        scale: { charcoal: 0.1 }
      }],
      buyVerb: "Stoke the fires",
      originalLocks: ['pyrotechnology', 'fire']
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'other-rock',
      type: "upgrade",
      name: "Gather different rocks",
      desc: "It seems that other rocks can be used to make tools, just like flint!",
      branch: "construction",
      objectId: 'flint-gatherer',
      rawCost: { flint: 15, "stone tools": 1 },
      effects: [{
        affectedObjectId: 'flint-gatherer',
        affectedProperty: 'production',
        type: 'add',
        scale: { flint: 0.2 }
      }],
      buyVerb: "Gather",
      originalLocks: ['stone-tools'],
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'mud-brick-bread-oven',
      type: "upgrade",
      name: "Mud brick oven",
      desc: "Building the inside wall of the oven out of dry mud bricks mean that the food will have less dirt in it, which makes the sheep happier.",
      branch: "bread",
      objectId: 'bread-oven',
      rawCost: { "mud bricks": 100 },
      effects: [{
        affectedObjectId: 'bread-oven',
        affectedProperty: 'production',
        type: 'mul',
        scale: { bread: 1.25 }
      }],
      buyVerb: "Build",
      originalLocks: ['fire'],
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'hunter-territory',
      type: 'upgrade',
      name: 'Curious hunters',
      desc: "After your hunters have spent some time hunting in the well-known territories, they get the urge to do some hunting in the uncharted lands. Stockpile them with some supplies and they might be even able to find some nice places to live for the tribe!",
      branch: 'hunting',
      objectId: 'hunter',
      rawCost: { bread: 20, beer: 20 },
      effects: [{
        affectedObjectId: 'hunter',
        affectedProperty: 'production',
        type: 'add',
        scale: { territory: 0.05 }
      }],
      buyVerb: "Give supplies",
      originalLocks: ['fermentation']
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'tents-for-wanderers',
      type: 'upgrade',
      name: "Tents for wanderers",
      desc: "If you are able to give your wanderers some tents, they will be able to find more territory before coming back to the tribe!",
      branch: "construction",
      objectId: 'wanderer',
      rawCost: { "animal skin": 25, wood: 5 },
      effects: [{
        affectedObjectId: 'wanderer',
        affectedProperty: 'production',
        type: 'add',
        scale: { territory: 0.05 }
      }],
      buyVerb: "Equip",
      originalLocks: ['hunting']
    },
    startingState: {
      done: false
    }
  }
];

export default ideas;
