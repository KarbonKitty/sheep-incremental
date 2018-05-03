import Producer from "./producer/Producer";
import Discovery from "./discovery/Discovery";
import GameObject from "./gameObject/GameObject";
import IBuyable from "./IBuyable";

export default {
    isProducer(gameObject: GameObject): gameObject is Producer {
        return (<Producer>gameObject).type === 'producer';
    },
    isDiscovery(gameObject: GameObject): gameObject is Discovery {
        return (<Discovery>gameObject).type === 'discovery';
    },
    isBuyable(gameObject: Object): gameObject is IBuyable {
        return typeof (<IBuyable>gameObject).buy !== 'undefined';
    }
}
