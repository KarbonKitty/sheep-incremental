import { Currency, Map } from "./classes/baseClasses";
import IResource from "./classes/IResource";
import IProducer from "./classes/IProducer";
import { producersData } from "./data/producers";
import IBuyable from "./classes/IBuyable";

export default class GameState {
  lastTick: number;

  currentSelection: IBuyable;

  producers: IProducer[];

  resources: Map<IResource> = {
    cash: { name: "Cash", amount: 100, gainPerSecond: 0, precision: 0 },
    wheat: { name: "Wheat", amount: 0, gainPerSecond: 0, precision: 0, limit: 100 }
  }

  constructor() {
    this.lastTick = Date.now();

    this.producers = producersData;

    this.currentSelection = this.producers[0];
  }
}
