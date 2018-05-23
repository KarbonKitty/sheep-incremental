import IGameObjectState from "../gameObject/IGameObjectState";

export default interface IStorageState extends IGameObjectState {
  quantity: number;
}
