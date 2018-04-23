import { CurrencyValue } from './baseClasses';
import IBuyable from "./IBuyable";

export default interface IProducer extends IBuyable {
  production: CurrencyValue[];
  consumption: CurrencyValue[];
  // TODO: requirements
  // TODO: increasing price
}