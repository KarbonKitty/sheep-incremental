export default class GameState {
  lastTick: number;

  pastureSize = 100;
  grassPerPastureUnit = 1;

  grass = 0;
  gps = 10;

  hay = 0;
  hps = 0;

  constructor() {
    this.lastTick = Date.now();
  }
}