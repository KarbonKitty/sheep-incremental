import IGameObjectTemplate from "../gameObject/IGameObjectTemplate";
import { CurrencyValue } from "../baseClasses";

export default interface IStorageTemplate extends IGameObjectTemplate {
  storage: CurrencyValue[];
}