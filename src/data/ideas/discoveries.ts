import { IIdeaState, IIdeaTemplate } from '../../classes/Idea';

type IdeaData = {
  template: IIdeaTemplate,
  startingState?: IIdeaState
};

const discoveries: IdeaData[] = [
  {
    template: {
      id: 'stone-tools-discovery',
      type: 'discovery',
      name: "Create stone tools",
      desc: "When a sheep knaps a stone with a second stone, the first stone gets sharp. And with a sharp stone, a sheep can do much more than without!",
      branch: "construction",
      unlocks: ['stone-tools'],
      rawCost: { flint: 50, wood: 20, folklore: 10 },
      buyVerb: "Try it!",
      originalLocks: []
    }
  },
  {
    template: {
      id: 'hunting-discovery',
      type: 'discovery',
      name: "Hunt for meat",
      desc: "One can eat vegetables only for so long. Even if one is a sheep.",
      branch: "hunting",
      unlocks: ['hunting'],
      rawCost: { "stone tools": 10, folklore: 15 },
      buyVerb: "Hack and slash",
      originalLocks: ['stone-tools']
    }
  },
  {
    template: {
      id: 'cooking',
      type: 'discovery',
      name: "Start cooking food",
      desc: "Eating raw might be healthy, but eating cooked is more nutritional. And more tasty. And less risky.",
      branch: "food",
      unlocks: ['cooking'],
      effects: [
        {
          affectedObjectId: 'tribe-elder',
          affectedProperty: "cost",
          type: 'add',
          scale: { vegetables: 10, 'raw vegetables': -10 }
        }
      ],
      rawCost: { wood: 100, 'stone tools': 5, folklore: 20 },
      buyVerb: "Start the fire",
      originalLocks: ['hunting']
    }
  }
];

export default discoveries;
