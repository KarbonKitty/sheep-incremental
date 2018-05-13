import IUpgradeState from "../classes/upgrade/IUpgradeState";
import IUpgradeTemplate from "../classes/upgrade/IUpgradeTemplate";

type UpgradeData = {
    template: IUpgradeTemplate,
    startingState: IUpgradeState
}

let upgrades: UpgradeData[] = [
  {
    template: {
      id: 'flint-gatherer-other-stones',
      type: "upgrade",
      name: "Gathering different stones",
      desc: "With some experience, your flint gatherers can find and gather other stones useful for tools production",
      rawCost: { herbs: 150 },
      effects: [{
        affectedObjectId: 'flint-gatherer',
        affectedProperty: "production",
        type: "mul",
        scale: { flint: 1.5 }
      }],
      buyVerb: "Train"
    },
    startingState: {
      locks: ['stone-tools'],
      done: false
    }
  }
]

export default upgrades;
