import { Price } from './../baseClasses';
import IGameObjectTemplate from './../gameObject/IGameObjectTemplate';

export default interface IProducerTemplate extends IGameObjectTemplate {
  production: Price;
  consumption: Price;
}