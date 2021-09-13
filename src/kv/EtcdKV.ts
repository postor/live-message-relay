import { Etcd3, IOptions } from "etcd3";
import { ID } from "../types";
import { IKV } from "./IKV";

export class EtcdKV implements IKV {
  private etcd: Etcd3
  constructor(etcdOptions: IOptions) {
    this.etcd = new Etcd3(etcdOptions)
  }
  async init() { }
  async login(id: ID) {
    await this.etcd.put(id + '').value('1')
  }
  async logout(id: ID) {
    await this.etcd.delete().key(id + '')
  }
  async checkOnline(ids: ID[]) {
    return await Promise.all(ids.map(x => this.etcd.get(x + '').exists()))
  }
}