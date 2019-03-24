import {
  RECEIVE_SOCKET,
  SEND_SOCKET,
  RECEIVE_MESSAGE,
  SEND_MESSAGE
} from "./CONSTANTS";

export const receiveSocketMessage = message => {
  return {
    type: RECEIVE_SOCKET,
    payload: message,
    isSocketAction: () => true
  };
};

export const sendSocketMessage = message => {
  //TODO: generate to in onSend handler
  //from and timeStamp needs tobe added from server side for security
  return {
    type: SEND_SOCKET,
    payload: {
      to: "#Alex",
      from: "#Pratheek",
      timeStamp: new Date().toISOString(),
      message
    },
    isSocketAction: () => true
  };
};

export const sendMessage = message => {
  return {
    type: SEND_MESSAGE,
    payload: message
  };
};

export const receiveMessage = message => {
  return {
    type: RECEIVE_MESSAGE,
    payload: message
  };
};
