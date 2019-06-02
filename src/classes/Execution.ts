import { Project } from './Project';

export interface IExecutionState {
    timeLeftToComplete: number;
}

export class Execution implements IExecutionState {
    plan: Project;
    timeLeftToComplete: number;

    constructor(plan: Project, state?: IExecutionState) {
        this.plan = plan;
        if (typeof state !== 'undefined') {
            this.timeLeftToComplete = state.timeLeftToComplete;
        } else {
            this.timeLeftToComplete = plan.template.length;
        }
    }

    save(): IExecutionState {
        return { timeLeftToComplete: this.timeLeftToComplete };
    }
}
