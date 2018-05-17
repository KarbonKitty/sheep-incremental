import Producer from "./producer/Producer";
import Discovery from "./discovery/Discovery";
import GameObject from "./gameObject/GameObject";
import IBuyable from "./IBuyable";
import Upgrade from "./upgrade/Upgrade";
import Storage from "./storage/Storage";

export default {
    isProducer(gameObject: GameObject): gameObject is Producer {
        return (<Producer>gameObject).type === 'producer';
    },
    isDiscovery(gameObject: GameObject): gameObject is Discovery {
        return (<Discovery>gameObject).type === 'discovery';
    },
    isBuyable(gameObject: Object): gameObject is IBuyable {
        return typeof (<IBuyable>gameObject).buy !== 'undefined';
    },
    isStorage(gameObject: Object): gameObject is Storage {
        return (<Storage>gameObject).type === 'storage';
    },
    isUpgrade(gameObject: Object): gameObject is Upgrade {
        return (<Upgrade>gameObject).type === 'upgrade';
    }
}
