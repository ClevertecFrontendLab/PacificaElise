/* eslint-disable */

import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { loadBooks } from '../../store/books/books-actions';
import { selectVisibleBooks, selectBooksInfo } from '../../store/books/books-selectors';
import { selectControls } from '../../store/controls/controls-selectors';
import { BookCard } from '../book-card/book-card';
import { Navigation } from '../navigation/navigation';

import './books-list.scss';

export const BooksList = () => {
  const dispatch = useDispatch();
  const {search, category, path} = useSelector(selectControls);
  const books = useSelector(state => selectVisibleBooks (state, {search, category}));
  const {status, qty} = useSelector(selectBooksInfo);

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
        <>
          {status === 'received' && (
          <section className='booklist-container'>          
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
            </section>
        )
        }
      </>
  )
};

