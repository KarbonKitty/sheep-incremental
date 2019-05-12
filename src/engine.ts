import GameEngine from "./gameEngine";
import { GameState, GameEventHandlers } from './gameEngineInterfaces';

export const engine = new GameEngine();

export const eventHandlers = engine as GameEventHandlers;

export const state = engine as GameState;
