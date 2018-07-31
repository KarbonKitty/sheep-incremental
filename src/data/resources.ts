import { IResourcesTemplateData } from "../classes/baseClasses";

const resourceTemplates: IResourcesTemplateData = {
  advancement: { name: "advancement", precision: 0, originalLocks: ['__prestige__'] },
  territory: { name: "territory", precision: 2, baseLimit: 250, originalLocks: [] },

  folklore: { name: "folklore", precision: 1, baseLimit: 100, originalLocks: [] },

  wood: { name: "wood", precision: 1, baseLimit: 25, originalLocks: [] },
  flint: { name: "flint", precision: 1, baseLimit: 10, originalLocks: [] },
  "stone tools": { name: "stone tools", precision: 2, baseLimit: 0, originalLocks: ['stone-tools'] },
  "complex tools": { name: "complex stone tools", precision: 2, baseLimit: 0, originalLocks: ['complex-tools'] },

  "raw meat": { name: "raw meat", precision: 2, baseLimit: 50, originalLocks: ['hunting'] },
  meat: { name: "meat", precision: 2, baseLimit: 0, originalLocks: ['hunting'] },
  "animal skin": { name: "animal skin", precision: 1, baseLimit: 5, originalLocks: ['hunting'] },

  "raw vegetables": { name: "raw vegetables", precision: 1, baseLimit: 50, originalLocks: [] },
  "vegetables": { name: "vegetables", precision: 2, baseLimit: 0, originalLocks: ['cooking'] },

};

export default resourceTemplates;
