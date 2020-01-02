import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { IComplexPriceState, ComplexPrice } from "./complexPrices";
import { Price, SiteType } from "./core";
import { mulPriceByNumber } from "./helpers";

export interface IBuildingState extends IGameObjectState {
    quantity: number;
    production?: IComplexPriceState;
    consumption?: IComplexPriceState;
    storage?: IComplexPriceState;
    totalPrice?: IComplexPriceState;
    disabled?: boolean;
}

export interface IBuildingTemplate extends IGameObjectTemplate {
    rawProduction?: Price;
    rawConsumption?: Price;
    rawStorage?: Price;
    employees?: number;
    housing?: number;
    requiredSite?: SiteType;
}

export class Building extends GameObject {
    readonly type = 'building';
    readonly costMultiplier = 1.20;

    template: IBuildingTemplate;

    production?: ComplexPrice;
    consumption?: ComplexPrice;
    storage?: ComplexPrice;

    quantity: number;
    disabled: boolean;

    onBuy = [] as Array<() => void>;

    public get currentPrice(): Price {
        return mulPriceByNumber(this.cost.getTotal(), Math.pow(this.costMultiplier, this.quantity));
    }

    constructor(template: IBuildingTemplate, state: IBuildingState) {
        super(template, state);

        this.template = template;

        if (typeof state.storage !== 'undefined') {
            this.storage = new ComplexPrice(state.storage);
        } else if (typeof template.rawStorage !== 'undefined') {
            this.storage = new ComplexPrice({ basePrice: template.rawStorage });
        }

        if (typeof state.production !== 'undefined') {
            this.production = new ComplexPrice(state.production);
        } else if (typeof template.rawProduction !== 'undefined') {
            this.production = new ComplexPrice({ basePrice: template.rawProduction });
        }

        if (typeof state.consumption !== 'undefined') {
            this.consumption = new ComplexPrice(state.consumption);
        } else if (typeof template.rawConsumption !== 'undefined') {
            this.consumption = new ComplexPrice({ basePrice: template.rawConsumption });
        }

        this.quantity = state.quantity;

        this.disabled = state.disabled || false;
    }

    getProduction(deltaT: number) {
        if (typeof this.production === 'undefined') {
            return undefined;
        } else {
            return mulPriceByNumber(this.production.getTotal(), this.quantity * deltaT / 1000);
        }
    }

    getConsumption(deltaT: number) {
        if (typeof this.consumption === 'undefined') {
            return undefined;
        } else {
            return mulPriceByNumber(this.consumption.getTotal(), this.quantity * deltaT / 1000);
        }
    }

    getStorage() {
        if (typeof this.storage === 'undefined') {
            return undefined;
        } else {
            return mulPriceByNumber(this.storage.getTotal(), this.quantity);
        }
    }

    save(): IBuildingState {
        return {
            quantity: this.quantity,
            disabled: this.disabled
        };
    }

    isAvailable(): boolean {
        return this.locks.length === 0;
    }
}
