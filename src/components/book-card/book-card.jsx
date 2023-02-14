import { NavLink } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { selectAllCategories } from '../../store/categories/categories-selectors';
import {BASE_URL} from '../../config';

import { Rating } from '../raiting/raiting';
import { Button } from '../button/button';
import nocover from '../../imgs/nocover.jpg';

import './book-card.scss';

export const BookCard = (props) => {
  const dispatch = useDispatch();
  const bookCategories = useSelector(selectAllCategories);

  const { 
    id, 
    image = {}, 
    title, 
    categories = [], 
    authors = [], 
    issueYear, 
    rating, 
    choosenView
  } = props;


  return (
    <NavLink to={`/books/${categories}/${id}`} data-test-id='card' className={choosenView === 1 ? 'book-card-list' : 'book-card'}>
      <div className='image-container'>
        {(image === null) ? (
          <img
              className='book-cover'
              src={nocover}
              alt='not cover'
          />
        ) : (
          <img className='book-cover' src={BASE_URL+Object.values(image)[0]} 
          alt='cover of book'
          />
        )}
      </div>
      <div className={choosenView === 1 ? 'book-card-content-container' : ''}>
        <Rating rating={rating}/>
        <div className='book-card-content'>
          <div className='book-title-container'>
            <p className='book-title'>
                {title}
            </p>
          </div>
          <p className='book-author'>
              {authors}, <span>{issueYear}</span>
          </p>
        </div>
        <Button onClick={e => e.stopPropagation()}/>
      </div>
    </NavLink>
  );
}
