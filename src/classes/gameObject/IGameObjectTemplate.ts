import { GameObjectType, CurrencyValue, Lock } from "../baseClasses";

export default interface IGameObjectTemplate {
  id: string;
  type: GameObjectType;
  name: string;
  desc: string;
  rawCost: CurrencyValue[];
  buyVerb: string;
}