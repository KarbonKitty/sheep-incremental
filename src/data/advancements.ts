import IDiscoveryState from "../classes/discovery/IDiscoveryState";
import IDiscoveryTemplate from "../classes/discovery/IDiscoveryTemplate";

type DiscoveryData = {
  template: IDiscoveryTemplate,
  startingState: IDiscoveryState
};

const advancements: DiscoveryData[] = [
{
  template: {
    id: 'pyrotechnology',
    name: "Pyrotechnology",
    desc: "The tribe discovers new way to create, control and use fire.",
    type: "discovery",
    branch: "construction",
    buyVerb: "Burn!",
    rawCost: { advancement: 1 },
    unlocks: ['pyrotechnology'],
    originalLocks: ['__prestige__']
  },
  startingState: {
    done: false,
  }
}];

export default advancements;
