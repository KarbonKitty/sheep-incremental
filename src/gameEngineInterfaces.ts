import { Building } from './classes/Building';
import { ComplexPrice } from './classes/complexPrices';
import { Idea } from './classes/Idea';
import { UpgradeEffect, Lock, IndustryBranch, IResourcesData, IPopulation, Price, ISitesData } from './classes/baseClasses';
import GameObject from './classes/gameObject/GameObject';

export interface IProducer extends Building {
    production: ComplexPrice;
}

export interface IConsumer extends Building {
    consumption: ComplexPrice;
}

export type IProcessor = IProducer & IConsumer;

export interface IStorage extends Building {
    storage: ComplexPrice;
}

export interface IUpgrade extends Idea {
    effects: UpgradeEffect[];
}

export interface IDiscovery extends Idea {
    unlocks: Lock[];
}

export interface GameEventHandlers {
    buyItem(itemId: string): void;
    changeSelection(itemId: string): boolean;
    changeBranchSelection(branchName: IndustryBranch): void;
    startPrestige(): void;
    endPrestige(): void;
    disableItem(itemId: string): void;
}

export interface GameState {
    resources: IResourcesData;
    sites: ISitesData;
    population: IPopulation;
    buildings: Building[];
    ideas: Idea[];
    upgrades: IUpgrade[];
    advancements: Idea[];
    currentGoal: Price;
    currentSelection: GameObject;
    currentBranch: IndustryBranch;
    prestiging: boolean;
}
