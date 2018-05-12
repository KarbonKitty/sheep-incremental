import { Price } from './../baseClasses';
import IGameObjectTemplate from './../gameObject/IGameObjectTemplate';

export default interface IProducerTemplate extends IGameObjectTemplate {
  rawProduction: Price;
  rawConsumption: Price;
}