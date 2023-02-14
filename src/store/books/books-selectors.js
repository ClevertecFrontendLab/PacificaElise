/* eslint-disable */

export const selectBooksInfo = (state) => ({
  status: state.books.status,
  error: state.books.error,
  gty: state.books.list.length,
});

export const selectAllBooks = (state) => state.books.list;

export const selectVisibleBooks = (state, { search = '', category = '' }) => {
  return state.books.list.filter(
    (book) => book.title.toLowerCase().includes(search.toLowerCase()) && book.categories.includes(category)
  );
};

export const selectVisibleAllBooks = (state, { search = '' }) => {
  return state.books.list.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
};
