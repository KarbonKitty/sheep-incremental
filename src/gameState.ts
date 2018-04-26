import { Currency, Map, Lock } from "./classes/baseClasses";
import IResource from "./classes/IResource";
import IProducer from "./classes/IProducer";
import IDiscovery from "./classes/IDiscovery";
import discoveriesData from "./data/discoveries";
import { producersData } from "./data/producers";
import IBuyable from "./classes/IBuyable";
import locksData from "./data/locks";

export default class GameState {
  lastTick: number;
  currentSelection: IBuyable;

  locks: Map<boolean>;

  discoveries: IDiscovery[];

  producers: IProducer[];

  resources: Map<IResource> = {
    cash: { name: "Cash", amount: 100, gainPerSecond: 0, precision: 0 },
    wheat: { name: "Wheat", amount: 0, gainPerSecond: 0, precision: 0, limit: 100 }
  }

  constructor() {
    this.lastTick = Date.now();

    this.producers = producersData;
    this.discoveries = discoveriesData;

    this.currentSelection = this.producers[0];

    this.locks = locksData;
  }
}
