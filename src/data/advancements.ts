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
}];

export default advancements;
