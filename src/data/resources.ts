import { IResourcesData } from "../classes/baseClasses";

const resources: IResourcesData = {
  herbs: { name: "herbs", amount: 25, gainPerSecond: 0, precision: 2, limit: 250, locks: [] },
  wood: { name: "wood", amount: 0, gainPerSecond: 0, precision: 1, limit: 25, locks: [] },
  flint: { name: "flint", amount: 0, gainPerSecond: 0, precision: 1, limit: 10, locks: [] },
  "stone tools": { name: "stone tools", amount: 0, gainPerSecond: 0, precision: 2, limit: 0, locks: ['stone-tools'] },
  grain: { name: "grain", amount: 0, gainPerSecond: 0, precision: 0, limit: 100, locks: ['agriculture'] },
  flour: { name: "flour", amount: 0, gainPerSecond: 0, precision: 1, limit: 0, locks: ['flour'] },
  water: { name: "water", amount: 0, gainPerSecond: 0, precision: 0, limit: 250, locks: ['stone-tools'] },
  bread: { name: "bread", amount: 0, gainPerSecond: 0, precision: 2, limit: 0, locks: ['fire', 'flour'] },
  beer: { name: "beer", amount: 0, gainPerSecond: 0, precision: 2, limit: 0, locks: ['fermentation'] },
  "mud bricks": { name: "mud bricks", amount: 0, gainPerSecond: 0, precision: 1, limit: 0, locks: ['stone-tools'] },
  "raw meat": { name: "raw meat", amount: 0, gainPerSecond: 0, precision: 2, limit: 50, locks: ['hunting'] },
  meat: { name: "meat", amount: 0, gainPerSecond: 0, precision: 2, limit: 0, locks: ['hunting'] },
  clay: { name: "clay", amount: 0, gainPerSecond: 0, precision: 0, limit: 50, locks: ['pyrotechnology'] },
  stone: { name: "stone", amount: 0, gainPerSecond: 0, precision: 0, limit: 50, locks: ['pyrotechnology'] },
  charcoal: { name: "charcoal", amount: 0, gainPerSecond: 0, precision: 1, limit: 10, locks: ['pyrotechnology'] },
  pottery: { name: "pottery", amount: 0, gainPerSecond: 0, precision: 2, limit: 10, locks: ['pottery'] },
  advancement: { name: "advancement", amount: 0, gainPerSecond: 0, precision: 0, locks: ['__prestige__'] }
};

export default resources;
