import { IOptions } from 'etcd3'
import { Server } from 'http'
import { ConnectionOptions } from 'nats'
import { Server as IO } from 'socket.io'
import { EventCB } from './cb/EventCB'
import { NatsCB } from './cb/NatsCB'
import { EtcdKV } from './kv/EtcdKV'
import { MapKV } from './kv/MapKV'

type Options = {
  etcd?: IOptions,
  nats?: ConnectionOptions
}

const EVENT_MSG = 'msg', EVENT_LOGIN = 'login', EVENT_LOGOUT = 'logout', EVENT_CHECK_ONLINE = 'checkonline'

export const init = async (server: Server, options: Options) => {
  let io = new IO(server),
    kv = options.etcd ? new EtcdKV(options.etcd) : new MapKV(),
    cb = options.nats ? new NatsCB(options.nats) : new EventCB()
  await cb.init()
  await kv.init()
  io.on('connection', socket => {
    socket.on(EVENT_LOGIN, id => {
      kv.login(id)
      cb.on(id, msg => socket.emit(EVENT_MSG, msg))

      socket.on(EVENT_LOGOUT, () => {
        kv.logout(id)
        cb.off(id)
      })

      socket.on(EVENT_MSG, (id, data) => cb.emit(id, data))

      socket.on(EVENT_CHECK_ONLINE, (ids, cb) => {
        kv.checkOnline(ids).then(rtn => cb(rtn))
      })
    })
  })
}