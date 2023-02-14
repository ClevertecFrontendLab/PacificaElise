
import { createContext, useState, useMemo } from 'react';
import data from './data.json';

export const CustomContex = createContext();
export const MenuToggleContex = createContext();

export const Context = ({ children }) => {
  const [books, setBooks] = useState(Object.values(data).flat());
  const [categories, setCategories] = useState(Object.keys(data));

  /* const addBook = (book) => {
    setBooks([book, ...books]);
  };

  const removeBook = (bookId) => {
    setBooks(books.filter(book => book.id !== bookId))
  };
  */
  const value = useMemo(() => ({
    books, categories
  }), [books, categories]);

  return <CustomContex.Provider value={value}>{ children }</CustomContex.Provider>;
};

export const ToggleContex = ({ children }) => {
  const [isToggleMenu, setToggleMenu] = useState(false);

  const value = useMemo(() => ({
    isToggleMenu, setToggleMenu
  }), [isToggleMenu, setToggleMenu]);

  return <MenuToggleContex.Provider value={value}>{ children }</MenuToggleContex.Provider>;
}
