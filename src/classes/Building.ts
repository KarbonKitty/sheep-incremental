import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { IProductionState, Production } from "./production";
import { Price, IResourcesData } from "./baseClasses";
import { mulPriceByNumber, canBePaid } from "./helpers";

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
    employees?: number;
    housing?: number;
}

export class Building extends GameObject {
    readonly type = 'building';
    readonly costMultiplier = 1.20;

    template: IBuildingTemplate;

    production?: Production;
    consumption?: Production;
    storage?: Price;

    quantity: number;
    disabled: boolean;

    onBuy = [] as Array<() => void>;

    public get currentPrice(): Price {
        return mulPriceByNumber(this.rawCost, Math.pow(this.costMultiplier, this.quantity));
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
            return mulPriceByNumber(this.storage, this.quantity);
        }
    }

    buy() {
        this.onBuy.forEach(handler => handler());
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

    canBeBought(resources: IResourcesData): boolean {
        return canBePaid(this.currentPrice, resources);
    }
}
