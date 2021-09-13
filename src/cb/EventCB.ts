import { ID } from "../types";
import { ICB, ListenCallBack } from "./ICB";

export class EventCB implements ICB {
  listeners: { [key: ID]: ListenCallBack } = {}
  constructor() { }
  async init() { }
  on(id: ID, cb: ListenCallBack) {
    this.listeners[id] = cb
  }
  off(id: ID) {
    delete this.listeners[id]
  }
  emit(id: ID, data: any) {
    if (!this.listeners[id]) {
      throw 'no listener'
    }
  }
}