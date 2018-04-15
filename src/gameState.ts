export default class GameState {
  lastTick: number;

  pastureSize = 100;

  grass = 0;
  gps = 0;

  hay = 0;
  hps = 0;

  constructor() {
    this.lastTick = Date.now();
  }

  tick(currentTick: number)
  {
    let deltaT = currentTick - this.lastTick;
    this.lastTick = currentTick;

    this.recalculateGrass(deltaT);
    this.recalculateHay(deltaT);
  }

  private recalculateGrass(deltaT: number) {
    this.gps = 10;
    this.grass += this.gps * deltaT / 1000;
  }

  private recalculateHay(deltaT: number) {
    this.hps = 0;
    this.hay += this.hps * deltaT / 1000;
  }

  gatherGrass() {
    this.hay += this.grass;
    this.grass = 0;
  }
}