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
      rawCost: { travels: 1 },
      baseReward: [
        {
          type: "always",
          sites: { cave: 1 },
          resources: { folklore: 10 }
        },
        {
          type: "common",
          resources: { wood: 10 }
        },
        {
          type: "uncommon",
          resources: { rocks: 10 }
        },
        {
          type: "veryRare",
          resources: { "raw meat": 5, "raw hide": 1, folklore: 3 }
        }
      ]
    }
  },
  {
    template: {
      type: 'project',
      id: 'great-hunt',
      branch: 'expedition',
      buyVerb: 'Start the hunt!',
      name: "The Great Hunt",
      desc: "Sometimes the everyday toiling of the hunters is not enough. Sometimes sheep need a true great hunt. One like this.",
      length: 5 * 60 * 1000,
      originalLocks: [ 'hunting' ],
      rawCost: { travels: 2, 'stone tools': 3 },
      baseReward: [
        {
          type: "common",
          resources: { "raw meat": 10, "raw hide": 2, "animal bone": 2, folklore: 5 }
        },
        {
          type: "uncommon",
          resources: { folklore: 7 }
        },
        {
          type: "rare",
          resources: { "raw meat": 15, "raw hide": 3, "animal bone": 3, folklore: 15 }
        }
      ]
    }
  },
  {
    template: {
      type: 'project',
      id: 'northern-hills',
      branch: 'expedition',
      buyVerb: "Climb",
      name: "Climb the northern hills",
      desc: "The tales of the rocks from the north have come south to your tribe; it might be prudent to send your explorers there, to test if the tales are true.",
      length: 10 * 60 * 1000,
      originalLocks: [ 'clothing' ],
      rawCost: { travels: 3, "clean hides": 10 },
      baseReward: [
        {
          type: "always",
          resources: { rocks: 20, folklore: 3 }
        },
        {
          type: "common",
          resources: { folklore: 5 }
        },
        {
          type: "uncommon",
          sites: { cave: 1 },
          resources: { rocks: 15 }
        },
        {
          type: "veryRare",
          resources: { folklore: 12 }
        }
      ]
    }
  }
];

export default expeditionPlans;
