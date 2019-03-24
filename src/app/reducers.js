import { SEND_MESSAGE, RECEIVE_MESSAGE } from "./CONSTANTS";

export const chatListReducer = (state = [], action) => {
    if( action.type === SEND_MESSAGE) {
      return filterAndUnshift(state, action.payload.to);
    } else if (action.type === RECEIVE_MESSAGE) {
      return filterAndUnshift(state, action.payload.from);
    }
    return state;
  };
  
export const messageReducer = (state = {}, action) => {
    if (action.type === SEND_MESSAGE) {
      return sendMessage(state, action.payload);
    } else if (action.type === RECEIVE_MESSAGE) {
      return receiveMessage(state, action.payload);
    }
    return state;
  };
  
  const receiveMessage = ( state, payload ) => {
    if(!state[payload.from]) state[payload.from] = [];
    state[payload.from] = [...state[payload.from], payload];
    return { ...state };
  };
  
  const sendMessage = ( state, payload ) => {
    if(!state[payload.to]) state[payload.to] = [];
    state[payload.to] = [...state[payload.to], payload];
    return { ...state };
  };
  
  const filterAndUnshift = (array, friend) => {
    const newarray = array.filter((ele) => {
      return ele.friendId !== friend.id;
    });
    newarray.unshift(friend)
    return newarray;
  }
  