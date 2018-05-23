import { Lock } from "../baseClasses";
import IGameObjectTemplate from "../gameObject/IGameObjectTemplate";

export default interface IDiscoveryTemplate extends IGameObjectTemplate {
  unlocks: Lock[];
}
