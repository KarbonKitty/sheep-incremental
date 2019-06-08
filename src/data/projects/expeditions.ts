import { IProjectState, IProjectTemplate } from "../../classes/Project";

type ProjectData = {
  template: IProjectTemplate,
  startingState?: IProjectState
};

const expeditionPlans: ProjectData[] = [
  {
    template: {
      type: 'project',
      id: 'land-search',
      branch: 'expedition',
      buyVerb: 'Travel',
      name: 'Search for new land',
      desc: 'Send your wanderers to travel the land in search of new grazing lands and caves for the sheep.',
      length: 3 * 60 * 1000,
      originalLocks: [],
      rawCost: { wood: 1 },
      baseReward: [
        {
          type: "always",
          resources: { territory: 10, folklore: 10 }
        },
        {
          type: "common",
          sites: { cave: 1 }
        },
        {
          type: "uncommon",
          resources: { territory: 10 }
        },
        {
          type: "veryRare",
          resources: { "raw meat": 5, "animal skin": 1, folklore: 3 }
        }
      ]
    }
  }
];

export default expeditionPlans;
