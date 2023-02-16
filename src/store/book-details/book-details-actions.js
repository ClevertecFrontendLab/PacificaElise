export const SET_LOADING = '@@book-details/SET_LOADING';
export const SET_ERROR = '@@book-details/SET_ERROR';
export const SET_BOOK = '@@book-details/SET_BOOK';
export const CLEAR_DETAILS = '@@book-details/CLEAR_DETAILS';

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

export const clearDetails = () => ({
  type: CLEAR_DETAILS,
});

export const loadBookById =
  (id) =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    client
      .get(api.searchByBook(id))
      .then(({ data }) => dispatch(setBook(data)))
      .catch((err) => dispatch(setError(err.message)));
  };
