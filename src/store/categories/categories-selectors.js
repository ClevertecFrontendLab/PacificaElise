export const selectCategoriesInfo = (state) => ({
  status: state.categories.status,
  error: state.categories.error,
});

export const selectAllCategories = (state) => state.categories.list;

export const selectQty = (state) => state.categories.list.length;
