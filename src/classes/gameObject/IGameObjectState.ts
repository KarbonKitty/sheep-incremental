import { Lock } from "../baseClasses";
import { ComplexPrice } from "../complexPrices";

export default interface IGameObjectState {
  cost?: ComplexPrice;
  locks?: Lock[];
}
