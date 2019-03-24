import SocketCustomWrapper from "../socket";
import { SEND_SOCKET, RECEIVE_SOCKET, CHAT_SERVER_URL } from "../CONSTANTS";
import { receiveMessage } from "../actions";

const socket = SocketCustomWrapper.getSocketConnection(CHAT_SERVER_URL);
export default function socketMiddleware({ dispatch, getState }) {
  return next => action => {
    const { type, payload: message, isSocketAction = () => false } = action;
    if (!isSocketAction()) return next(action);
    if (type === SEND_SOCKET) {
      socket.emit("message", message);
    } else if (type === RECEIVE_SOCKET) {
      if (typeof message === "object") {
        dispatch(receiveMessage(message));
      }
    }
  };
}
