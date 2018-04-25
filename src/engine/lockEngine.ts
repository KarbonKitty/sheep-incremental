import GameState from '../gameState';
import GameEngine from './gameEngine';
import { Lock } from '../classes/baseClasses';

export default {
    removeLock(state: GameState, lock: Lock) {
        state.locks[lock] = false;
        let unlockables = GameEngine.getAllGameObjects(state);
        unlockables.forEach(unlockable => {
            const lockIndex = unlockable.locks.indexOf(lock);
            if (lockIndex > -1)
            {
                unlockable.locks.splice(lockIndex, 1);
            }
        });
    }
}