import { makeStore } from './store';
import React from 'react';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import App from './components/App';
import SocketCustomWrapper from './socket';

const main = () => {
  const socket = SocketCustomWrapper.createSocketConnection('localhost:9001');
  const store = makeStore();
  SocketCustomWrapper.initializeListening(socket,store.dispatch);

  const app = (
    <Provider store={store}>
        <App />
    </Provider>
  );

  render(app, document.getElementById('app-root'))
}

main()
