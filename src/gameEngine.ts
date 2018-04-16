import GameState from "./gameState"

export default class GameEngine {
    state: GameState;

    constructor(gameState: GameState) {
        this.state = gameState;
    }

    tick(currentTick: number) {
        let deltaT = currentTick - this.state.lastTick;
        this.state.lastTick = currentTick;

        this.recalculateGrass(deltaT);
        this.recalculateHay(deltaT);
    }

    private recalculateGrass(deltaT: number) {
        this.state.grass += this.state.gps * deltaT / 1000;
        const maxGrass = this.state.pastureSize * this.state.grassPerPastureUnit;
        if (this.state.grass > maxGrass)
        {
            this.state.grass = maxGrass;
        }
    }

    private recalculateHay(deltaT: number) {
        this.state.hay += this.state.hps * deltaT / 1000;
    }

    gatherGrass() {
        this.state.hay += this.state.grass;
        this.state.grass = 0;
    }
}