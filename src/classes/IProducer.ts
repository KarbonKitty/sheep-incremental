import { CurrencyValue } from './baseClasses';
import IGameObject from './IGameObject';

export default interface IProducer extends IGameObject {
  production: CurrencyValue[];
  consumption: CurrencyValue[];
  // TODO: increasing price
}