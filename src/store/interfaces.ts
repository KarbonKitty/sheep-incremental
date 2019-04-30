import { Building } from "@/classes/Building";
import { ComplexPrice } from '@/classes/complexPrices';
import { Idea } from '@/classes/Idea';
import { UpgradeEffect, Lock } from '@/classes/baseClasses';

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