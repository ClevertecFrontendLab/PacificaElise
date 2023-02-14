import { useParams } from "react-router-dom";
import { useContext, useState } from 'react';
import { CustomContex } from '../../context'
import {BookCard} from '../book-card/book-card';
import {Navigation} from '../navigation/navigation'

import '../books-list/books-list.scss';

export const CategoryBooksList = () => {
  const { bookCategory } = useParams();
  const { books = []} = useContext(CustomContex);  
  const filteredBook = books.filter((book) => book.category === bookCategory);
  const [choosenView, setChoosenView] = useState();

  const handleChangeView = (btnId) => {
    setChoosenView(btnId);
  }

  return (
    <section className='booklist-container'>
      <Navigation onChangeView={ handleChangeView }/>
      <section className={choosenView === 1 ? 'books-list-list' : 'books-list'}>
          {
          books.length ? (
            filteredBook.map(filteredBook => <BookCard 
                key={filteredBook.id} 
                {...filteredBook}
                choosenView={choosenView}
                />)
            ) : (
              <h4>Nothing found</h4>
            )
          }
      </section>
    </section>
  )
}
  