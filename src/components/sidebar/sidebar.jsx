import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories } from '../../store/categories/categories-actions';
import { selectAllCategories, selectQty } from '../../store/categories/categories-selectors'
import {setDropdown} from '../../store/dropdown/dropdown-actions'
import { setCategory, setPath } from '../../store/controls/controls-actions';
import { selectAllBooks, selectBooksInfo } from '../../store/books/books-selectors';

import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';

import './sidebar.scss';
import { setError } from '../../store/books/books-actions';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const dropdown = useSelector(state => state.dropdown);
  const qty = useSelector(selectQty);
  const categories = useSelector(selectAllCategories);
  const {status, error} = useSelector(selectBooksInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCategories());    
    };
  }, [qty, dispatch]);

  const toogleDropdown = () => {
    dispatch(setDropdown(dropdown === false ? true : false))
  };

  const switchOffDropdown = (dropdown) => {
    dispatch(setDropdown(dropdown))
  };

  const switchOffError = (err) => {
    dispatch(setError(err))
  };

  const handleSelectCategory = (category) => {
    dispatch(setCategory(category));
  } 

  const handleSelectPath = (path) => {
    dispatch(setPath(path))
  };

  const bookCategories = books.map(book => book.categories).flat();

  return (
    <aside className='sidebar'>
        <ul className='sidebar-list'>
          <li className={dropdown && status !== 'idle' ? 'sidebar-title underline' : 'sidebar-title'}>
            <NavLink className={dropdown && status !== 'idle'  ? 'active-link' : ''} onClick={!error && toogleDropdown} to='/books/all' data-test-id='navigation-showcase'>Витрина книг
            </NavLink>
            {status === 'received' ||  status === 'idle' ? 
              (
              <button type='button' aria-label='dropdownMenu' onClick={toogleDropdown}><Arrow className={dropdown && status === 'received' ? 'arrow-up' : ''}/></button>
              ) :
              null
            }
          </li>
          {status === 'received' && (
            <ul className={dropdown ? 'sidebar-categories' : 'sidebar-categories-not-visible'}>
              <li className='sidebar-category'>
                <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to='/books/all' data-test-id='navigation-books' onClick={(e) => handleSelectCategory(e.target.innerText)}>Все книги</NavLink>
              </li>
              {
                categories.map(category => 
                  <li className='sidebar-category' key={category.id}>
                    <NavLink className={({isActive}) => isActive ? 'active-link' : ''} to={`/books/${category.path}`} onClick={(e) => {
                      handleSelectCategory(e.target.innerText); 
                      handleSelectPath(category.path)
                      }
                      }>
                    {category.name}
                    </NavLink> 
                    <span> {
                      bookCategories.length === 0 ? '' : bookCategories.filter(bookCategory => category.name === bookCategory).length
                      }
                    </span>
                  </li>
                )
              }
            </ul>
          )}
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/terms' 
            onClick={() => {switchOffDropdown(false); if (error) {switchOffError(null)}}} data-test-id='navigation-terms'>
              <li>Правила пользования</li>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/contract' 
            onClick={() => {switchOffDropdown(false); if (error) {switchOffError(null)}}} data-test-id='navigation-contract'>
              <li>Договор оферты</li>
            </NavLink>
        </ul>
    </aside>
  )
};

/*
words.filter(word => word.length > 6);
                      books.categories.find()
                    {category.name}
                      {categories.map((category) => books
                      .filter((book) => (book.category === category)))
                      .flat()
                      .filter((item)=>item.category === category).length
                      }
                      */