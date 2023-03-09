/* eslint-disable */

import { configureStore } from '@reduxjs/toolkit';
import axios from './axios';

import * as api from './config';
import { controlsReducer } from './features/controls/controls-slice';
import { booksReducer } from './features/books/books-slice';
import { categoriesReducer } from './features/categories/categories-slice';
import { detailsReducer } from './features/details/details-slice';
import { toogleErrorToastReducer } from './features/toggle-error-toast/toggle-error-toast-slice';
import { authReducer } from './features/auth/auth-slice';
import { regReducer } from './features/reg/reg-slice';
import { forgotPassReducer } from './features/forgot-password/forgot-password-slice';

export const store = configureStore({
  reducer: {
    controls: controlsReducer,
    books: booksReducer,
    categories: categoriesReducer,
    details: detailsReducer,
    errorToast: toogleErrorToastReducer,
    auth: authReducer,
    reg: regReducer,
    forgotPass: forgotPassReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api,
        },
      },
      serializableCheck: false,
    }),
});
