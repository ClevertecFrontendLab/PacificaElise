import { applyMiddleware,compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as api from '../config';

import { rootReducer } from './root-reducer';

const composeEnhanser = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhanser(
    applyMiddleware(
      thunk.withExtraArgument({
        client: axios,
        api,
      })
    )
  )
);
