import { ID } from "../types";

export interface IKV {
  init(): Promise<void>
  login(id: ID): Promise<void>
  logout(id: ID): Promise<void>
  checkOnline(ids: ID[]): Promise<boolean[]>
}