import IGameObject from "./IGameObject";
import { Lock } from "../classes/baseClasses";

export default interface IDiscovery extends IGameObject {
  unlocks: Lock;
}