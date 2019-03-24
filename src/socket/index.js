import io from 'socket.io-client';

export default class SocketCustomWrapper {
    static socketInstances = {};
    constructor(url){
        this.socketHolder = io(url);
    }

    static getSocketConnection(url) {
        return this.createSocketConnection();
    }

    static createSocketConnection(url) {
        if(this.socketInstances[url]) {
            return this.socketInstances[url];
        }
        const newConnection = new SocketCustomWrapper(url);
        this.socketInstances[url] = newConnection.socketHolder;
        return newConnection.socketHolder;
    }
}