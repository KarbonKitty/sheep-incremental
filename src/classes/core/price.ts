import { Currency } from './currency';
import { Indexed } from './base';

export interface Price extends Partial<Indexed<Currency, number>> {
    [index: string]: number | undefined;
}
