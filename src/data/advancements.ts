import IDiscoveryTemplate from '../classes/discovery/IDiscoveryTemplate';
import IDiscoveryState from '../classes/discovery/IDiscoveryState';

type DiscoveryData = {
  template: IDiscoveryTemplate,
  startingState: IDiscoveryState
}

let advancements: DiscoveryData[] = [
{
  template: {
    id: 'copper-processing',
    name: "Copper processing",
    desc: "Your tribe finds out how to use and smelt copper, an easy to find, but soft, metal.",
    type: "discovery",
    branch: "construction",
    buyVerb: "Discover",
    rawCost: { advancement: 1 },
    unlocks: ['copper']
  },
  startingState: {
    done: false,
    locks: ['__prestige__']
  }
}];

export default advancements;
