import { SingleCost, Production } from './baseClasses';
import IBuyable from "./IBuyable";

export default interface IProducer extends IBuyable {
  cost: SingleCost[];
  production: Production;
  // TODO: requirements
}