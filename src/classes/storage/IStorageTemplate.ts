import { Price } from "../baseClasses";
import IGameObjectTemplate from "../gameObject/IGameObjectTemplate";

export default interface IStorageTemplate extends IGameObjectTemplate {
  storage: Price;
}
