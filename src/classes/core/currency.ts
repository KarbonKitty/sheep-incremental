const CurrencyObject = {
    territory: true,
    folklore: true,
    wood: true,
    flint: true,
    "stone tools": true,
    "complex tools": true,
    "raw meat": true,
    meat: true,
    "animal skin": true,
    "raw vegetables": true,
    "vegetables": true,
    advancement: true,
};

export const CurrencyArray = Object.keys(CurrencyObject) as Currency[];
export type Currency = keyof typeof CurrencyObject;
