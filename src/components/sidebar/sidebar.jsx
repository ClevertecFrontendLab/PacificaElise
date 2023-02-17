import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadCategories, selectAllCategories, selectCategoriesInfo } from '../../features/categories/categories-slice';
import { setCategory, setPath } from '../../features/controls/controls-slice';
import { selectAllBooks, selectBooksInfo } from '../../features/books/books-slice';
import {setToogleErrorToast} from '../../features/toggle-error-toast/toggle-error-toast-slice'

import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';

import './sidebar.scss';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectAllBooks);
  const {qty} = useSelector(selectCategoriesInfo);
  const categories = useSelector(selectAllCategories);
  const {statusCat, errorCat} = useSelector(selectCategoriesInfo);
  const {error, status} = useSelector(selectBooksInfo);

  const [dropdown, setDropdown] = useState(errorCat || error ||  status === 'loading' || statusCat === 'loading' ? false : true);

  const removeErrorToast = () => dispatch(setToogleErrorToast(false))

  const toogleDropdown = () => {
    setDropdown(dropdown => !dropdown);
  }

  useEffect(() => {
    if (!qty) {
      dispatch(loadCategories()); 
    };
  }, [qty, dispatch]);

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
            <NavLink className={dropdown && status !== 'idle' ? 'active-link' : ''} onClick={toogleDropdown} to='/books/all' data-test-id='navigation-showcase'>Витрина книг
            </NavLink>
            {errorCat || error || statusCat === 'loading' || status === 'loading' ? 
              null : (
                <button type='button' aria-label='dropdownMenu' onClick={() => toogleDropdown()}><Arrow className={dropdown && status !== 'idle' ? 'arrow-up' : ''}/></button>
                )
            }
          </li>
            {status === 'recieved' && statusCat === 'recieved' ?  
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
              </ul> : 
              null
            }
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/terms' 
            onClick={()=> {setDropdown(false); removeErrorToast(false)}} data-test-id='navigation-terms'>
              <li>Правила пользования</li>
            </NavLink>
            <NavLink className={({isActive}) => isActive ? 'active-link-underline' : ''} to='/books/contract' 
            onClick={()=> {setDropdown(false); removeErrorToast(false)}} data-test-id='navigation-contract'>
              <li>Договор оферты</li>
            </NavLink>
        </ul>
    </aside>
  )
};
