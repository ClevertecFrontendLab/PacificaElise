import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { loadBooks, selectVisibleBooks, selectBooksInfo } from '../../features/books/books-slice';
import { selectCategoriesInfo } from '../../features/categories/categories-slice';
import { selectControls } from '../../features/controls/controls-slice';
import { BookCard } from '../book-card/book-card';
import { Navigation } from '../navigation/navigation';

import './books-list.scss';

export const BooksList = () => {
  const dispatch = useDispatch();
  const {search, category, path} = useSelector(selectControls);
  const books = useSelector(state => selectVisibleBooks (state, {search, category}));
  const {qty} = useSelector(selectBooksInfo);
  const {status} = useSelector(selectBooksInfo);
  const {statusCat} = useSelector(selectCategoriesInfo)

  useEffect(() => {
    if (!qty) {
      dispatch(loadBooks());
    }
  }, [qty, dispatch]);

  const [choosenView, setChoosenView] = useState();

  const handleChangeView = (btnId) => {
    setChoosenView(btnId);
  }

  return (
      <section className='booklist-container'> 
      {status === 'recieved' && statusCat === 'recieved' ?  
        <React.Fragment>
          <Navigation onChangeView={ handleChangeView }/>
          <section className={choosenView === 1 ? 'books-list-list' : 'books-list'}>
            {
            books.length ? (
                books.map((book) => <BookCard 
                key={book.id} 
                {...book} 
                path={path}
                category={category}
                choosenView={choosenView}/>)
              ) : (
                <h4>Nothing found</h4>
              )
            }
          </section>
        </React.Fragment> : 
        null
      }
      </section>
      
      
    
  )
};

