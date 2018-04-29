import { CurrencyValue } from "./baseClasses";

export default interface IBuyable {
  buy(): void;
  getCurrentPrice(): CurrencyValue[];
}
