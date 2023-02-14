/* eslint-disable */

import { combineReducers } from 'redux';

import { dropdownReducer } from './dropdown/dropdown-reducer';
import { booksReducer } from './books/books-reducer';
import { categoriesReducer } from './categories/categories-reducer';
import { controlsReducer } from './controls/controls-reducers';

export const rootReducer = combineReducers({
  dropdown: dropdownReducer,
  books: booksReducer,
  categories: categoriesReducer,
  controls: controlsReducer,
});
