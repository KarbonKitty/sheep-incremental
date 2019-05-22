import { ExpeditionPlan } from './ExpeditionPlan';

export class Expedition {
    plan: ExpeditionPlan;
    timeLeftToComplete: number;

    constructor(plan: ExpeditionPlan) {
        this.plan = plan;
        this.timeLeftToComplete = plan.template.length;
    }
}
