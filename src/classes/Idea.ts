import GameObject from "./gameObject/GameObject";
import IGameObjectState from "./gameObject/IGameObjectState";
import IGameObjectTemplate from "./gameObject/IGameObjectTemplate";
import { Lock, UpgradeEffect } from "./baseClasses";

export interface IIdeaState extends IGameObjectState {
    done: boolean;
}

export interface IIdeaTemplate extends IGameObjectTemplate {
    effects?: UpgradeEffect[];
    unlocks?: Lock[];
}

export class Idea extends GameObject {
    readonly type = 'idea';

    template: IIdeaTemplate;

    done: boolean;

    onBuy = [] as Array<() => void>;

    public get currentPrice() {
        return this.cost.getTotal();
    }

    constructor(template: IIdeaTemplate, state: IIdeaState) {
        super(template, state);

        this.template = template;

        this.done = state.done;
    }

    save(): IIdeaState {
        return {
            done: this.done
        };
    }

    isAvailable(): boolean {
        return this.locks.length === 0 && !this.done;
    }
}
