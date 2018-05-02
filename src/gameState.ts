import { Currency, Map, Lock } from "./classes/baseClasses";
import IResource from "./classes/IResource";
import Discovery from "./classes/discovery/Discovery";
import discoveriesData from "./data/discoveries";
import { producersData } from "./data/producers";
import locksData from "./data/locks";
import Producer from "./classes/producer/Producer";
import GameObject from "./classes/gameObject/GameObject";
import gameEngine from "./engine/gameEngine";

export default class GameState {
  lastTick: number;
  currentSelection: GameObject;

  locks: Map<boolean>;

  discoveries: Discovery[];

  producers: Producer[];

  resources: Map<IResource> = {
    cash: { name: "Cash", amount: 100, gainPerSecond: 0, precision: 0 },
    wheat: { name: "Wheat", amount: 100, gainPerSecond: 0, precision: 0, limit: 100 }
  }

  constructor() {
    this.lastTick = Date.now();

    this.producers = [];

    producersData.forEach(pd => {
      const producer = new Producer(pd, { quantity: 0 });
      producer.onBuy.push(() => {
        producer.quantity++;
      });
      this.producers.push(producer);
    });

    this.discoveries = [];

    discoveriesData.forEach(dd => {
      const discovery = new Discovery(dd, { done: false });
      discovery.onBuy.push(() => {
        discovery.done = true;
        discovery.unlocks.forEach(key => gameEngine.removeLock(this, key));
      });
      this.discoveries.push(discovery);
    })

    this.currentSelection = this.producers[0];

    this.locks = locksData;
  }
}
