/* eslint-disable */

export const SET_LOADING = '@@book-details/SET_LOADING';
export const SET_ERROR = '@@book-details/SET_ERROR';
export const SET_BOOK = '@@book-details/SET_BOOK';

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (err) => ({
  type: SET_ERROR,
  payload: err,
});

export const setBook = (book) => ({
  type: SET_BOOK,
  payload: book,
});

export const loadBookById =
  (id) =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    client
      .get(api.searchByBook(id))
      .then(({ data }) => dispatch(setBook(data)))
      .then(console.log(data))
      .catch((err) => dispatch(setError(err.message)));
  };
