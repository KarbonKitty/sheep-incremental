import { IIdeaState, IIdeaTemplate } from '../../classes/Idea';

type IdeaData = {
  template: IIdeaTemplate,
  startingState?: IIdeaState
};

const discoveries: IdeaData[] = [
  {
    template: {
      id: 'stone-tools-discovery',
      type: 'idea',
      name: "Create stone tools",
      desc: "When a sheep knaps a stone with a second stone, the first stone gets sharp. And with a sharp stone, a sheep can do much more than without!",
      branch: "discovery",
      unlocks: ['stone-tools'],
      rawCost: { wood: 20, folklore: 20 },
      buyVerb: "Try it!",
      originalLocks: []
    }
  },
  {
    template: {
      id: 'firestarting-discovery',
      type: 'idea',
      name: "Start a fire!",
      desc: "Once sheep had to keep the fire burning, once they managed to get a flame from a natural fire or another tribe. But now... Sheep can start a fire on their own! Finally, freedom from tyranny of nature!",
      branch: "discovery",
      unlocks: ['firestarting'],
      rawCost: { wood: 100, rocks: 15, folklore: 30 },
      buyVerb: "Burn!",
      originalLocks: ['stone-tools']
    }
  },
  {
    template: {
      id: 'cooperation-discovery',
      type: 'idea',
      name: 'Cooperation',
      desc: 'When two sheep work together, they can accomplish more than working alone. This is a simple observation, but quite profound in it\'s consequences',
      branch: 'discovery',
      unlocks: [ 'cooperation' ],
      rawCost: { folklore: 50 },
      buyVerb: 'Cooperate',
      originalLocks: [ 'stone-tools' ]
    }
  },
  {
    template: {
      id: 'basketry-discovery',
      type: 'idea',
      name: 'Basketry',
      desc: 'Sheep can weave the baskets out of reed to carry heavy things and store little things together. And some particularly adventrous sheep even try to put baskets on their heads!',
      branch: 'discovery',
      unlocks: [ 'basketry' ],
      rawCost: { wood: 10, 'stone tools': 3, folklore: 40 },
      buyVerb: 'Weave',
      originalLocks: [ 'stone-tools' ]
    }
  },
  {
    template: {
      id: 'cooking-discovery',
      type: 'idea',
      name: 'Cooking',
      desc: 'With fire mastered and multiple types of food available to them, sheep started to experiment mixing the two. It seems to have worked well.',
      branch: 'discovery',
      unlocks: [ 'cooking' ],
      rawCost: { wood: 100, rocks: 5, vegetables: 10, 'raw meat': 10, 'raw fish': 10, folklore: 100 },
      buyVerb: 'Cook!',
      originalLocks: [ 'hunting', 'fishing', 'firestarting' ]
    }
  },
  {
    template: {
      id: 'fishing-discovery',
      type: 'idea',
      name: 'Fishing',
      desc: 'A sheep with a pointy stick that lives near the water will come up with that idea sooner or later. Hopefully sooner. Fish are delicious.',
      branch: 'discovery',
      unlocks: [ 'fishing' ],
      rawCost: { wood: 15, folklore: 75, 'stone tools': 5 },
      buyVerb: 'Fish',
      originalLocks: [ 'cooperation' ]
    }
  },
  {
    template: {
      id: 'hunting-discovery',
      type: 'idea',
      name: 'Hunt for meat',
      desc: 'One can only eat vegetables for so long. Even if one is a sheep.',
      branch: 'discovery',
      unlocks: [ 'hunting' ],
      rawCost: { 'stone tools': 10, folklore: 65 },
      buyVerb: 'Stalk and run',
      originalLocks: ['stone-tools']
    }
  },
  {
    template: {
      id: 'clothing-discovery',
      type: 'idea',
      name: 'Wear clean hides',
      desc: 'With a sharp rock and a bit of ingenuity, sheep can now clean the hides and use them as clothing, especially when travelling in cold climate.',
      branch: 'discovery',
      unlocks: ['clothing'],
      rawCost: { 'raw hides': 15, folklore: 100, 'stone tools': 5 },
      buyVerb: 'Scrape and cut',
      originalLocks: [ 'hunting' ]
    }
  }
];

export default discoveries;
