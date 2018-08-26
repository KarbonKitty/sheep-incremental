import { IExpeditionState, IExpeditionTemplate } from "../classes/Expedition";

type ExpeditionData = {
  template: IExpeditionTemplate,
  startingState?: IExpeditionState
};

const expeditions: ExpeditionData[] = [
  {
    template: {
      type: 'idea',
      id: 'test-expedition',
      branch: 'expedition',
      buyVerb: 'Travel',
      name: 'Test expedition',
      desc: 'Test expedition',
      length: 10000,
      originalLocks: [],
      rawCost: { wood: 1 },
      reward: [
        {
          chance: 1,
          item: [ { territory: 10 } ]
        },
        {
          chance: 1,
          item: [ 'cave' ]
        },
        {
          chance: 0.5,
          item: [ { folklore: 10 } ]
        }
      ]
    }
  }
];

export default expeditions;
