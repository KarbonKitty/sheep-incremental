import GameState from "../gameState";
import GameEngine from "./gameEngine";
import LockEngine from "./lockEngine";

export default {
  tryDiscover(state: GameState, discoveryId: string): boolean {
    const discovery = state.discoveries.filter(d => d.id === discoveryId).pop();

    if (typeof discovery === 'undefined') {
      return false;
    }

    if (!GameEngine.tryBuyItem(state, discoveryId)) {
      return false;
    }

    LockEngine.removeLock(state, discovery.unlocks)
    return true;
  }
}
