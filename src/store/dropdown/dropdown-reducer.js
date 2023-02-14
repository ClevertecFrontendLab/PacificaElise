import { SET_DROPDOWN } from './dropdown-actions';

export const dropdownReducer = (state = true, { type, payload }) => {
  switch (type) {
    case SET_DROPDOWN:
      return payload;
    default:
      return state;
  }
};
