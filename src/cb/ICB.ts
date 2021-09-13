import { ID } from "../types";
export type ListenCallBack = (data: any) => (any | void)
export interface ICB {
  on(id: ID, cb: ListenCallBack): void
  off(id: ID): void
  emit(id: ID, data: any): void
  init():Promise<void>
}