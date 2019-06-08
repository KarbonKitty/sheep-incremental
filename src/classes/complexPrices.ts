import { Price, PriceUpgradeEffect } from "./baseClasses";
import { multiplyPrices, sumPrices } from "./helpers";

export interface IComplexPriceState {
    basePrice: Price;
    additive?: Price;
    multiplier?: Price;
}

export class ComplexPrice implements IComplexPriceState {
    basePrice: Price;
    additive?: Price;
    multiplier?: Price;

    constructor(state: IComplexPriceState) {
        const stateClone = JSON.parse(JSON.stringify(state));

        this.basePrice = stateClone.basePrice;
        this.multiplier = stateClone.multiplier;
    }

    public getTotal() {
        const additivePrice = sumPrices(this.basePrice, this.additive || {});
        return multiplyPrices(additivePrice, this.multiplier || {});
    }

    public addModifier(modifier: PriceUpgradeEffect) {
        if (modifier.type === 'add') {
            this.additive = sumPrices(this.additive || {}, modifier.scale);
        } else if (modifier.type === 'mul') {
            this.multiplier = multiplyPrices(this.multiplier || {}, modifier.scale);
        } else {
            throw new Error(`Unknown upgrade effect type: ${modifier.type}`);
        }
    }

    public save() {
        return { baseProduction: this.basePrice, multiplier: this.multiplier };
    }
}
