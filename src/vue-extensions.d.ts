import Vue from 'vue';
import { GameEventHandlers, GameState } from './gameEngineInterfaces';

declare module 'vue/types/vue' {
  interface Vue {
    $engineEvents: GameEventHandlers
  }
}
