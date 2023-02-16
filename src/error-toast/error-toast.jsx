import { useState } from 'react';
import warning from '../imgs/icons/warningCircle.svg';
import './error-toast.scss';

export const ErrorToast = () => {
  const [errorIsActive, setErrorIsActive] = useState(true);

  return (
    <div className={errorIsActive ?'error-toast' : 'not-visible'} data-test-id='error'>
      <div className='image-container'>
        <img src={warning} alt='warning'/>
      </div>
      <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
      <button className='close' type='button' aria-label='close' data-test-id='button-error-close' onClick={() => setErrorIsActive(false)}/>    
    </div>
  )};