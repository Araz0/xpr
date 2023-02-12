import { io, Socket } from 'socket.io-client'

import { EventNames } from './eventNames'

export class SocketService {
  private _socket: Socket

  constructor(port = 8000) {
    this._socket = io('http://localhost:' + port)
    this._socket.emit(EventNames.CLIENT_CONNECTED, 'A new client connected')
  }
  public start = () => {
    this._socket.emit(EventNames.START_PROGRAM, { payload: '1', headerId: 1 })
  }
  public onStart = (exicute: () => void) => {
    this._socket.on(EventNames.START_PROGRAM, (command: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (start-program): ${command}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }
  public requestFullscreen = () => {
    this._socket.emit(EventNames.REQUEST_FULLSCREEN, '')
  }
  public onRequestFullScreen = (exicute: () => void) => {
    this._socket.on(EventNames.REQUEST_FULLSCREEN, (command: any) => {
      // eslint-disable-next-line no-console
      console.log(
        `Received command (request-full-screen): ${command}`,
        new Date().getMilliseconds()
      )
      exicute()
    })
  }
}