import { IResourcesTemplateData } from "../classes/baseClasses";

const resourceTemplates: IResourcesTemplateData = {
  territory: { name: "territory", precision: 2, baseLimit: 250, originalLocks: [] },
  wood: { name: "wood", precision: 1, baseLimit: 25, originalLocks: [] },
  flint: { name: "flint", precision: 1, baseLimit: 10, originalLocks: [] },
  "stone tools": { name: "stone tools", precision: 2, baseLimit: 0, originalLocks: ['stone-tools'] },
  grain: { name: "grain", precision: 0, baseLimit: 100, originalLocks: ['agriculture'] },
  flour: { name: "flour", precision: 1, baseLimit: 0, originalLocks: ['flour'] },
  water: { name: "water", precision: 0, baseLimit: 250, originalLocks: ['stone-tools'] },
  bread: { name: "bread", precision: 2, baseLimit: 0, originalLocks: ['fire', 'flour'] },
  beer: { name: "beer", precision: 2, baseLimit: 0, originalLocks: ['fermentation'] },
  "mud bricks": { name: "mud bricks", precision: 1, baseLimit: 0, originalLocks: ['stone-tools'] },
  "raw meat": { name: "raw meat", precision: 2, baseLimit: 50, originalLocks: ['hunting'] },
  meat: { name: "meat", precision: 2, baseLimit: 0, originalLocks: ['hunting'] },
  clay: { name: "clay", precision: 0, baseLimit: 50, originalLocks: ['pyrotechnology'] },
  stone: { name: "stone", precision: 0, baseLimit: 50, originalLocks: ['pyrotechnology'] },
  charcoal: { name: "charcoal", precision: 1, baseLimit: 10, originalLocks: ['pyrotechnology'] },
  pottery: { name: "pottery", precision: 2, baseLimit: 10, originalLocks: ['pottery'] },
  leather: { name: "leather", precision: 1, baseLimit: 5, originalLocks: ['hunting', '__impossible__'] },
  "animal skin": { name: "animal skin", precision: 1, baseLimit: 5, originalLocks: ['hunting'] },
  "animal bone": { name: "animal bone", precision: 1, baseLimit: 5, originalLocks: ['hunting'] },
  "carvings": { name: "carvings", precision: 2, baseLimit: 1, originalLocks: ['complex-tools', 'stone-tools'] },
  "complex tools": { name: "complex stone tools", precision: 2, baseLimit: 0, originalLocks: ['complex-tools'] },
  microliths: { name: "microliths", precision: 2, baseLimit: 5, originalLocks: ['microliths']},
  folklore: { name: "folklore", precision: 1, baseLimit: 100, originalLocks: [] },
  advancement: { name: "advancement", precision: 0, originalLocks: ['__prestige__'] }
};

export default resourceTemplates;
