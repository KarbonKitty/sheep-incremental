import { CurrencyValue, GameObjectType, Lock } from './baseClasses';

export default interface IGameObject {
    id: string;
    type: GameObjectType;
    name: string;
    desc: string;
    rawCost: CurrencyValue[];
    locks: Lock[];
    buyVerb: string;
}