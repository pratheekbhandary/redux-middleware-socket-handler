import { createStore, combineReducers, applyMiddleware } from "redux";
import {messageReducer as conversations, chatListReducer as chatList} from './reducers';
import logger from 'redux-logger';
import socketMiddleware from './socket-middleware';

export const makeStore = () => {
  const store = createStore(
    combineReducers({
      conversations,
      chatList
    }),{}, applyMiddleware(logger,socketMiddleware)
  );
  return store;
};