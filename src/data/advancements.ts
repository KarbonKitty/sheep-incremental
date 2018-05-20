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
},
{
  template: {
    id: 'bronze-working',
    name: "Bronze working",
    desc: "The art of mixing copper with other metals to create harder and stronger alloys.",
    type: "discovery",
    branch: "construction",
    buyVerb: "Mix",
    rawCost: { advancement: 2 },
    unlocks: [ 'bronze' ]
  },
  startingState: {
    done: false,
    locks: ['__prestige__']
  }
}];

export default advancements;
