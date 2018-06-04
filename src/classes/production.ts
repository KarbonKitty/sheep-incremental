import { Price, UpgradeEffect } from "./baseClasses";
import { multiplyPrices, sumPrices } from "./helpers";

export interface IProductionState {
    baseProduction: Price;
    multiplier?: Price;
}

export class Production implements IProductionState {
    baseProduction: Price;
    multiplier?: Price;

    constructor(state: IProductionState) {
        const stateClone = JSON.parse(JSON.stringify(state));

        this.baseProduction = stateClone.baseProduction;
        this.multiplier = stateClone.multiplier;
    }

    public getTotal() {
        return multiplyPrices(this.baseProduction, this.multiplier || {});
    }

    public addModifier(modifier: UpgradeEffect) {
        if (modifier.type === 'add') {
            this.baseProduction = sumPrices(this.baseProduction, modifier.scale);
        } else if (modifier.type === 'mul') {
            this.multiplier = multiplyPrices(this.multiplier || {}, modifier.scale);
        } else {
            throw new Error(`Unknown upgrade effect type: ${modifier.type}`);
        }
    }

    public save() {
        return { baseProduction: this.baseProduction, multiplier: this.multiplier };
    }
}
