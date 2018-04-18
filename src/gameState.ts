import { Currency } from "./classes/baseClasses";
import Resource from "./classes/resource";
import { IProducer } from "./classes/buyableObject";

export default class GameState {
  lastTick: number;

  pastureSize = 100;
  grassPerPastureUnit = 1;

  grass = new Resource("Grass", this.pastureSize * this.grassPerPastureUnit, 10, 0, 0);
  hay = new Resource("Hay", null, null, 0, 2);
  wool = new Resource("Wool", 50, 0, 0, 2);

  producers = <IProducer[]>[];

  constructor() {
    this.lastTick = Date.now();

    this.producers.push({
      name: "Sheep",
      desc: "Test sheep",
      id: 'small-sheep',
      cost: { actualCost: { currency: "grass", amount: 50 }},
      production: { currency: "wool", amountPerSecond: 1 },
      quantity: 1,
      visible: true,
      tooltip: "Great grass-eaters, too!",
      buyVerb: "Attract"
    });
  }
}