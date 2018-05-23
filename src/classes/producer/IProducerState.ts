import { Price } from "../baseClasses";
import IGameObjectState from "../gameObject/IGameObjectState";

export default interface IProducerState extends IGameObjectState {
  quantity: number;
  baseProduction?: Price;
  baseConsumption?: Price;
  productionMultiplier?: Price;
  consumptionMultiplier?: Price;
  disabled?: boolean;
}
