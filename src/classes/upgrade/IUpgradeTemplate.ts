import IGameObjectTemplate from "../gameObject/IGameObjectTemplate";
import { UpgradeEffect } from "../baseClasses";

export default interface IUpgradeTemplate extends IGameObjectTemplate {
  effects: UpgradeEffect[];
}