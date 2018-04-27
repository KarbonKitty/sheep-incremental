import { CurrencyValue } from './baseClasses';
import IGameObject from './IGameObject';

export default interface IProducer extends IGameObject {
  quantity: number;
  production: CurrencyValue[];
  consumption: CurrencyValue[];
  // TODO: increasing price
}