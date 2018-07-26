import { IBuildingTemplate, IBuildingState } from "../../classes/Building";

type BuildingData = {
  template: IBuildingTemplate,
  startingState: IBuildingState
};

const producersData: BuildingData[] = [
  {
    template: {
      id: 'totem-carver',
      type: 'building',
      name: "Carver",
      desc: "Carvings are used as offerings to the ancestors and as decorations in the sheep houses. Tribe with skilled carvers can become famous amongs it's neighbors.",
      branch: "culture",
      rawCost: { territory: 3, "stone tools": 2, "complex tools": 1 },
      rawConsumption: { stone: 0.3, wood: 0.2, "stone tools": 0.1, "animal bone": 0.2, "complex tools": 1 },
      rawProduction: { carvings: 0.03 },
      employees: 1,
      buyVerb: "Train",
      originalLocks: ['complex-tools', 'stone-tools']
    },
    startingState: {
      quantity: 0
    }
  },
  {
      template: {
        id: 'stone-mine',
        type: 'building',
        name: "Primitive quarry",
        desc: "Simple quarry that sheep can work in to produce stone. It is much quicker than just picking up the stones from the ground.",
        branch: "construction",
        rawCost: { "stone tools": 10, territory: 15 },
        rawConsumption: { "stone tools": 0.2, "complex tools": 0.1 },
        rawProduction: { stone: 5.5 },
        employees: 3,
        buyVerb: "Dig",
        originalLocks: ['complex-tools', 'mining']
      },
      startingState: {
        quantity: 0
      }
  },
  {
      template: {
          id: 'flint-mine',
          type: 'building',
          name: "Flint mine",
          desc: "There is more flint under the ground than on the ground, and when some sheep organize, they can give the tribe lots and lots of flint.",
          branch: "construction",
          rawCost: { "stone tools": 10, "complex tools": 1, territory: 25 },
          rawConsumption: { "stone tools": 0.1, "complex tools": 0.05 },
          rawProduction: { flint: 3.75 },
          employees: 3,
          buyVerb: "Dig",
          originalLocks: ['complex-tools', 'mining']
      },
      startingState: {
          quantity: 0
      }
  },
  {
      template: {
          id: 'tribe-elder',
          type: 'building',
          name: "Tribe elder",
          desc: "The old sheep of the tribe become the elders - they gather knowledge and pass it on to the next generations, allowing tribe to grow and advance.",
          branch: "culture",
          rawCost: { territory: 1 },
          rawProduction: { folklore: 0.1 },
          employees: 1,
          buyVerb: "Grow old",
          originalLocks: []
      },
      startingState: {
          quantity: 0
      }
  },
  {
      template: {
          id: 'microlith-workshop',
          type: 'building',
          name: "Microlith knapper",
          desc: "Some flint-knapping sheep have enough manual dexterity to produce tiny, well-made pieces of stone, called microliths, and used in spears and harpoons.",
          branch: "construction",
          rawCost: { territory: 5, "complex tools": 1 },
          rawConsumption: { flint: 0.8, "complex tools": 0.02, "animal bone": 0.3 },
          rawProduction: { microliths: 0.4 },
          rawStorage: { microliths: 10 },
          buyVerb: "Knap",
          originalLocks: ['complex-tools', 'microliths', 'stone-tools']
      },
      startingState: {
          quantity: 0
      }
  },
  {
      template: {
          id: 'bone-hut',
          type: 'building',
          name: "Bone hut",
          desc: "Large hut made out of megafauna bones. It is very complex to build, but houses a lot of sheep, even if the conditions are not great.",
          branch: "housing",
          rawCost: { "animal bone": 100, "animal skin": 30 },
          housing: 5,
          buyVerb: "Erect",
          originalLocks: ['complex-tools', 'stone-tools', 'hunting']
      },
      startingState: {
          quantity: 0
      }
  }
];

export default producersData;
