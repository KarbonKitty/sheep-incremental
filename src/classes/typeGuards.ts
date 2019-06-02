import GameObject from "./gameObject/GameObject";
import { Building } from "./Building";
import { Idea } from "./Idea";
import { Project } from "./Project";

export default {
    isBuilding(gameObject: GameObject): gameObject is Building {
        return (gameObject as Building).type === 'building';
    },
    isIdea(gameObject: GameObject): gameObject is Idea {
        return (gameObject as Idea).type === 'idea';
    },
    isProject(gameObject: GameObject): gameObject is Project {
        return (gameObject as Project).type === 'project';
    },
};
