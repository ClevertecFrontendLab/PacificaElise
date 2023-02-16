import { SET_BOOK, SET_ERROR, SET_LOADING, CLEAR_DETAILS } from './book-details-actions';

const initialState = {
  currentBook: null,
  status: 'idle',
  error: null,
};

export const bookDetailsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADING:
      return {
        ...state,
        error: null,
        status: 'loading',
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload,
        status: 'rejected',
      };
    case SET_BOOK:
      return {
        ...state,
        status: 'received',
        currentBook: payload,
      };
    case CLEAR_DETAILS:
      return initialState;
    default:
      return state;
  }
};
