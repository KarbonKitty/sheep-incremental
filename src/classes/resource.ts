export default class Resource {
  gainPerSecond: number | null;
  limit: number | null;

  constructor(public name: string, limit: number | null = null, gainPerSecond: number | null = null, public amount = 0, public precision = 2) {
    this.gainPerSecond = gainPerSecond;
    this.limit = limit;
  }
}