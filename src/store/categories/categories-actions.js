export const SET_CATEGORIES = '@@categories/SET_CATEGORIES';
export const SET_LOADING = '@@categories/SET_LOADING';
export const SET_ERROR = '@@categories/SET_ERROR';

export const setCategories = (categories) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

export const setLoading = () => ({
  type: SET_LOADING,
});

export const setError = (err) => ({
  type: SET_ERROR,
  payload: err,
});

export const loadCategories =
  () =>
  (dispatch, _, { client, api }) => {
    dispatch(setLoading());
    client
      .get(api.ALL_CATEGORIES)
      .then(({ data }) => dispatch(setCategories(data)))
      .catch((err) => dispatch(setError(err.message)));
  };
