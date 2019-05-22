import { ExpeditionPlan } from './ExpeditionPlan';

export interface IExpeditionState {
    timeLeftToComplete: number;
}

export class Expedition implements IExpeditionState {
    plan: ExpeditionPlan;
    timeLeftToComplete: number;

    constructor(plan: ExpeditionPlan, state?: IExpeditionState) {
        this.plan = plan;
        if (typeof state !== 'undefined') {
            this.timeLeftToComplete = state.timeLeftToComplete;
        } else {
            this.timeLeftToComplete = plan.template.length;
        }
    }

    save(): IExpeditionState {
        return { timeLeftToComplete: this.timeLeftToComplete };
    }
}
