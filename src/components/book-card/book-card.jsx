/* eslint-disable */

import { NavLink } from 'react-router-dom';
import {BASE_URL} from '../../config';

import { Rating } from '../raiting/raiting';
import { Button } from '../button/button';
import nocover from '../../imgs/nocover.jpg';

import './book-card.scss';

export const BookCard = (props) => {

  const { 
    id, 
    image = {}, 
    title, 
    category, 
    path,
    authors = [], 
    issueYear, 
    rating, 
    choosenView
  } = props;


  return (
    <NavLink to={`/books/${path}/${id}`} data-test-id='card' className={choosenView === 1 ? 'book-card-list' : 'book-card'}>
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
