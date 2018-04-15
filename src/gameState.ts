export default class GameState {
  lastTick: number;
  timeElapsed: number;

  constructor() {
    this.lastTick = Date.now();
    this.timeElapsed = 0;
  }

  tick(currentTick: number)
  {
    let deltaT = currentTick - this.lastTick;
    this.lastTick = currentTick;

    this.timeElapsed += deltaT;
  }
}
