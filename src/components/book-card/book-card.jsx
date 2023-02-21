/* eslint-disable */

import { useCallback } from 'react';

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {BASE_URL} from '../../config';

import { Rating } from '../raiting/raiting';
import { Button } from '../button/button';
import nocover from '../../imgs/nocover.jpg';

import './book-card.scss';
import { selectSearch } from '../../features/controls/controls-slice';

export const BookCard = (props) => {

  const { 
    id, 
    image = {},
    title, 
    path,
    authors = [], 
    issueYear, 
    rating, 
    choosenView
  } = props;

  const search =  useSelector(selectSearch);

  const Hightlight = () => {
    if (!search) return title;
    const regexp = new RegExp(search, 'ig');
    const matchValue = title.match(regexp);  
    if (matchValue) {
  
      return title.split(regexp).map((t, index, array) => {
        if (index < array.length - 1) {
          const c = matchValue.shift()
          return <>{t}<span data-test-id='highlight-matches' className='hightlight' key={index}>{c}</span></>
        }
        return t
      })
    }
    return title
  }

  const light = useCallback((title) => {
    return <Hightlight search={search} title={title} />
  }, [search])

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
              {light(title)}
            </p>
          </div>
          <p className='book-author'>
              {authors.join(', ')}, <span>{issueYear}</span>
          </p>
        </div>
        <Button onClick={e => e.stopPropagation()}/>
      </div>
    </NavLink>
  );
}
