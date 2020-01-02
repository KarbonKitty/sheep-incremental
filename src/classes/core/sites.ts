import { ILockable, Lock, Indexed } from './base';

const siteTypesObject = {
    cave: true
};

export const SiteTypesArray = Object.keys(siteTypesObject) as SiteType[];
export type SiteType = keyof typeof siteTypesObject;

export interface ISiteTemplate {
    name: SiteType;
    originalLocks: Lock[];
}

export interface ISite extends ILockable {
    template: ISiteTemplate;
    totalAmount: number;
    amountUsed: number;
}

export interface ISiteState {
    amount: number;
}

export interface SiteSet extends Partial<Indexed<SiteType, number>> {
    [index: string]: number | undefined;
}

export interface ISitesData extends Indexed<SiteType, ISite> { }

export interface ISitesTemplateData extends Indexed<SiteType, ISiteTemplate> { }

export interface ISitesStateData extends Partial<Indexed<SiteType, ISiteState>> { }
