export default class GameState {
  lastTick: number;
  timeElapsed: number;

  grass = 0;
  gps = 0;

  constructor() {
    this.lastTick = Date.now();
    this.timeElapsed = 0;
  }

  tick(currentTick: number)
  {
    let deltaT = currentTick - this.lastTick;
    this.lastTick = currentTick;

    this.timeElapsed += deltaT;

    this.recalculateGrass(deltaT);
  }

  private recalculateGrass(deltaT: number) {
    this.gps = 10;
    this.grass += this.gps * deltaT / 1000;
  }
}
