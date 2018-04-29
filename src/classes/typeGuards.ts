import Producer from "./producer/Producer";
import IDiscovery from "./IDiscovery";
import IGameObject from "./IGameObject";
import IBuyable from "./IBuyable";

export default {
    isProducer(gameObject: IGameObject): gameObject is Producer {
        return (<Producer>gameObject).type === 'producer';
    },
    isDiscovery(gameObject: IGameObject): gameObject is IDiscovery {
        return (<IDiscovery>gameObject).type === 'discovery';
    },
    isBuyable(gameObject: Object): gameObject is IBuyable {
        return typeof (<IBuyable>gameObject).buy !== 'undefined';
    }
}
