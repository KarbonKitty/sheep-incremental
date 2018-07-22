import { IIdeaState, IIdeaTemplate } from '../classes/Idea';

type IdeaData = {
  template: IIdeaTemplate,
  startingState: IIdeaState
};

const advancements: IdeaData[] = [
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
},
{
  template: {
    id: 'complex-tools',
    name: "Complex stone tools",
    desc: "New ways of working stone to create better stone tools.",
    type: "discovery",
    branch: "construction",
    buyVerb: "Knap!",
    rawCost: { advancement: 1 },
    unlocks: ['complex-tools'],
    originalLocks: ['__prestige__', 'pyrotechnology']
  },
  startingState: {
    done: false
  }
}];

export default advancements;
