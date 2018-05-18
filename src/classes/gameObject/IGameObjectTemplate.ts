import { GameObjectType, Price, IndustryBranch } from "../baseClasses";

export default interface IGameObjectTemplate {
  id: string;
  type: GameObjectType;
  name: string;
  desc: string;
  branch: IndustryBranch;
  rawCost: Price;
  buyVerb: string;
}