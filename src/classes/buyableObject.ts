import { Cost, Production } from "./baseClasses";

export interface IBuyable {
  name: string;
  desc: string;
  id: string;
  quantity: number;
  visible: boolean;
  tooltip: string;
  buyVerb: string;
}

export interface IProducer extends IBuyable {
  cost: Cost;
  production: Production;
  // TODO: requirements
}