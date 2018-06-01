import GameObject from "./gameObject/GameObject";
import IBuyable from "./IBuyable";
import { Building } from "./Building";
import { Idea } from "./Idea";

export default {
    isBuilding(gameObject: GameObject): gameObject is Building {
        return (gameObject as Building).type === 'building';
    },
    isIdea(gameObject: GameObject): gameObject is Idea {
        return (gameObject as Idea).type === 'idea';
    },
    isBuyable(gameObject: object): gameObject is IBuyable {
        return typeof (gameObject as IBuyable).buy !== 'undefined';
    },
};
