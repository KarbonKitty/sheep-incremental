import { CurrencyValue } from './../baseClasses';
import IGameObject from './../IGameObject';

export default interface IProducerTemplate extends IGameObject {
  production: CurrencyValue[];
  consumption: CurrencyValue[];
}