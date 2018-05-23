import { UpgradeEffect } from "../baseClasses";
import IGameObjectTemplate from "../gameObject/IGameObjectTemplate";

export default interface IUpgradeTemplate extends IGameObjectTemplate {
  // this is ID of an object that should show this upgrade
  objectId?: string;
  effects: UpgradeEffect[];
}
