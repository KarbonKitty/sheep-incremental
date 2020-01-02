import { GameObjectType, IndustryBranch, Price, Lock } from "../core";

export default interface IGameObjectTemplate {
  id: string;
  type: GameObjectType;
  name: string;
  desc: string;
  branch: IndustryBranch;
  rawCost: Price;
  buyVerb: string;
  originalLocks: Lock[];
}
