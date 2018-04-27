import IBuyable from "./IBuyable";
import IProducer from "./IProducer";
import IDiscovery from "./IDiscovery";

export default {
    isProducer(buyable: IBuyable): buyable is IProducer {
        return (<IProducer>buyable).onBuyAction === 'addOne';
    },
    isDiscovery(buyable: IBuyable): buyable is IDiscovery {
        return (<IDiscovery>buyable).onBuyAction === 'discover';
    }
}
