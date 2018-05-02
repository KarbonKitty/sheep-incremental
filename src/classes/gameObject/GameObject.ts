import { CurrencyValue, GameObjectType, Lock } from '../baseClasses';
import IGameObjectTemplate from "./IGameObjectTemplate";

export default abstract class GameObject {
    id: string;
    type: GameObjectType;
    name: string;
    desc: string;
    rawCost: CurrencyValue[];
    locks: Lock[];
    buyVerb: string;

    constructor(template: IGameObjectTemplate) {
        this.id = template.id;
        this.type = template.type;
        this.name = template.name;
        this.desc = template.desc;
        this.rawCost = template.rawCost;
        this.locks = template.locks;
        this.buyVerb = template.buyVerb;
    }
}