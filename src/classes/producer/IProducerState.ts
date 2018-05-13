import IGameObjectState from "../gameObject/IGameObjectState";
import { Price } from "../baseClasses";

export default interface IProducerState extends IGameObjectState {
  quantity: number;
  baseProduction?: Price;
  baseConsumption?: Price;
  productionMultiplier?: Price;
  consumptionMultiplier?: Price;
}