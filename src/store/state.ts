import GameObject from "@/classes/gameObject/GameObject";
import { Price, IndustryBranch, IResourcesData, Map } from '@/classes/baseClasses';
import { Building } from '@/classes/Building';
import { Idea } from '@/classes/Idea';
import { Expedition } from '@/classes/Expedition';

export default class GameState {
    gainPerSecondIterations = 20;
    lastTick = 0;
    iteration = 0;
    prestiging = false;
    saveGameName = 'sheep-incremental-save-014';

    currentSelection = {} as GameObject;
    currentBranch = {} as IndustryBranch;
    currentGoal = {} as Price;

    locks = {} as Map<boolean>;

    goals = {} as Map<Price>;

    buildings = [] as Building[];
    ideas = [] as Idea[];
    expeditions = [] as Expedition[];

    resources = {} as IResourcesData;

    advancements = [] as Idea[];

    population = { workers: 0, population: 0, housing: 0 };
}
