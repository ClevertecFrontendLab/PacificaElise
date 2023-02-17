/* eslint-disable */

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories, selectAllCategories, selectCategoriesInfo } from '../../features/categories/categories-slice';
import { setCategory, setPath } from '../../features/controls/controls-slice';
import { selectAllBooks, selectBooksInfo } from '../../features/books/books-slice';
import { setToogleErrorToast } from '../../features/toggle-error-toast/toggle-error-toast-slice';

import { ReactComponent as Arrow } from '../../imgs/icons/arrow.svg';

import './burger-menu.scss';

export const BurgerMenu = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const { qty } = useSelector(selectCategoriesInfo);
  const categories = useSelector(selectAllCategories);
  const { statusCat, errorCat } = useSelector(selectCategoriesInfo);
  const { error, status } = useSelector(selectBooksInfo);

  const [dropdownBurger, setdropdownBurgerBurger] = useState(errorCat || error || status === 'loading' || statusCat === 'loading' ? false : true);

  const [isToggleMenu, setToggleMenu] = useState(false);

  const removeErrorToast = () => dispatch(setToogleErrorToast(false))

  const toogledropdownBurgerBurger = () => {
    setdropdownBurgerBurger(dropdownBurger => !dropdownBurger);
  }

  const toogleMenu = () => {
    setToggleMenu(isToggleMenu => !isToggleMenu);
  }

  const [isHiddenScroll, setHiddenScroll] = useState(false);

  const hiddenScroll = (bool) => {
    setHiddenScroll(bool);
    if (isHiddenScroll === false) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
  
  useEffect(() => {
    if (errorCat || error) {
      setToggleMenu(true)
    }
  }, [errorCat, error]);

  const handleSelectCategory = (category) => {
    dispatch(setCategory(category));
  }

  const handleSelectPath = (path) => {
    dispatch(setPath(path))
  };

  const bookCategories = books.map(book => book.categories).flat();

  return (
    <nav className='burger-menu'>
      <button className={isToggleMenu ? 'burger-btn close' : 'burger-btn'} onClick={() => { toogleMenu(); { isToggleMenu ? hiddenScroll(false) : hiddenScroll(true) } }} data-test-id='button-burger'>
        <span />
        <span />
        <span />
      </button>

      <aside className={isToggleMenu ? 'menu active' : 'menu'}
        onClick={() => setToggleMenu(false)} data-test-id='burger-navigation'>
        <ul className='menu-list' onClick={e => e.stopPropagation()}>
          <li className={dropdownBurger && status !== 'idle' ? 'menu-title underline' : 'menu-title'}>
            <NavLink className={dropdownBurger && status !== 'idle' ? 'active-link' : ''} onClick={toogledropdownBurgerBurger} to='/books/all' data-test-id='burger-showcase'>Витрина книг
            </NavLink>
            {errorCat || error || statusCat === 'loading' || status === 'loading' ?
              null : (
                <button type='button' className='dropdownBurgerBtn' aria-label='dropdownBurgerMenu' onClick={() => toogledropdownBurgerBurger()}><Arrow className={dropdownBurger ? 'arrow-up' : ''} />
                </button>
              )
            }
          </li>
          {status === 'recieved' && statusCat === 'recieved' ?
            <ul className={dropdownBurger ? 'menu-categories' : 'menu-categories not-visible'}>
              <li className='menu-category'>
                <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} to='/books/all' onClick={(e) => { setToggleMenu(false); handleSelectCategory(e.target.innerText) }} data-test-id='burger-books'>Все книги</NavLink>
              </li>
              {
                categories.map(category =>
                  <li className='menu-category' key={category.id}>
                    <NavLink className={({ isActive }) => isActive ? 'active-link' : ''} onClick={(e) => { setToggleMenu(false); handleSelectCategory(e.target.innerText); handleSelectPath(category.path) }} to={`/books/${category.path}`}>
                      {category.name}
                    </NavLink>
                    <span> {
                      bookCategories.length === 0 ? '' : bookCategories.filter(bookCategory => category.name === bookCategory).length
                    }
                    </span>
                  </li>
                )
              }
            </ul> :
            null
          }
          <NavLink className={({ isActive }) => isActive ? 'active-link-underline' : ''} to='/books/terms'
            onClick={() => { setdropdownBurgerBurger(false); removeErrorToast(false); setToggleMenu(false) }} data-test-id='burger-terms'>
            <li>Правила пользования</li>
          </NavLink>
          <NavLink className={({ isActive }) => isActive ? 'active-link-underline' : ''} to='/books/contract' onClick={() => { setdropdownBurgerBurger(false); removeErrorToast(false); setToggleMenu(false) }} data-test-id='burger-contract'>
            <li>Договор оферты</li>
          </NavLink>
          <ul className='menu-profile'>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'active-link-underline' : ''} to='/profile'
                onClick={() => { setdropdownBurgerBurger(false); removeErrorToast(false); setToggleMenu(false) }}>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink className={({ isActive }) => isActive ? 'active-link-underline' : ''} to='*'
                onClick={() => { setdropdownBurgerBurger(false); removeErrorToast(false); setToggleMenu(false) }}>
                Выход
              </NavLink>
            </li>
          </ul>
        </ul>
      </aside>
    </nav>
  );
}




