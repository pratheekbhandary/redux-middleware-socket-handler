import { makeStore } from './store';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import SocketCustomWrapper from '../socket';

// See this function for an example of how to send messages and how to
// subscribe and listen for messages
const example = (socket) => {
  socket.emit('message', 'hello world')
  socket.on('message', msg => {
    console.log('Received message: ', msg)
  })
}

const main = () => {
  const socket = SocketCustomWrapper.createSocketConnection('localhost:9001');
  const store = makeStore();

  const app = (
    <App socket={socket} />
  )

  render(app, document.getElementById('app-root'))
}

main()
