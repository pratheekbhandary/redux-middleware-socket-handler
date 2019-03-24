import { createStore, combineReducers } from "redux";
import { SEND_MESSAGE, RECEIVE_MESSAGE } from "../CONSTANTS";

export const makeStore = () => {
  const store = createStore(
    combineReducers({
      conversations: messageReducer,
      chatList: chatListReducer
    })
  );
  return store;
};

const chatListReducer = (state = [], action) => {
  if( action.type === SEND_MESSAGE) {
    return filterAndUnshift(state, action.payload.to);
  } else if (action.type === RECEIVE_MESSAGE) {
    return filterAndUnshift(state, action.payload.from);
  }
  return state;
};

const messageReducer = (state = {}, action) => {
  if (action.type === SEND_MESSAGE) {
    return sendMessage(state, payload);
  } else if (action.type === RECEIVE_MESSAGE) {
    return receiveMessage(state, payload);
  }
  return state;
};

const receiveMessage = ({ state, payload: message }) => {
  state[message.from] = [...state[message.from], message];
  return { ...state };
};

const sendMessage = ({ state, payload: message }) => {
  state[message.to] = [...state[message.to], message];
  return { ...state };
};

const filterAndUnshift = (array, friend) => {
  const newarray = array.filter((ele) => {
    return ele.friendId !== friend.id;
  });
  return newarray.unshift(friend);
}
