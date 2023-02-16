export const selectBooksInfo = (state) => ({
  status: state.books.status,
  error: state.books.error,
});

export const selectAllBooks = (state) => state.books.list;

export const selectQty = (state) => state.books.list.length;

export const selectVisibleBooks = (state, { search = '', category = '' }) => {
  if (category === 'Все книги') {
    return state.books.list.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));
  }
  return state.books.list.filter(
    (book) => book.title.toLowerCase().includes(search.toLowerCase()) && book.categories.toString().includes(category)
  );
};
