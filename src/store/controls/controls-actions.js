/* eslint-disable */

export const SET_SEARCH = '@@controls/SET_SEARCH';
export const SET_CATEGORY = '@@controls/SET_CATEGORY';
export const SET_PATH = '@@controls/SET_PATH';
export const CLEAR_CONTROLS = '@@controls/CLEAR_CONTROLS';

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});

export const setPath = (path) => ({
  type: SET_PATH,
  payload: path,
});

export const clearControls = () => ({
  type: CLEAR_CONTROLS,
});
