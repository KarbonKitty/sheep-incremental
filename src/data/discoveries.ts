import IDiscovery from '../classes/IDiscovery';

let discoveries: IDiscovery[] = [
  {
    id: "flour-discovery",
    name: "Discover flour",
    desc: "It seems that if you hit the grains with a rock, you get something more interesting...",
    quantity: 0,
    locks: [],
    unlocks: 'flour',
    rawCost: [{ currency: 'wheat', amount: 99}],
    buyVerb: "Experiment!"
  }
];

export default discoveries;