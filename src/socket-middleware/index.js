import SocketCustomWrapper from '../socket';
import {SEND_SOCKET, RECEIVE_SOCKET, CHAT_SERVER_URL} from '../CONSTANTS';

const socket = SocketCustomWrapper.getSocketConnection(CHAT_SERVER_URL);
function socketMiddleware({ dispatch, getState }) {
  return next => action => {
    const {
      type,
      payload: message,
      isSocketAction = () => false
    } = action;
    if (!isSocketAction()) next(action);
    if(type === SEND_SOCKET) {
        return new Promise((resolve, reject) => {
          socket.emit('message', message, (err, ack) => {
            if (err) {
              return reject(err);
              //dispatch error to store
            }
            //User typed message to store
            return resolve(ack);
          })
        });
    } else if (type === RECEIVE_SOCKET) {

    }
    
  };
}