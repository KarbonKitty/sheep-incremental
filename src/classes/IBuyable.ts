import { CurrencyValue } from "./baseClasses";
import GameState from "../gameState";

export default interface IBuyable {
  buy(state: GameState): void;
  getCurrentPrice(): CurrencyValue[];
}
