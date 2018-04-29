import Producer from "./producer/Producer";
import Discovery from "./discovery/Discovery";
import IGameObject from "./IGameObject";
import IBuyable from "./IBuyable";

export default {
    isProducer(gameObject: IGameObject): gameObject is Producer {
        return (<Producer>gameObject).type === 'producer';
    },
    isDiscovery(gameObject: IGameObject): gameObject is Discovery {
        return (<Discovery>gameObject).type === 'discovery';
    },
    isBuyable(gameObject: Object): gameObject is IBuyable {
        return typeof (<IBuyable>gameObject).buy !== 'undefined';
    }
}
