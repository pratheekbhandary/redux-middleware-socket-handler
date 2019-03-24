import io from 'socket.io-client';
import {receiveSocketMessage, sendMessage} from '../actions';

export default class SocketCustomWrapper {
    static socketInstances = {};
    constructor(url){
        this.socketHolder = io(url);
    }

    static getSocketConnection(url) {
        return this.createSocketConnection(url);
    }

    static createSocketConnection(url) {
        if(this.socketInstances[url]) {
            return this.socketInstances[url];
        }
        const newConnection = new SocketCustomWrapper(url);
        this.socketInstances[url] = newConnection.socketHolder;
        return newConnection.socketHolder;
    }

    static initializeListening(socket, dispatch) {
        socket.on('message', msg => {
          dispatch(receiveSocketMessage(msg));
        });
        socket.on('acknowledge', msg => {
          dispatch(sendMessage(msg));
        });
    }
}