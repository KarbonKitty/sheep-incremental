import { Price } from "../baseClasses";
import IGameObjectState from "../gameObject/IGameObjectState";
import { IProductionState } from "../production";

export default interface IProducerState extends IGameObjectState {
  quantity: number;
  production?: IProductionState;
  consumption?: IProductionState;
  disabled?: boolean;
}
