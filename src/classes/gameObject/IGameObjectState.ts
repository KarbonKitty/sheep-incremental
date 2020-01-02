import { Lock } from "../core";
import { ComplexPrice } from "../complexPrices";

export default interface IGameObjectState {
  cost?: ComplexPrice;
  locks?: Lock[];
}
