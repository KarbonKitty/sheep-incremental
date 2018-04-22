import { SingleCost, Production } from "./baseClasses";

export default interface IBuyable {
  name: string;
  desc: string;
  id: string;
  quantity: number;
  visible: boolean;
  tooltip: string;
  buyVerb: string;
}

