import { useState } from 'react';
import { useSelector } from 'react-redux';

import warning from '../../imgs/icons/warningCircle.svg';
import './error-toast.scss';

export const ErrorToast = () => {
  const [errorIsActive, setErrorIsActive] = useState(true);
  const errorToast = useSelector(state => state.errorToast);

  return (
    <div className={errorToast===false || errorIsActive===false ? 'not-visible' : 'error-container'} data-test-id='error'>
      <div className='error-toast'>
        <div className='image-container'>
          <img src={warning} alt='warning'/>
        </div>
        <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
        <button className='close' type='button' aria-label='close' data-test-id='button-error-close' onClick={() => setErrorIsActive(false)}/>   
      </div> 
    </div>
  )};