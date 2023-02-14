export const selectBooksInfo = (state) => ({
  status: state.books.status,
  error: state.books.error,
  gty: state.books.list.length,
});

export const selectAllBooks = (state) => state.books.list;
