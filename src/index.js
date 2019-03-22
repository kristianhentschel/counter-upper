import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';

import App from './App';
import reducer from './reducer';

const store = configureStore({ reducer });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
