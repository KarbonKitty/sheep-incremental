import { CurrencyValue, GameObjectType } from './baseClasses';
import ILocked from './ILocked';

export default interface IGameObject extends ILocked {
    id: string;
    type: GameObjectType;
    name: string;
    desc: string;
    rawCost: CurrencyValue[];
    buyVerb: string;
}