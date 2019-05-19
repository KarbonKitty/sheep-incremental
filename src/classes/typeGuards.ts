import GameObject from "./gameObject/GameObject";
import { Building } from "./Building";
import { Idea } from "./Idea";
import { Expedition } from "./Expedition";

export default {
    isBuilding(gameObject: GameObject): gameObject is Building {
        return (gameObject as Building).type === 'building';
    },
    isIdea(gameObject: GameObject): gameObject is Idea {
        return (gameObject as Idea).type === 'idea';
    },
    isExpedition(gameObject: GameObject): gameObject is Expedition {
        return (gameObject as Expedition).type === 'expedition';
    },
};
