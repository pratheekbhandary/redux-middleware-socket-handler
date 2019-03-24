const Parcel = require('parcel-bundler');
const express = require('express');
const http = require('http');
const io = require('socket.io');
const randomSentence = require('random-sentence');

const startParcel = async () => {
  const bundler = new Parcel('./src/app/index.html')
  bundler.serve(9000)
}

const main = async () => {
  const app = express()
  const server = http.Server(app)
  startParcel()

  const messages = []

  const socket = io(server)

  socket.on('connection', connection => {
    console.log('a user connected');
    connection.on('disconnect', () => {
      console.log('a user disconnected')
    })

    // echo the message back
    connection.on('message', msg => {
      connection.emit('acknowledge', msg);
      console.log('message: ', msg); 
    })

    setInterval(() => {
      connection.emit('message', messageGenerator());
    }, 7000);
  })

  const messageGenerator = () => {
    const time = new Date().toISOString();
    return {
      to:"#Pratheek",
      from:"#Alex",
      timeStamp: time,
      message:randomSentence({min: 4, max: 9})
  }
}

  server.listen(9001, () => {
    console.log('Chat server listening on *:9001')
  })
}

main()
