export default class Resource {
  limit: number | null;
  gainPerSecond: number;

  constructor(public name: string, limit: number | null = null, public amount = 0, public precision = 2) {
    this.gainPerSecond = 0;
    this.limit = limit;
  }
}