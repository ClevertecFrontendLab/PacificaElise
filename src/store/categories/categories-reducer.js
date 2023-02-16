import { SET_CATEGORIES, SET_ERROR, SET_LOADING } from './categories-actions';

const initialState = {
  status: 'idle',
  error: null,
  list: [],
};

export const categoriesReducer = (state = initialState, { type, payload }) => {
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
    case SET_CATEGORIES:
      return {
        ...state,
        status: 'received',
        list: payload,
      };

    default:
      return state;
  }
};
