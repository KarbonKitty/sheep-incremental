import { IResourcesTemplateData } from "../classes/baseClasses";

const resourceTemplates: IResourcesTemplateData = {
  advancement: { name: "advancement", precision: 0, originalLocks: ['__prestige__'] },
  travels: { name: "travels", precision: 3, baseLimit: 1, originalLocks: [] },
  wood: { name: "wood", precision: 1, baseLimit: 25, originalLocks: [] },
  folklore: { name: "folklore", precision: 1, baseLimit: 100, originalLocks: [] },
  rocks: { name: "rocks", precision: 1, baseLimit: 10, originalLocks: ['stone-tools'] },
  'stone tools': { name: "stone tools", precision: 2, baseLimit: 0, originalLocks: ['stone-tools'] },
  reed: { name: "reeds", precision: 1, baseLimit: 10, originalLocks: [ 'basketry' ]},
  'raw fish': { name: "raw fish", precision: 1, baseLimit: 0, originalLocks: [ 'fishing' ]},
  'raw meat': { name: "raw meat", precision: 1, baseLimit: 0, originalLocks: [ 'hunting' ]},
  'animal bone': { name: "animal bone", precision: 1, baseLimit: 5, originalLocks: [ 'hunting' ]},
  'raw hide': { name: "raw hides", precision: 1, baseLimit: 0, originalLocks: [ 'hunting' ]},
  fish: { name: "fish", precision: 2, baseLimit: 5, originalLocks: [ 'cooking' ]},
  meat: { name: "meat", precision: 2, baseLimit: 5, originalLocks: [ 'cooking' ]},
  'clean hides': { name: "clean hides", precision: 2, baseLimit: 5, originalLocks: [ 'clothing' ]}
};

export default resourceTemplates;
