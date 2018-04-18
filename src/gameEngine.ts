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
    }

    handleEvent(data: { type: string, value: any})
    {
        console.log(data.type, data.value);
    }

    private recalculateGrass(deltaT: number) {
        this.state.grass.amount += <number>this.state.grass.gainPerSecond * deltaT / 1000;
        this.state.grass.limit = this.state.pastureSize * this.state.grassPerPastureUnit
        if (this.state.grass.amount > this.state.grass.limit)
        {
            this.state.grass.amount = this.state.grass.limit;
        }
    }

    gatherGrass() {
        this.state.hay.amount += this.state.grass.amount;
        this.state.grass.amount = 0;
    }
}