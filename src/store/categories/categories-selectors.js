export const selectCategoriesInfo = (state) => ({
  status: state.categories.status,
  error: state.categories.error,
  gty: state.categories.list.length,
});

export const selectAllCategories = (state) => state.categories.list;
