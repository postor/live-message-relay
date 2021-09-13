import { ID } from "../types";
import { IKV } from "./IKV";

export class MapKV implements IKV {
  constructor(private map = new Map()) { }
  async init() { }
  async login(id: ID) {
    this.map.set(id, true)
  }
  async logout(id: ID) {
    this.map.set(id, false)
  }
  async checkOnline(ids: ID[]) {
    return ids.map(x => this.map.get(x))
  }
}