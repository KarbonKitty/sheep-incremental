import IGameObjectTemplate from "../gameObject/IGameObjectTemplate";
import { Price } from "../baseClasses";

export default interface IStorageTemplate extends IGameObjectTemplate {
  storage: Price;
}