import IUpgradeState from "../classes/upgrade/IUpgradeState";
import IUpgradeTemplate from "../classes/upgrade/IUpgradeTemplate";

type UpgradeData = {
  template: IUpgradeTemplate,
  startingState: IUpgradeState
}

let upgrades: UpgradeData[] = [
  {
    template: {
      id: 'soft-hammer-percussion',
      type: "upgrade",
      name: "Soft hammer percussion",
      desc: "With time, your flint knappers can learn a new technique for creation of sharp edges: instead of striking rocks with other rocks, strike them with softer material, like wood. It takes more work, but wastes less material and leads to better tools.",
      branch: "construction",
      objectId: 'flint-knapper',
      rawCost: { herbs: 100, wood: 50, flint: 25, "stone tools": 1 },
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
      buyVerb: "Train"
    },
    startingState: {
      locks: ['stone-tools'],
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
      rawCost: { herbs: 50, flint: 10, "stone tools": 1 },
      effects: [{
        affectedObjectId: 'flint-gatherer',
        affectedProperty: 'production',
        type: 'add',
        scale: { flint: 0.2 }
      }],
      buyVerb: "Gather"
    },
    startingState: {
      locks: ['stone-tools'],
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
      buyVerb: "Build"
    },
    startingState: {
      locks: ['fire'],
      done: false
    }
  }
]

export default upgrades;
