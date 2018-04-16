import Resource from "./classes/resource";

export default class GameState {
  lastTick: number;

  pastureSize = 100;
  grassPerPastureUnit = 1;

  grass = new Resource("Grass", this.pastureSize * this.grassPerPastureUnit, 10, 0, 0);
  hay = new Resource("Hay", null, null, 0, 2);

  constructor() {
    this.lastTick = Date.now();
  }
}