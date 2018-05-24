import { Discovery } from "./discovery/Discovery";
import GameObject from "./gameObject/GameObject";
import IBuyable from "./IBuyable";
import { Producer } from "./producer/Producer";
import { Storage } from "./storage/Storage";
import { Upgrade } from "./upgrade/Upgrade";

export default {
    isProducer(gameObject: GameObject): gameObject is Producer {
        return (gameObject as Producer).type === 'producer';
    },
    isDiscovery(gameObject: GameObject): gameObject is Discovery {
        return (gameObject as Discovery).type === 'discovery';
    },
    isBuyable(gameObject: object): gameObject is IBuyable {
        return typeof (gameObject as IBuyable).buy !== 'undefined';
    },
    isStorage(gameObject: object): gameObject is Storage {
        return (gameObject as Storage).type === 'storage';
    },
    isUpgrade(gameObject: object): gameObject is Upgrade {
        return (gameObject as Upgrade).type === 'upgrade';
    }
};
