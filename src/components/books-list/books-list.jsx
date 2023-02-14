/* eslint-disable */

import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { loadBooks } from '../../store/books/books-actions';
import { selectVisibleAllBooks, selectBooksInfo } from '../../store/books/books-selectors';
import { selectSearch } from '../../store/controls/controls-selectors';
import { BookCard } from '../book-card/book-card';
import { Navigation } from '../navigation/navigation';

import './books-list.scss';

export const BooksList = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const books = useSelector(state => selectVisibleAllBooks(state, {search}));
  const {status, error, qty} = useSelector(selectBooksInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadBooks());
    }
  }, [qty, dispatch])


  const [choosenView, setChoosenView] = useState();

  const handleChangeView = (btnId) => {
    setChoosenView(btnId);
  }

  return (
        <>
          {error && <h1>Error...</h1>}
          {status === 'loading' && <h1>Loading...</h1>}
          {status === 'received' && (
          <section className='booklist-container'>          
          <Navigation onChangeView={ handleChangeView }/>
            <section className={choosenView === 1 ? 'books-list-list' : 'books-list'}>
              {
              books.length ? (
                  books.map((book) => <BookCard 
                  key={book.id} 
                  {...book} 
                  choosenView={choosenView}/>)
                ) : (
                  <h4>Nothing found</h4>
                )
              }
            </section>
            </section>
        )
        }
      </>
  )
};

