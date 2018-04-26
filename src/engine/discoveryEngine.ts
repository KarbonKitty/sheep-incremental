import GameState from "../gameState";
import GameEngine from "./gameEngine";
import BuyableEngine from "./buyableEngine";
import LockEngine from "./lockEngine";

export default {
  tryDiscover(state: GameState, discoveryId: string): boolean {
    const discovery = state.discoveries.filter(d => d.id === discoveryId).pop();

    if (typeof discovery === 'undefined') {
      return false;
    }

    if (!BuyableEngine.tryBuyItem(state, discoveryId)) {
      return false;
    }

    LockEngine.removeLock(state, discovery.unlocks)
    return true;
  }
}
