/* eslint-disable */

export const SET_BOOKS = '@@books/SET_BOOKS';
export const SET_LOADING = '@@books/SET_LOADING';
export const SET_ERROR = '@@books/SET_ERROR';

export const setBooks = (books) => ({
  type: SET_BOOKS,
  payload: books,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (err) => ({
  type: SET_ERROR,
  payload: err,
});

export const loadBooks =
  () =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    client
      .get(api.ALL_BOOKS)
      .then(({ data }) => dispatch(setBooks(data)))
      .catch((err) => dispatch(setError(err.message)));
  };
