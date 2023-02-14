/* eslint-disable */

import { SET_SEARCH, SET_CATEGORY } from './controls-actions';

const initialState = {
  search: '',
  category: '',
};

export const controlsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH: {
      return {
        ...state,
        search: payload,
      };
    }
    case SET_CATEGORY: {
      return {
        ...state,
        category: payload,
      };
    }
    default:
      return state;
  }
};
