/* eslint-disable */

import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from './store';

import { App } from './components/app/app';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
