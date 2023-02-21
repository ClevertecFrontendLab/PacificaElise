
import { NavLink, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Comment } from '../../components/comment/comment'
import { Button } from '../../components/button/button';
import { Rating } from '../../components/raiting/raiting';
import { ErrorToast } from '../../components/error-toast/error-toast';
import { SliderNavigation } from '../../components/slider/slider-navigation';
import { SliderPagination } from '../../components/slider/slider-pagination';
import { useResize } from '../../hooks/use-resize';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';

import nocover from '../../imgs/nocover.jpg';

import { selectBookDetails, clearDetails, loadBookById, selectDetailsInfo } from '../../features/details/details-slice';

import './book-page.scss';
import { clearSearch, selectControls } from '../../features/controls/controls-slice';

export const BookPage = () => {
    const { bookId } = useParams();

    const dispatch = useDispatch();
    const { currentBook } = useSelector(selectBookDetails);
    const {errorBookId, statusBookId} = useSelector(selectDetailsInfo)
    const { category, path} = useSelector(selectControls);
    const { isScreenMd } = useResize();
    const [isOpenDropdownComments, setOpenDropdownComments] = useState(true);
    

    useEffect(() => {
      dispatch(loadBookById(bookId));
      return () => {
        dispatch(clearDetails());
        dispatch(clearSearch())
      }
    }, [bookId, dispatch]);

    return (
        <section className='book-page'>
          <div className='book-path'>
            <span><NavLink to={`/books/${path}`} data-test-id='breadcrumbs-link'>{category}</NavLink>  &#160;/ &#160; <span data-test-id='book-name'>{currentBook ? currentBook.title : ''}</span></span>
          </div>
          {errorBookId && statusBookId !== 'loading' ? <ErrorToast /> : null}
          {statusBookId === 'received' && (
          <React.Fragment>
            <section className='book-description'>
                {currentBook.images === null ?
                  <div className='image-container'>
                  <img
                    className='nocover'
                    src={nocover}
                    alt='not cover'
                  />
                  </div> : 
                  <div className='image-container'>
                    {isScreenMd ?
                      <SliderPagination images={currentBook.images}/> :
                      <SliderNavigation images={currentBook.images}/>
                    }
                  </div>
                }
                <div className='description-title-container'>
                  <h2 className='description-title' data-test-id='book-title'>{currentBook.title}</h2>
                  <p className='description-author'>{currentBook.authors.join(', ')}, {currentBook.issueYear}</p>
                  <Button className='description-title-container-btn'/>
                </div>
                <div className='description-about'>
                  <h4>О книге</h4>
                  <p>{currentBook.description}</p>
                </div>
            </section>
            <section className='book-feedback-container'>
              <div className="book-raiting-container ">
                <h4 className='raiting-title'>Рейтинг</h4>
                <div className='raiting'><Rating /><h4>{currentBook.rating === null ? 0 : currentBook.rating}</h4></div>
              </div>
              <div className='book-detailed-container'>
                <h4 className='detailed-title'>Подробная информация</h4>
                <div className='detailed'>
                  <div className='detailed-column'>
                    <div className='detailed-column-keys'>
                      <p>Издательство</p>
                      <p>Год издания</p>
                      <p>Страниц</p>
                      <p>Переплёт</p>
                      <p>Формат</p>
                    </div>
                    <div className='detailed-column-values'>
                      <p>{currentBook.publish}</p>
                      <p>{currentBook.issueYear}</p>
                      <p>{currentBook.pages}</p>
                      <p>{currentBook.cover}</p>
                      <p>{currentBook.format}</p>
                    </div>
                  </div>
                  <div className='detailed-column'>
                    <div className='detailed-column-keys'>
                      <p>Жанр</p>
                      <p>Вес</p>
                      <p>ISBN</p>
                      <p>Изготовитель</p>
                    </div>
                    <div className='detailed-column-values'>
                      <p>{currentBook.categories}</p>
                      <p>{currentBook.weight}</p>
                      <p>{currentBook.ISBN}</p>
                      <p>{currentBook.producer}</p>
                    </div>
                </div>
                </div>
              </div>
              <div className='book-comments-container'>
                <h4 className='comments-title'>Отзывы<span>{currentBook.comments === null ? 0 : currentBook.comments.length}</span> 
                  {currentBook.comments === null ? 
                  null : 
                  <button type='button' aria-label='dropdownComments' data-test-id='button-hide-reviews' onClick={() => setOpenDropdownComments(!isOpenDropdownComments)}><Arrow className={isOpenDropdownComments ? 'arrow-up' : ''}/></button>
                  }            
                </h4>
                {currentBook.comments === null ? 
                  null : 
                  <div className={isOpenDropdownComments ? 'comments-wrapper' : 'not-visible'}>
                    {
                    currentBook.comments.map((comment) => <Comment key={comment.id} {...comment}/>)
                    }  
              </div>}
                <button type='submit' className='grade-btn' data-test-id='button-rating'>оценить книгу</button>
              </div>
            </section>
          </React.Fragment>
          )}
        </section>
)};

