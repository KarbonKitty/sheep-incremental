import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { IProductionState, Production } from "./production";
import { Price } from "./baseClasses";
import { PriceHelper } from "./helpers";

export interface IBuildingState extends IGameObjectState {
    quantity: number;
    production?: IProductionState;
    consumption?: IProductionState;
    disabled?: boolean;
}

export interface IBuildingTemplate extends IGameObjectTemplate {
    rawProduction?: Price;
    rawConsumption?: Price;
    rawStorage?: Price;
}

export class Building extends GameObject {
    readonly type = 'building';
    readonly costMultiplier = 1.15;

    template: IBuildingTemplate;

    production?: Production;
    consumption?: Production;
    storage?: Price;

    quantity: number;
    disabled: boolean;

    onBuy = [] as Array<() => void>;

    public get currentPrice(): Price {
        return PriceHelper.mulPriceByNumber(this.rawCost, Math.pow(this.costMultiplier, this.quantity));
    }

    constructor(template: IBuildingTemplate, state: IBuildingState) {
        super(template, state);

        this.template = template;

        if (typeof template.rawStorage !== 'undefined') {
            this.storage = template.rawStorage;
        }

        if (typeof state.production !== 'undefined') {
            this.production = new Production(state.production);
        } else if (typeof template.rawProduction !== 'undefined') {
            this.production = new Production({ baseProduction: template.rawProduction });
        }

        if (typeof state.consumption !== 'undefined') {
            this.consumption = new Production(state.consumption);
        } else if (typeof template.rawConsumption !== 'undefined') {
            this.consumption = new Production({ baseProduction: template.rawConsumption });
        }

        this.quantity = state.quantity;

        this.disabled = state.disabled || false;
    }

    getProduction(deltaT: number) {
        if (typeof this.production === 'undefined') {
            return undefined;
        } else {
            return PriceHelper.mulPriceByNumber(this.production.getTotal(), this.quantity * deltaT / 1000);
        }
    }

    getConsumption(deltaT: number) {
        if (typeof this.consumption === 'undefined') {
            return undefined;
        } else {
            return PriceHelper.mulPriceByNumber(this.consumption.getTotal(), this.quantity * deltaT / 1000);
        }
    }

    getStorage() {
        if (typeof this.storage === 'undefined') {
            return undefined;
        } else {
            return PriceHelper.mulPriceByNumber(this.storage, this.quantity);
        }
    }

    buy() {
        this.onBuy.forEach(handler => handler());
    }

    save(): IBuildingState {
        return {
            quantity: this.quantity,
            production: this.production,
            consumption: this.consumption,
            disabled: this.disabled,
            locks: this.locks
        };
    }
}
