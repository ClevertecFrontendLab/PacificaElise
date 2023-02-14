import React, { useState } from 'react';
import {ReactComponent as Star} from '../../imgs/star.svg';

import './raiting.scss';

export const Rating = (props) => {
  const { rating } = props;

  return (
  
  <p className='raiting'>
    {rating === 0 ? (
      <span>ещё нет оценок</span>
      ) :
      (
      <React.Fragment>
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </React.Fragment>)
    }
  </p>
  )
}
  
  // сделать норм рейтинг
