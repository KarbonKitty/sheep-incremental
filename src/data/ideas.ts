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
      rawCost: { flint: 50, wood: 20, folklore: 5 },
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
      rawCost: { "stone tools": 5, territory: 15, folklore: 15 },
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
      rawCost: { "stone tools": 10, folklore: 10 },
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
      rawCost: { grain: 100, folklore: 20 },
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
      rawCost: { grain: 150, water: 100, folklore: 25 },
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
      rawCost: { wood: 100, folklore: 15 },
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
      rawCost: { charcoal: 50, clay: 100, folklore: 30 },
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
      rawCost: { wood: 50, flint: 25, "stone tools": 1, folklore: 20 },
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
      rawCost: { charcoal: 30, "stone tools": 1, folklore: 25 },
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
      rawCost: { flint: 15, "stone tools": 1, folklore: 15 },
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
      rawCost: { "mud bricks": 100, folklore: 30 },
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
      rawCost: { bread: 20, beer: 20, folklore: 10 },
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
      rawCost: { "animal skin": 25, wood: 5, folklore: 20 },
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
  },
  {
    template: {
      id: 'complex-tools-maker',
      type: 'upgrade',
      name: "Complex tool manufacturing",
      desc: "Flint knappers can be taught to make more advanced tools out of stone blades and other complex shapes, but at the cost of producing less tools overall.",
      branch: "construction",
      objectId: 'flint-knapper',
      rawCost: { flint: 50, folklore: 20 },
      effects: [{
        affectedObjectId: 'flint-knapper',
        affectedProperty: 'consumption',
        type: 'add',
        scale: { flint: 0.33 }
      },
      {
        affectedObjectId: 'flint-knapper',
        affectedProperty: 'production',
        type: 'add',
        scale: { "complex tools": 0.05, "stone tools": -0.05 }
      }],
      buyVerb: "Train",
      originalLocks: ['complex-tools', 'stone-tools']
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'microliths',
      type: 'discovery',
      name: "Produce microliths",
      desc: "Microliths are tiny stone blades that can be used to create dangerous weapons, such as stone-tipped spears and harpoons.",
      branch: "hunting",
      unlocks: ['microliths'],
      rawCost: { flint: 100, "stone tools": 3, "complex tools": 3, folklore: 40 },
      buyVerb: "Work the stone",
      originalLocks: ['complex-tools', 'stone-tools']
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'spears-for-hunters',
      type: 'upgrade',
      name: "Use spears for hunting",
      desc: "Hunters can use new and useful form of weapon: the stone-tipped spear.",
      branch: "hunting",
      objectId: 'hunter',
      effects: [{
        affectedObjectId: 'hunter',
        affectedProperty: 'production',
        type: 'mul',
        scale: { "raw meat": 1.5, "animal bone": 1.5, "animal skin": 1.5 }
      },
      {
        affectedObjectId: 'hunter',
        affectedProperty: 'consumption',
        type: 'add',
        scale: { microliths: 0.01 }
      }],
      rawCost: { microliths: 10, folklore: 50 },
      buyVerb: "Train",
      originalLocks: ['microliths']
    },
    startingState: {
      done: false
    }
  },
  {
    template: {
      id: 'mining',
      type: 'discovery',
      name: "Start mining",
      desc: "There is a lot of interesting stuff hidden under the earth. Time to uncover it and use for the good of the tribe.",
      branch: "construction",
      unlocks: ['mining'],
      rawCost: { folklore: 50, "stone tools": 10 },
      buyVerb: "Dig!",
      originalLocks: ['complex-tools', 'stone-tools']
    },
    startingState: {
      done: false
    }
  }
];

export default ideas;
