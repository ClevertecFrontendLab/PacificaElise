import { combineReducers } from 'redux';

import { bookDetailsReducer } from './book-details/book-details-reducer';
import { booksReducer } from './books/books-reducer';
import { categoriesReducer } from './categories/categories-reducer';
import { controlsReducer } from './controls/controls-reducers';
import { dropdownReducer } from './dropdown/dropdown-reducer';

export const rootReducer = combineReducers({
  dropdown: dropdownReducer,
  books: booksReducer,
  categories: categoriesReducer,
  controls: controlsReducer,
  details: bookDetailsReducer,
});
