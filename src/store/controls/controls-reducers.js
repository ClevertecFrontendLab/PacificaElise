import { CLEAR_CONTROLS, SET_CATEGORY, SET_PATH, SET_SEARCH } from './controls-actions';

const initialState = {
  search: '',
  category: 'Все книги',
  path: 'all',
};

export const controlsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH:
      return {
        ...state,
        search: payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case SET_PATH:
      return {
        ...state,
        path: payload,
      };
    case CLEAR_CONTROLS:
      return initialState;
    default:
      return state;
  }
};
