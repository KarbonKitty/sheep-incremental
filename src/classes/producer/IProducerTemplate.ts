import { CurrencyValue } from './../baseClasses';
import IGameObjectTemplate from './../gameObject/IGameObjectTemplate';

export default interface IProducerTemplate extends IGameObjectTemplate {
  production: CurrencyValue[];
  consumption: CurrencyValue[];
}