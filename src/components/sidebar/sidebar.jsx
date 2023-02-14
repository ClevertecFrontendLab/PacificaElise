/* eslint-disable */
import {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { selectAllBooks } from '../../store/books/books-selectors';
import { loadCategories } from '../../store/categories/categories-actions';
import { selectAllCategories, selectCategoriesInfo } from '../../store/categories/categories-selectors'

import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';
import {setDropdown} from '../../store/dropdown/dropdown-actions'

import './sidebar.scss';
import { selectCategory } from '../../store/controls/controls-selectors';
import { setCategory } from '../../store/controls/controls-actions';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const dropdown = useSelector(state => state.dropdown);

  const categories = useSelector(selectAllCategories);
  const {status, error, qty} = useSelector(selectCategoriesInfo);
  const category = useSelector(selectCategory);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCategories());    }
  }, [qty, dispatch])


  const toogleDropdown = () => {
    dispatch(setDropdown(dropdown === false ? true : false))
  };

  const handleSelectCategory = (e) => {
    dispatch(setCategory(e.target.innerText))
  }

  return (
    <aside className='sidebar'>
        <ul className='sidebar-list'>
          <li className={dropdown ? 'sidebar-title underline' : 'sidebar-title'}>
            <NavLink className={dropdown ? 'active-link' : ''} onClick={toogleDropdown} to='/books/all' data-test-id='navigation-showcase'>Витрина книг
            </NavLink>
            <button type='button' aria-label='dropdownMenu' onClick={toogleDropdown}><Arrow className={dropdown ? 'arrow-up' : ''}/></button>
          </li>
          {error && <h1>Error...</h1>}
          {status === 'loading' && <h1>Loading...</h1>}
          {status === 'received' && (
            <ul className={dropdown ? 'sidebar-categories' : 'sidebar-categories-not-visible'}>
              <li className='sidebar-category'>
                <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to='/books/all' data-test-id='navigation-books'>Все книги</NavLink>
              </li>
              {
                categories.map(category => 
                  <li className='sidebar-category' key={category.id}>
                    <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={`/books/${category.path}`} onClick={handleSelectCategory}>
                    {category.name}
                    </NavLink> <span>0</span>
                  </li>
                )
              }
            </ul>
          )}
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/terms' 
            onClick={() => {
            toogleDropdown
            }} data-test-id='navigation-terms'>
              <li>Правила пользования </li>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/contract' 
            onClick={() => {
            toogleDropdown
            }} data-test-id='navigation-contract'>
              <li>Договор оферты</li>
            </NavLink>
        </ul>
    </aside>
  )
};

/* {
                      bookCategories.map((category) => books
                      .filter((book) => (book.category === category)))
                      .flat()
                      .filter((item)=>item.category === category).length
                      }
                      */