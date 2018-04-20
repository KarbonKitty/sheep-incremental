import { Currency, Map } from "./classes/baseClasses";
import Resource from "./classes/resource";
import { IProducer } from "./classes/buyableObject";
import { producersData } from "./data/producers";

export default class GameState {
  lastTick: number;

  producers: IProducer[];

  resources = <Map<Resource>>{
    carbon: new Resource("Carbon", 100, 0, 0),
    oxygen: new Resource("Oxygen", null, 0, 2),
    hydrogen: new Resource("Hydrogen", 50, 0, 2)
  }

  constructor() {
    this.lastTick = Date.now();

    this.producers = producersData;
  }
}