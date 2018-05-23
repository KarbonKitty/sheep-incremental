import IGameObjectState from "../gameObject/IGameObjectState";

export default interface IUpgradeState extends IGameObjectState {
  done: boolean;
}
