/* eslint-disable */

export const SET_SEARCH = '@@controls/SET_SEARCH';
export const SET_CATEGORY = '@@controls/SET_CATEGORY';

export const setSearch = (search) => ({
  type: SET_SEARCH,
  payload: search,
});

export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});
