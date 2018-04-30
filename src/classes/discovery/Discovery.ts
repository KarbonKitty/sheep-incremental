import IDiscoveryState from "./IDiscoveryState";
import IDiscoveryTemplate from "./IDiscoveryTemplate";
import { CurrencyValue, Lock } from "../baseClasses";
import IBuyable from "../IBuyable";
import GameState from "../../gameState";
import GameEngine from "../../engine/gameEngine";

export default class Discovery implements IDiscoveryTemplate, IDiscoveryState, IBuyable {
  template: IDiscoveryTemplate;
  readonly type = "discovery";

  public get id() : string {
    return this.template.id;
  }
  public get name(): string {
    return this.template.name;
  }
  public get desc(): string {
    return this.template.desc;
  }
  public get rawCost(): CurrencyValue[] {
    return this.template.rawCost;
  }
  public get unlocks(): Lock[] {
    return this.template.unlocks;
  }
  public get buyVerb(): string {
    return this.template.buyVerb;
  }
  public get locks(): Lock[] {
    return this.template.locks;
  }

  done: boolean;

  constructor(template: IDiscoveryTemplate, state: IDiscoveryState) {
    this.template = template;
    this.done = state.done;
  }

  buy(state: GameState) {
    this.done = true;
    this.unlocks.forEach(key => GameEngine.removeLock(state, key));
  }

  getCurrentPrice() {
    return this.rawCost;
  }
}