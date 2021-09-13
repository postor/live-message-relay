import { ID } from "../types";
import { ICB, ListenCallBack } from "./ICB";
import { connect, ConnectionOptions, NatsConnection, StringCodec, Subscription } from 'nats'

const sc = StringCodec()

export class NatsCB implements ICB {
  nats?: NatsConnection
  natsOption: ConnectionOptions
  subs: Map<ID, Subscription> = new Map()
  constructor(natsOption: ConnectionOptions) {
    this.natsOption = natsOption
  }
  async init() {
    this.nats = await connect(this.natsOption)
  }
  on(id: ID, cb: ListenCallBack) {
    if (!this.nats) return
    let sub = this.nats.subscribe(id + '',)
      ;
    (async () => {
      for await (const m of sub) {
        try {
          cb(JSON.parse(sc.decode(m.data)))
        } catch (e) {
          console.log(e)
        }
      }
    })()
    this.subs.set(id, sub)
  }
  off(id: ID) {
    let sub = this.subs.get(id)
    if (!sub) return
    sub.unsubscribe()
    this.subs.delete(id)
  }
  emit(id: ID, data: any) {
    if (!this.nats) return
    this.nats.publish(id + '', sc.encode(JSON.stringify(data)))
  }
}