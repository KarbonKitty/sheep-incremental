import { IExpeditionState, IExpeditionTemplate } from "../classes/Expedition";

type ExpeditionData = {
  template: IExpeditionTemplate,
  startingState?: IExpeditionState
};

const expeditions: ExpeditionData[] = [
  {
    template: {
      type: 'idea',
      id: 'land-search',
      branch: 'expedition',
      buyVerb: 'Travel',
      name: 'Search for new land',
      desc: 'Send your wanderers to travel the land in search of new grazing lands and caves for the sheep.',
      length: 3 * 60 * 1000,
      originalLocks: [],
      rawCost: { wood: 1 },
      reward: [
        {
          chance: 1,
          item: [ { territory: 10, folklore: 10 } ]
        },
        {
          chance: 0.8,
          item: [ 'cave' ]
        },
        {
          chance: 0.5,
          item: [ { territory: 10 } ]
        },
        {
          chance: 0.1,
          item: [ { "raw meat": 5, "animal skin": 1, folklore: 3 } ]
        }
      ]
    }
  }
];

export default expeditions;
