import Vue from 'vue';
import { GameEventHandlers } from './gameEngineInterfaces';
import { IResourcesData } from './classes/baseClasses';

declare module 'vue/types/vue' {
  interface Vue {
    $engineEvents: GameEventHandlers,
    $resources: IResourcesData
  }
}
