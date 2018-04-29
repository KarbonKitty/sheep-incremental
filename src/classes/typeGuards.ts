import IBuyable from "./IBuyable";
import Producer from "./producer/Producer";
import IDiscovery from "./IDiscovery";

export default {
    isProducer(buyable: IBuyable): buyable is Producer {
        return (<Producer>buyable).onBuyAction === 'addOne';
    },
    isDiscovery(buyable: IBuyable): buyable is IDiscovery {
        return (<IDiscovery>buyable).onBuyAction === 'discover';
    }
}
