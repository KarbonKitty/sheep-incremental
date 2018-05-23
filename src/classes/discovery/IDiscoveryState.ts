import IGameObjectState from "../gameObject/IGameObjectState";

export default interface IDiscoveryState extends IGameObjectState {
  done: boolean;
}
