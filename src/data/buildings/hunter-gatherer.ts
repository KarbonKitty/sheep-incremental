import { IBuildingTemplate, IBuildingState } from "../../classes/Building";

type BuildingData = {
  template: IBuildingTemplate,
  startingState?: IBuildingState
};

const buildings: BuildingData[] = [
  {
    template: {
      id: 'cave',
      type: 'building',
      name: "Cave",
      desc: "Cave is effective hiding place for both sheep and their possessions. It doesn't require building materials, and is very effective shelter. Unfortunately, sheep sometimes have to search far and wide to find good caves for themselves.",
      branch: "housing",
      rawCost: { territory: 15 },
      housing: 2,
      rawStorage: { wood: 15, flint: 10, "stone tools": 5, "raw meat": 5, meat: 10, "raw vegetables": 15, "vegetables": 5 },
      buyVerb: "Find",
      originalLocks: []
    },
    startingState: {
      quantity: 1
    }
  },
  {
    template: {
      id: 'wood-gatherer',
      type: 'building',
      name: "Wood gatherer",
      desc: "What do you get when you combine sheep and forest? Sheep and sticks.",
      branch: 'construction',
      rawCost: { territory: 5 },
      rawProduction: { wood: 0.5 },
      employees: 1,
      buyVerb: "Recruit",
      originalLocks: []
    },
    startingState: {
      quantity: 1
    }
  },
  {
    template: {
      id: 'wanderer',
      type: 'building',
      name: "Wanderer",
      desc: "Some sheep just can't sit in one place; so you give them a stick and send them forth, to explore new land for the tribe to use.",
      branch: 'culture',
      rawCost: { wood: 5 },
      rawProduction: { territory: 0.25 },
      rawStorage: { territory: 100 },
      employees: 1,
      buyVerb: "Send forth",
      originalLocks: []
    },
    startingState: {
      quantity: 1
    }
  },
  {
    template: {
      id: 'food-gatherer',
      type: 'building',
      name: "Food gatherer",
      desc: "The simplest way to get food is to just pick up whatever is edible from the ground. Those sheep have mastered that procedure.",
      branch: 'food',
      rawCost: { territory: 10 },
      rawProduction: { "raw vegetables": 0.2 },
      rawStorage: { "raw vegetables": 3 },
      employees: 1,
      buyVerb: "Pick up",
      originalLocks: []
    }
  },
  {
    template: {
      id: 'flint-gatherer',
      type: 'building',
      name: "Flint gatherer",
      desc: "Flint is a rock that can be easily broken to produce a sharp edge. Very useful to any tribe.",
      branch: 'tools',
      rawCost: { territory: 10 },
      rawProduction: { flint: 0.33 },
      rawStorage: { flint: 5 },
      employees: 1,
      buyVerb: "Train",
      originalLocks: []
    }
  },
  {
    template: {
      id: 'flint-knapper',
      type: 'building',
      name: "Flint knapper",
      desc: "Sheep with good manual dexterity can produce stone tools - just deliver flint and some sticks.",
      branch: 'tools',
      rawCost: { flint: 15, territory: 1 },
      rawConsumption: { flint: 0.8 },
      rawProduction: { 'stone tools': 0.07 },
      rawStorage: { flint: 5, 'stone tools': 2 },
      employees: 1,
      buyVerb: "Recruit",
      originalLocks: ['stone-tools']
    }
  },
  {
    template: {
      id: 'tribe-elder',
      type: 'building',
      name: "Tribe elder",
      desc: "The old sheep of the tribe become the elders - they gather knowledge and pass it on to the next generations, allowing tribe to grow and advance.",
      branch: 'culture',
      rawCost: { 'raw vegetables': 10, territory: 1 },
      rawProduction: { folklore: 0.1 },
      employees: 1,
      buyVerb: "Grow old",
      originalLocks: []
    }
  },
  {
    template: {
      id: 'hunter',
      type: 'building',
      name: "Hunter",
      desc: "Well armed sheep that hunts animals for their meat. They are known for going beyond the known lands on occasion, too.",
      branch: "hunting",
      rawCost: { "stone tools": 1, territory: 5 },
      rawConsumption: { "stone tools": 0.02 },
      rawProduction: { "raw meat": 0.6 },
      employees: 1,
      buyVerb: "Recruit",
      originalLocks: ['hunting']
    }
  },
  {
    template: {
      id: 'cook',
      type: 'building',
      name: "Fire pit",
      desc: "Once the sheep discovered that mashed and cooked vegetables, tubers and meat are more tasty than raw, there has been no going back.",
      branch: 'food',
      rawCost: { wood: 30, territory: 2, 'stone tools': 1 },
      rawConsumption: { "raw vegetables": 1, "raw meat": 1, wood: 1 },
      rawProduction: { vegetables: 0.5, meat: 0.33 },
      employees: 1,
      buyVerb: "Dig",
      originalLocks: ['cooking']
    }
  },
  {
    template: {
      id: 'shed',
      type: 'building',
      name: "Shed",
      desc: "Sometimes, a cave is too small for both sheep and their tools and food. When that happens, tribe can make a small shed out of a bunch of sticks, to keep their possessions there.",
      branch: 'tools',
      rawCost: { wood: 15, territory: 5 },
      rawStorage: { wood: 15, flint: 15, 'stone tools': 5, 'raw vegetables': 15, vegetables: 10, 'raw meat': 5, meat: 10 },
      buyVerb: "Construct",
      originalLocks: []
    }
  }
];

export default buildings;
