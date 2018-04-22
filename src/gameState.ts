import { Currency, Map } from "./classes/baseClasses";
import IResource from "./classes/IResource";
import IProducer from "./classes/IProducer";
import { producersData } from "./data/producers";

export default class GameState {
  lastTick: number;

  producers: IProducer[];

  resources: Map<IResource> = {
    cash: { name: "Cash", amount: 100, gainPerSecond: 0, precision: 0 },
    wheat: { name: "Wheat", amount: 0, gainPerSecond: 0, precision: 0, limit: 100 }
  }

  constructor() {
    this.lastTick = Date.now();

    this.producers = producersData;
  }
}
