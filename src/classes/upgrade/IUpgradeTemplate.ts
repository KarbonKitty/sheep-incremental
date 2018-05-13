import IGameObjectTemplate from "../gameObject/IGameObjectTemplate";
import { UpgradeEffect } from "../baseClasses";

export default interface IUpgradeTemplate extends IGameObjectTemplate {
  // this is ID of an object that should show this upgrade
  objectId?: string;
  effects: UpgradeEffect[];
}