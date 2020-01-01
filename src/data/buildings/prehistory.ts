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
      name: "Living cave",
      desc: "Cave is effective hiding place for both sheep and their possessions. It doesn't require building materials, and is very effective shelter. Unfortunately, sheep sometimes have to search far and wide to find good caves for themselves.",
      branch: "housing",
      rawCost: { wood: 10 },
      housing: 2,
      rawStorage: { wood: 5, rocks: 5, "stone tools": 2, "raw meat": 5, meat: 10, vegetables: 5 },
      buyVerb: "Find",
      requiredSite: 'cave',
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
      rawCost: { vegetables: 10 },
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
      id: 'food-gatherer',
      type: 'building',
      name: "Food gatherer",
      desc: "The simplest way to get food is to just pick up whatever is edible from the ground. Those sheep have mastered that procedure, and with their point sticks even take a bit further, digging stuff that's just below ground.",
      branch: 'food',
      rawCost: { wood: 10 },
      rawProduction: { vegetables: 0.2 },
      rawStorage: { vegetables: 3 },
      employees: 1,
      buyVerb: "Pick up",
      originalLocks: []
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
      rawProduction: { travels: 0.001 },
      rawStorage: { travels: 1 },
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
      id: 'rock-gatherer',
      type: 'building',
      name: "Rock gatherer",
      desc: "Rocks are necessary part of most of the tools that the tribe is using, but not all rocks are created equal. You will need trained rock gatherers to only pick up good rocks.",
      branch: 'tools',
      rawCost: { vegetables: 10 },
      rawProduction: { rocks: 0.33 },
      rawStorage: { rocks: 5 },
      employees: 1,
      buyVerb: "Train",
      originalLocks: []
    }
  },
  {
    template: {
      id: 'stone-tool-workshop',
      type: 'building',
      name: "Stone tool workshop",
      desc: "A place for a sheep with good manual dexterity to produce stone tools - just deliver some rocks and some sticks.",
      branch: 'tools',
      rawCost: { rocks: 15, wood: 10 },
      rawConsumption: { rocks: 0.8 },
      rawProduction: { 'stone tools': 0.07 },
      rawStorage: { rocks: 5, 'stone tools': 2 },
      employees: 1,
      buyVerb: "Recruit",
      originalLocks: ['stone-tools']
    }
  },
  {
    template: {
      id: 'reed-gatherer',
      type: 'building',
      name: 'Reed gatherer',
      desc: 'A sheep with a sharp rock can cut down reeds, which are in turn useful material. So, sheep, meet rock.',
      branch: 'tools',
      rawCost: { 'stone tools': 5 },
      rawProduction: { reed: 0.42 },
      rawStorage: { reed: 6 },
      employees: 1,
      buyVerb: "Cut",
      originalLocks: [ 'basketry' ]
    }
  },
  {
    template: {
      id: 'storage-cave',
      type: 'building',
      name: 'Storage cave',
      desc: 'With enough reed, sheep can weave baskets and store them in a cave, instead of using that cave to live there. It helps in storing large quantites of various products and materials.',
      branch: 'housing',
      rawCost: { reed: 20, wood: 15 },
      rawStorage: { wood: 15, rocks: 15, reed: 10, 'stone tools': 10, vegetables: 10, "raw meat": 5, "meat": 10, "raw hides": 10, "hides": 10, "raw fish": 5, fish: 15 },
      buyVerb: "Weave baskets",
      originalLocks: [ 'basketry' ]
    }
  },
  {
    template: {
      id: 'spearfisher',
      type: 'building',
      name: "Spearfisher",
      desc: "Sheep with a sharp stick that is not afraid of water can gather plenty of fish.",
      branch: 'hunting',
      rawCost: { wood: 5, vegetables: 10 },
      rawConsumption: { wood: 0.02 },
      rawProduction: { "raw fish": 0.37 },
      rawStorage: { "raw fish": 4 },
      employees: 1,
      buyVerb: "Fish",
      originalLocks: [ 'fishing' ]
    }
  },
  {
    template: {
      id: 'hunter',
      type: 'building',
      name: "Hunter",
      desc: "Well armed sheep that hunts animals for their meat. They are known for going beyond the known lands on occasion, too.",
      branch: "hunting",
      rawCost: { "stone tools": 2 },
      rawConsumption: { "stone tools": 0.02 },
      rawProduction: { "raw meat": 0.6, "raw hide": 0.1 },
      employees: 1,
      buyVerb: "Recruit",
      originalLocks: [ 'hunting' ]
    }
  },
  {
    template: {
      id: 'cook',
      type: 'building',
      name: "Fire pit",
      desc: "Once the sheep discovered that mashed and cooked vegetables, tubers and meat are more tasty than raw, there has been no going back.",
      branch: 'food',
      rawCost: { wood: 30, 'stone tools': 1, 'raw meat': 5 },
      rawConsumption: { "raw meat": 1, "raw fish": 1, wood: 2 },
      rawProduction: { fish: 0.33, meat: 0.33 },
      employees: 1,
      buyVerb: "Dig",
      originalLocks: [ 'cooking' ]
    }
  },
  {
    template: {
      id: 'hide-scraper',
      type: 'building',
      name: "Hide scraper",
      desc: "Raw animal hides aren't very useful - and they are quite stinky! This hard-working sheep can remove all the unnecessary bits and transform animal skins into useful hides.",
      branch: "tools",
      rawCost: { 'stone tools': 2, 'raw hide': 5 },
      rawConsumption: { 'raw hide': 0.27 },
      rawProduction: { "clean hides": 0.19 },
      rawStorage: { 'clean hides': 3 },
      employees: 1,
      buyVerb: "Scrape",
      originalLocks: [ 'clothing' ]
    }
  }
];

export default buildings;
