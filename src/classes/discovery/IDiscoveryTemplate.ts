import { Lock } from './../baseClasses';
import IGameObject from './../IGameObject';

export default interface IDiscoveryTemplate extends IGameObject {
  unlocks: Lock[];
}