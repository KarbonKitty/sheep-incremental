import { Lock } from "../baseClasses";
import { ComplexPrice } from "../production";

export default interface IGameObjectState {
  locks?: Lock[];
  cost?: ComplexPrice;
}
