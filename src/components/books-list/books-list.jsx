import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsStorage } from '../../features/auth/auth-slice';
import { loadBooks, selectVisibleBooks, selectBooksInfo } from '../../features/books/books-slice';
import { selectCategoriesInfo } from '../../features/categories/categories-slice';
import { selectControls, selectField, selectSort } from '../../features/controls/controls-slice';
import { BookCard } from '../book-card/book-card';
import { Navigation } from '../navigation/navigation';

import './books-list.scss';

export const BooksList = () => {
  const dispatch = useDispatch();
  const {search, category, path, sort, field} = useSelector(selectControls);
  const books = useSelector(state => selectVisibleBooks (state, {search, category})).sort(sorting(sort,field));
  const booksInCategory = useSelector(state => selectVisibleBooks (state, {category}));
  const {status, qty} = useSelector(selectBooksInfo);
  const {statusCat} = useSelector(selectCategoriesInfo);
  const [choosenView, setChoosenView] = useState();
  const isStorage = useSelector(selectIsStorage);

  useEffect(() => {
    if (isStorage) {
    dispatch(loadBooks())
    };
  }, [isStorage, dispatch]);

  function sorting (sorted, value) {
    if (sorted === 'desc') {
      return (a, b) => (a[value] > b[value] ? -1 : 1)
    };
    return (a, b) => (a[value] > b[value] ? 1 : -1);
  }

  const handleChangeView = (btnId) => {
    setChoosenView(btnId);
  }

  return (
      <section className='booklist-container'> 
      {status === 'recieved' && statusCat === 'recieved' ?  
        <React.Fragment>
          <Navigation onChangeView={ handleChangeView }/>
          <section className={!booksInCategory.length || !books.length ? 'nothing-found' : choosenView === 1 ? 'books-list-list' : 'books-list'}>
            {
            !booksInCategory.length ? <p className='empty' data-test-id='empty-category'>В этой категории книг ещё нет</p> :
            books.length ? (
              books.map((book) => <BookCard 
                  key={book.id} 
                  {...book}
                  path={path}
                  category={category}
                  choosenView={choosenView}/>)
                ) : (
                  <p className='empty' data-test-id='search-result-not-found'>По запросу ничего не найдено</p>
                )
            }
          </section>
        </React.Fragment> : 
        null
      }
      </section>
    )
};

