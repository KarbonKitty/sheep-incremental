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
        const grass = this.state.resources.grass;
        
        grass.amount += <number>grass.gainPerSecond * deltaT / 1000;
        grass.limit = this.state.pastureSize * this.state.grassPerPastureUnit
        if (grass.amount > grass.limit)
        {
            grass.amount = grass.limit;
        }
    }

    gatherGrass() {
        this.state.resources.hay.amount += this.state.resources.grass.amount;
        this.state.resources.grass.amount = 0;
    }
}