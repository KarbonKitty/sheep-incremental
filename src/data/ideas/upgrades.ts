import { IIdeaState, IIdeaTemplate } from '../../classes/Idea';

type IdeaData = {
  template: IIdeaTemplate,
  startingState?: IIdeaState
};

const upgrades: IdeaData[] = [
  {
    template: {
      id: 'soft-hammer-percussion',
      type: "idea",
      name: "Soft hammer percussion",
      desc: "With time, your flint knappers can learn a new technique for creation of sharp edges: instead of striking rocks with other rocks, strike them with softer material, like wood. It takes more work, but wastes less material and leads to better tools.",
      branch: "construction",
      objectId: 'flint-knapper',
      rawCost: { wood: 50, flint: 25, "stone tools": 1, folklore: 50 },
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
      originalLocks: [],
    },
  },
  {
    template: {
      id: 'other-rock',
      type: "idea",
      name: "Gather different rocks",
      desc: "It seems that other rocks can be used to make tools, just like flint!",
      branch: "construction",
      objectId: 'flint-gatherer',
      rawCost: { flint: 15, "stone tools": 1, folklore: 25 },
      effects: [{
        affectedObjectId: 'flint-gatherer',
        affectedProperty: 'production',
        type: 'add',
        scale: { flint: 0.2 }
      }],
      buyVerb: "Gather",
      originalLocks: ['stone-tools'],
    },
  },
  {
    template: {
      id: 'curious-hunters',
      type: 'idea',
      name: "Curious hunters",
      desc: "With well-cooked food the hunters can travel farther, and not only hunt, but also discover new lands for the tribe!",
      branch: 'food',
      objectId: 'hunter',
      effects: [
        {
          affectedObjectId: 'hunter',
          affectedProperty: 'production',
          type: 'add',
          scale: { territory: 0.15 }
        }
      ],
      rawCost: { "vegetables": 15, "meat": 15 },
      buyVerb: "Equip",
      originalLocks: ['cooking']
    }
  },
  {
    template: {
      id: 'animal-skins-cave',
      type: 'idea',
      name: "Skin clearing",
      desc: "Once sheep learn how to better clean the icky bits from the skins of the caught animals, they stop smelling so bad, and can be stored in caves.",
      branch: 'hunting',
      objectId: 'cave',
      effects: [
        {
          affectedObjectId: 'cave',
          affectedProperty: 'storage',
          type: 'add',
          scale: { "animal skin": 5 }
        }
      ],
      rawCost: { "stone tools": 3, folklore: 15 },
      buyVerb: "Scrape",
      originalLocks: ['hunting']
    }
  }
];

export default upgrades;
