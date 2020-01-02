import { LocksData as LockList } from "../../data";

export type Lock = keyof typeof LockList;

export interface ILockable { locks: Lock[]; }

export type Indexed<T extends string, U> = {
  [P in T]: U;
};

export type GameObjectId = string;

export type EffectProp = "cost" | "production" | "consumption" | "storage";
export type GameObjectType = "building" | "idea" | "project";

export interface Map<T> {
  [index: string]: T;
}
