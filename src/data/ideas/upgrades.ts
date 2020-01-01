import { IIdeaState, IIdeaTemplate } from '../../classes/Idea';

type IdeaData = {
  template: IIdeaTemplate,
  startingState?: IIdeaState
};

const upgrades: IdeaData[] = [
  {
    template: {
      id: 'less-fires',
      type: 'idea',
      name: "Keep less fires going",
      desc: "When sheep learn how to start the fire whenever they want, they can stop keeping so many fires going; even if all the fires of the tribe are extinguished, they can now start new ones!",
      branch: "construction",
      rawCost: { folklore: 50, "stone tools": 3, rocks: 15 },
      effects: [{
        affectedObjectId: 'wood-gatherer',
        affectedProperty: 'production',
        type: 'add',
        scale: { wood: 0.2 }
      }],
      buyVerb: "Stop the fire",
      originalLocks: [ 'firestarting' ]
    }
  },
  {
    template: {
      id: 'torches-hunters',
      type: 'idea',
      name: "Give your hunters torches",
      desc: "With burning torches, they can scare away animals they are not yet ready to hunt. They can also hunt longer, and return at night. This will mean that they will gather more meat, but also burn some wood.",
      branch: "hunting",
      rawCost: { folkolre: 60, wood: 15 },
      effects: [{
        affectedObjectId: 'hunter',
        affectedProperty: 'production',
        type: 'mul',
        scale: { "raw meat": 1.5, "raw hide": 1.5, "animal bone": 1.5 }
      },{
        affectedObjectId: 'hunter',
        affectedProperty: 'consumption',
        type: 'add',
        scale: { wood: 0.07 }
      }],
      buyVerb: "Start the fire",
      originalLocks: [ 'hunting', 'firestarting' ]
    }
  },
  {
    template: {
      id: 'torches-travels',
      type: 'idea',
      name: "Give your wanderers torches",
      desc: "Your explorers can see more, travel longer, and defend themselves better with burning torches at their disposal. They will use some wood, sure, but it is probably worth it.",
      branch: "expedition",
      rawCost: { folkolre: 60, wood: 15 },
      effects: [{
        affectedObjectId: 'wanderer',
        affectedProperty: 'production',
        type: 'mul',
        scale: { travels: 1.5 }
      },{
        affectedObjectId: 'wanderer',
        affectedProperty: 'consumption',
        type: 'add',
        scale: { wood: 0.07 }
      }],
      buyVerb: "Start the fire",
      originalLocks: [ 'firestarting' ]
    }
  },
  {
    template: {
      id: 'baskets-wanderers',
      type: 'idea',
      name: "Equip wanderers with supply baskets",
      desc: "When your explorers can take with them more supplies in baskets, and not only those that they can stuff in their pouches, they will be able to gather more items and travel further.",
      branch: "expedition",
      rawCost: { folklore: 80, reed: 20 },
      effects: [{
        affectedObjectId: 'land-search',
        scale: [{
          type: "always",
          resources: { folklore: 5 }
        },{
          type: "common",
          resources: { rocks: 5 }
        },{
          type: "uncommon",
          resources: { wood: 5 }
        }]
      },{
        affectedObjectId: 'land-search',
        affectedProperty: 'cost',
        type: 'add',
        scale: { reed: 10 }
      },{
        affectedObjectId: 'northern-hills',
        scale: [{
          type: "always",
          resources: { folklore: 3 }
        },{
          type: "common",
          resources: { rocks: 7 }
        },{
          type: "rare",
          resources: { wood: 5, folklore: 2 }
        }]
      },{
        affectedObjectId: 'northern-hills',
        affectedProperty: 'cost',
        type: 'add',
        scale: { reed: 10 }
      }],
      buyVerb: "Give them baskets",
      originalLocks: [ 'basketry' ]
    }
  },
  {
    template: {
      id: 'baskets-rocks',
      type: 'idea',
      name: "Gather rocks in baskets",
      desc: "With baskets, it is much easier for your sheep to gather rocks, because they don't have to come back to camp quite so often.",
      branch: "tools",
      rawCost: { folklore: 65, reed: 30 },
      effects: [{
        affectedObjectId: 'rock-gatherer',
        affectedProperty: 'production',
        type: 'add',
        scale: { rocks: 0.15 }
      }],
      buyVerb: "More baskets!",
      originalLocks: [ 'basketry' ]
    }
  },
  {
    template: {
      id: 'group-food-search',
      type: 'idea',
      name: "Look for food in groups",
      desc: "Once the idea of cooperation takes hold, sheep come up with all sorts of cooperatives; for example, when some of them look for food, other can make sure that nobody attacks food gatherers. It's more effective than always looking behind one's shoulder.",
      branch: 'food',
      rawCost: { folklore: 100 },
      effects: [{
        affectedObjectId: 'food-gatherer',
        affectedProperty: 'production',
        type: 'mul',
        scale: { vegetables: 0.5 }
      }],
      buyVerb: "Form groups",
      originalLocks: [ 'cooperation' ]
    }
  },
  {
    template: {
      id: 'wander-together',
      type: 'idea',
      name: "Wander in pairs",
      desc: "Sometimes it is more effective to have several pairs of eyes look over a stretch of land, instead of doing it one by one; it means that while wanderers cover less ground, they do so more thoroughly.",
      branch: 'expedition',
      rawCost: { folklore: 85 },
      effects: [{
        affectedObjectId: 'wanderer',
        affectedProperty: 'production',
        type: 'add',
        scale: { travels: 0.0005 }
      }],
      buyVerb: "Travel together",
      originalLocks: [ 'cooperation' ]
    }
  },
  {
    template: {
      id: 'fish-for-travels',
      type: 'idea',
      name: "Take fish for travels",
      desc: "Fish are good food, even if they tend to spoil quickly. They will help when travelling.",
      branch: 'expedition',
      rawCost: { folklore: 50, fish: 30 },
      effects: [{
        affectedObjectId: 'land-search',
        scale: [{
          type: "common",
          resources: { folklore: 5 }
        },{
          type: "exceptional",
          sites: { cave: 1 }
        }]
      },{
        affectedObjectId: 'land-search',
        affectedProperty: 'cost',
        type: 'add',
        scale: { fish: 5 }
      },{
        affectedObjectId: 'northern-hills',
        scale: [{
          type: "always",
          resources: { rocks: 3 }
        },{
          type: "common",
          resources: { folklore: 6 }
        },{
          type: "uncommon",
          resources: { wood: 3, folklore: 1 }
        },{
          type: "exceptional",
          resources: { "raw meat": 5, "raw hides": 2, "animal bone": 2, folklore: 14 }
        }]
      },{
        affectedObjectId: 'northern-hills',
        affectedProperty: 'cost',
        type: 'add',
        scale: { fish: 5 }
      }],
      buyVerb: "Pack the fish",
      originalLocks: [ 'fishing' ]
    }
  },
  {
    template: {
      id: 'clothes-for-gatherers',
      type: 'idea',
      name: "Get clothes for gatherers",
      desc: "Clothed in animal skins, gatherers will be able to work longer without scratches, bruises, and being cold.",
      branch: 'food',
      rawCost: { folklore: 75, "clean hides": 15 },
      effects: [{
        affectedObjectId: 'wood-gatherer',
        affectedProperty: 'production',
        type: 'mul',
        scale: { wood: 0.25 }
      },{
        affectedObjectId: 'wood-gatherer',
        affectedProperty: 'cost',
        type: 'add',
        scale: { "clean hides": 1 }
      },{
        affectedObjectId: 'food-gatherer',
        affectedProperty: 'production',
        type: 'mul',
        scale: { vegetables: 0.25 }
      },{
        affectedObjectId: 'food-gatherer',
        affectedProperty: 'cost',
        type: 'add',
        scale: { "clean hides": 1 }
      },{
        affectedObjectId: 'rock-gatherer',
        affectedProperty: 'production',
        type: 'mul',
        scale: { rocks: 0.25 }
      }, {
        affectedObjectId: 'rock-gatherer',
        affectedProperty: 'cost',
        type: 'add',
        scale: { "clean hides": 1 }
      }],
      buyVerb: "Wrap them up",
      originalLocks: [ 'clothing' ]
    }
  }
];

export default upgrades;
