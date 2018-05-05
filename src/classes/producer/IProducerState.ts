import IGameObjectState from "../gameObject/IGameObjectState";

export default interface IProducerState extends IGameObjectState {
  quantity: number
}