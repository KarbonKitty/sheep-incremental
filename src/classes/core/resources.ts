import { Lock, ILockable, Indexed } from './base';
import { Currency } from './currency';

export interface IResourceTemplate {
    name: string;
    baseLimit?: number;
    precision: number;
    originalLocks: Lock[];
}

export interface IResource extends ILockable {
    template: IResourceTemplate;
    limit?: number;
    amount: number;
    gainPerSecond: number[];
    amountSpent: number;
}

export interface IResourcesTemplateData extends Indexed<Currency, IResourceTemplate> { }

export interface IResourcesData extends Indexed<Currency, IResource> { }
