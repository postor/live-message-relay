import { Socket, io } from 'socket.io-client'
import { ID } from './types'

export class Client {
  io?: Socket
  constructor(url: string) {
    this.io = io(url, { autoConnect: false, })
  }
  async login(id: ID) {

  }
  async logout() {

  }
  async checkOnline(ids: ID[]) {
    return [] as boolean[]
  }
  async message(to: ID, msg: any) {

  }
}