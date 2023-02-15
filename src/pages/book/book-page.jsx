/* eslint-disable */

import { NavLink, useParams } from "react-router-dom";
import { useEffect,useState } from 'react';

import { useDispatch, useSelector } from "react-redux";

import { Button } from '../../components/button/button';
import { Rating } from '../../components/raiting/raiting';
import { SliderNavigation } from '../../components/slider/slider-navigation';
import { SliderPagination } from '../../components/slider/slider-pagination';
import { useResize } from '../../hooks/use-resize'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {ReactComponent as Arrow} from '../../imgs/icons/arrow.svg';

import nocover from '../../imgs/nocover.jpg';
import user from '../../imgs/user.jpg';

import './book-page.scss';
import { selectBookDetails } from "../../store/book-details/book-details-selectors";
import { loadBookById } from "../../store/book-details/book-details-actions";

export const BookPage = () => {
    const { bookId } = useParams();
    const { bookCategory } = useParams();

    const dispatch = useDispatch();
    const { error, status, currentBook } = useSelector(selectBookDetails);
    const { isScreenMd } = useResize();
    const  [isOpenDropdownComments, setOpenDropdownComments] = useState(true);

    useEffect(() => {
      dispatch(loadBookById())
    }, [bookId, dispatch])

    return (
      <>
        {error && <h1>Error...</h1>}
        {status === 'loading' && <h1>Loading...</h1>}
        {status === 'received' && (
        <section className='book-page'>
          <div className='book-path'>
            <span><NavLink to={`/books/${bookCategory}`}>{bookCategory}</NavLink>  &#160;/ &#160; {currentBook.title}</span>
          </div>
          <section className='book-description'>
              {currentBook.image.length ?
              <div className='image-container'>
                {isScreenMd ?
                  <SliderPagination images={Object.values(currentBook.image)}/> :
                  <SliderNavigation images={Object.values(currentBook.image)}/>
                }
              </div> :
              <div className='image-container'>
                <img
                  className='nocover'
                  src={nocover}
                  alt='not cover'
                />
              </div>
              }
              <div className='description-title-container'>
                <h2 className='description-title'>{currentBook.title}</h2>
                <p className='description-author'>{currentBook.authors}, {currentBook.issueYear}</p>
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
              <div className='raiting'><Rating /><h4>{currentBook.rating}</h4></div>
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
              <h4 className='comments-title'>Отзывы<span>2</span>             
                <button type='button' aria-label='dropdownComments' data-test-id='button-hide-reviews' onClick={() => setOpenDropdownComments(!isOpenDropdownComments)}><Arrow className={isOpenDropdownComments ? 'arrow-up' : ''}/></button>
              </h4>
              <div className={isOpenDropdownComments ? 'comments-wrapper' : 'not-visible'}>
                <div className='comments-container'>
                  <div className='user-profile'>
                    <div className='image-container'><img src={user} alt='user avatar'/></div>
                    <p className='user-name'>Иванов Иван</p>
                    <p className='user-date'>5 января 2019</p>
                  </div>
                  <div className='user-raiting-container'><Rating /></div>
                </div>
                <div className='comments-container'>
                  <div className='user-profile'>
                    <div className='image-container'><img src={user} alt='user avatar'/></div>
                    <p className='user-name'>Иванов Иван</p>
                    <p className='user-date'>5 января 2019</p>
                  </div>
                  <div className='user-raiting-container'><Rating /></div>
                  <p className='comment'>
                  Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.
                  </p>
                </div>
                <div className='comments-container'>
                  <div className='user-profile'>
                  <div className='image-container'><img src={user} alt='user avatar'/></div>
                    <p className='user-name'>Иванов Иван</p>
                    <p className='user-date'>5 января 2019</p>
                  </div>
                  <div className='user-raiting-container'><Rating /></div>
                </div>
              </div>
              <button type='submit' className='grade-btn' data-test-id='button-rating'>оценить книгу</button>
            </div>
          </section>
        </section>)}
      </>
)};

 /* {book[0].images.length === 0 ? (
              <img
                  className='book-cover'
                  src={nocover}
                  alt='not cover'
              />
            ) : (
              <img className='book-cover' src={book[0].images[0] === undefined ? nocover : book[0].images[0]} 
              alt='cover of book'
              />
            )}
            */