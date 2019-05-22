import GameObject from "./gameObject/GameObject";
import { Building } from "./Building";
import { Idea } from "./Idea";
import { ExpeditionPlan } from "./ExpeditionPlan";

export default {
    isBuilding(gameObject: GameObject): gameObject is Building {
        return (gameObject as Building).type === 'building';
    },
    isIdea(gameObject: GameObject): gameObject is Idea {
        return (gameObject as Idea).type === 'idea';
    },
    isExpeditionPlan(gameObject: GameObject): gameObject is ExpeditionPlan {
        return (gameObject as ExpeditionPlan).type === 'expedition';
    },
};
