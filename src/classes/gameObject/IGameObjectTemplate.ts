import { GameObjectType, Price } from "../baseClasses";

export default interface IGameObjectTemplate {
  id: string;
  type: GameObjectType;
  name: string;
  desc: string;
  rawCost: Price;
  buyVerb: string;
}