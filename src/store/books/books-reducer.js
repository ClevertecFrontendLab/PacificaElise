/* eslint-disable */

import { SET_BOOKS, SET_ERROR, SET_LOADING } from './books-actions';

const initialState = {
  status: 'idle',
  error: null,
  list: [],
};

export const booksReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        status: 'loading',
        error: null,
      };
    case SET_ERROR:
      return {
        ...state,
        status: 'rejected',
        error: payload,
      };
    case SET_BOOKS:
      return {
        ...state,
        status: 'received',
        list: payload,
      };
    default:
      return state;
  }
};
