/* eslint-disable */

import { NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { CustomContex } from '../../context';
import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';

import './burger-menu.scss';

export const BurgerMenu = () => { 
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(true);
  const [isToggleMenu, setToggleMenu] = useState(false);
  const [isHiddenScroll, setHiddenScroll] = useState(true);
  const { books = [], categories = [] } = useContext(CustomContex);

  const hiddenScroll = () => {
    setHiddenScroll(!isHiddenScroll);
    if(isHiddenScroll === true) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  return (
    <nav className='burger-menu'>
      <button className={isToggleMenu ? 'burger-btn close' : 'burger-btn'} onClick={() => {setToggleMenu(!isToggleMenu); hiddenScroll()}} data-test-id='button-burger'>
        <span />
        <span />
        <span />
      </button>
  
      <aside className={isToggleMenu ? 'menu active' : 'menu'} 
        onClick={() => setToggleMenu(false)} data-test-id='burger-navigation'>
          <ul className='menu-list' onClick={e => e.stopPropagation()}>
            <li className={dropdown ? 'menu-title underline' : 'menu-title'}>
              <NavLink className={dropdown ? 'active-link' : ''} to='/books/all' data-test-id='burger-showcase'>Витрина книг
              </NavLink>
              <button type='button' className='dropdownBtn' aria-label='dropdownMenu'><Arrow className={dropdown ? 'arrow-up' : ''}/></button>
            </li>
              <ul className={dropdown ? 'menu-categories' : 'menu-categories not-visible'}>
                <li className='menu-category'>
                  <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to='/books/all' onClick={() => setToggleMenu(false)} data-test-id='burger-books'>Все книги</NavLink>
                </li>
                {
                  categories.map(category => 
                    <li className='menu-category' key={category}>
                      <NavLink className={({isActive}) => isActive ? 'active-link' : ''} onClick={() => setToggleMenu(false)} to={`/books/${category}`}>
                      {category}
                        <span> {
                        categories.map((category) => books
                        .filter((book) => (book.category === category)))
                        .flat()
                        .filter((item)=>item.category === category).length
                        }</span>
                      </NavLink>
                    </li>
                  )
                }
              </ul>
              <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/terms' 
              onClick={
              setToggleMenu(false)
              } data-test-id='burger-terms'>
                <li>Правила пользования</li>
              </NavLink>
              <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/contract' 
              onClick={
              setToggleMenu(false)} data-test-id='burger-contract'>
                <li>Договор оферты</li>
              </NavLink>
              <ul className='menu-profile'>
                <li>
                  <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/profile' 
                  onClick={
                  setToggleMenu(false)
                 }>
                    Профиль
                  </NavLink>
                </li>
                <li>
                  <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='*' 
                  onClick={
                  setToggleMenu(false)
                 }>
                    Выход
                  </NavLink>
                </li>
              </ul>
          </ul>
      </aside>
    </nav>
  );
}




