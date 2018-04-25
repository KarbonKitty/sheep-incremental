import IBuyable from './IBuyable';
import ILocked from './ILocked';

export default interface IGameObject extends IBuyable, ILocked {
    id: string;
    name: string;
    desc: string;
}