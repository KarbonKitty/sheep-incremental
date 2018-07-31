import { IIdeaState, IIdeaTemplate } from '../classes/Idea';

type IdeaData = {
  template: IIdeaTemplate,
  startingState?: IIdeaState
};

const advancements: IdeaData[] = [
  {
    template: {
      id: 'agriculture',
      name: 'Agriculture',
      desc: "The tribe discovers how to grow plants, and not only gather them.",
      type: 'discovery',
      branch: 'prestige',
      buyVerb: "Reap and sow",
      rawCost: { advancement: 1 },
      unlocks: ['agriculture'],
      originalLocks: ['__prestige__']
    }
  },
  {
    template: {
      id: 'complex-tools',
      name: "Complex stone tools",
      desc: "New ways of working stone to create better stone tools.",
      type: 'discovery',
      branch: 'prestige',
      buyVerb: "Knap",
      rawCost: { advancement: 1 },
      unlocks: ['complex-tools'],
      originalLocks: ['__prestige__', 'agriculture']
    }
  }
];

export default advancements;
