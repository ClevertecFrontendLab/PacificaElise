/* eslint-disable */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { loadUserData, selectIsAuth, selectUserInfo, dropError } from '../../features/auth/auth-slice';
import {ReactComponent as ClosedEye} from '../../imgs/icons/closed-eye.svg';
import {ReactComponent as OpenedEye} from '../../imgs/icons/opened-eye.svg';

import './restore-password.scss';

export const RestorePassword = () => { 
  const dispatch = useDispatch();
  const {errorAuth, statusAuth} = useSelector(selectUserInfo);
  const isAuth = useSelector(selectIsAuth);
  const [toggleIcon, setToggleIcon] = useState(<ClosedEye/>);
  const [type, setType] = useState('password');

  const { register, formState: {errors, isValid, isDirty}, setError, handleSubmit } = useForm({
    defaultValues: {
      identifier: 'pihoozzz',
      password: '5123260'
    },
    mode: 'all'
    }
  );

  const onSubmit = async (values) => {
    localStorage.clear();
    const userData = await dispatch(loadUserData(values));
    if(userData.payload.data.jwt) {      
      localStorage.setItem('token', userData.payload.data.jwt);
      localStorage.setItem('user', JSON.stringify(userData.payload.data.user));
    }  
  }

  if (isAuth) {
    return <Navigate to='/books/all'/>
  }

  const removeError = () => {
    dispatch(dropError());
  }

  const togglePassInput = () => {
    if (type === 'password') {
      setType('text');
      setToggleIcon(<OpenedEye/>)
    } else {
      setType('password');
      setToggleIcon(<ClosedEye/>)
    }
  }

  return (
    <div className='loader-wrapper'>
    {statusAuth === 'loading' ?
        <div data-test-id='loader' className='loader'>
          <svg width="70" height="68" viewBox="0 0 70 68" fill="none">
            <path d="M63.9884 33C66.9634 33 69.4181 35.4262 68.9538 38.3646C68.2262 42.9697 66.5662 47.3979 64.0547 51.3702C60.5793 56.867 55.6158 61.2652 49.7407 64.054C43.8656 66.8428 37.32 67.9078 30.8638 67.1253C24.4077 66.3427 18.306 63.7448 13.2673 59.6332C8.22853 55.5216 4.45953 50.065 2.39793 43.897C0.336322 37.7291 0.0667017 31.1028 1.62037 24.7877C3.17405 18.4727 6.48727 12.7279 11.1753 8.2205C14.5631 4.96325 18.5684 2.44877 22.9339 0.812264C25.7195 -0.231984 28.5887 1.68624 29.1854 4.60069C29.7822 7.51514 27.8611 10.3078 25.1572 11.5485C22.7634 12.6468 20.5587 14.1435 18.6419 15.9864C15.4231 19.0812 13.1483 23.0255 12.0815 27.3615C11.0148 31.6974 11.1999 36.247 12.6154 40.4819C14.0309 44.7168 16.6187 48.4633 20.0783 51.2864C23.5379 54.1094 27.7273 55.8931 32.1601 56.4304C36.5929 56.9677 41.0871 56.2365 45.121 54.3217C49.1548 52.4069 52.5627 49.3871 54.949 45.613C56.37 43.3655 57.394 40.9054 57.9899 38.34C58.663 35.4422 61.0135 33 63.9884 33Z" fill="url(#paint0_linear_18296_2627)">
              <animateTransform 
                attributeName="transform"
                type="rotate"
                from="0 35 35"
                to="360 35 35"
                dur="0.8s"
                repeatCount="indefinite"/>
            </path>
            <defs>
              <linearGradient id="paint0_linear_18296_2627" x1="33.7618" y1="-129.207" x2="-231.946" y2="81.5261" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F83600"/>
              <stop offset="1" stopColor="#F9D423"/>
              </linearGradient>
            </defs>
          </svg>
        </div> :
        null
      }
      <div className={statusAuth === 'loading' ? 'restore-password-wrapper blur' : 'restore-password-wrapper'}>
        {errorAuth && !errorAuth.includes('400') ? 
          <div className='restore-password'>
            <h1 className='company-title'>Cleverland</h1>
            <div className='restore-password-form-err'>
              <div className='restore-password-block'>
                <h2 className='restore-password-title'>Вход не выполнен</h2>
              </div>
              <div className='restore-password-inputs'>
                <p className='restore-password-again'>Что-то пошло не так. Попробуйте ещё раз.</p>
              </div>           
              <button className='restore-password-btn-again' type='button'><NavLink to='/auth' onClick={removeError}>повторить</NavLink></button>
            </div>
          </div>
          : 
          <div className='restore-password'>
            <h1 className='company-title'>Cleverland</h1>
            <form className='restore-password-form' onSubmit={handleSubmit(onSubmit)}>
              <div className='restore-password-block'>
                <h2 className='restore-password-title'>Вход в личный кабинет</h2>
              </div>
              <div className='restore-password-inputs'>
                <div className='restore-password-container'>
                  <input className={errors.identifier?.type === 'required' ? 'restore-password-input-warn' : 'restore-password-input'} id='identifier' type='text' required='required' {...register('identifier', {required: 'Поле не может быть пустым'})}/>
                  <label htmlFor='identifier' className='restore-password-label'>Логин</label>  
                  <span className='error'>{errors.identifier?.message}</span>
                </div> 
                <div className='restore-password-container'>
                  <input className={errors.password?.type === 'required' ? 'restore-password-input-warn' : 'restore-password-input'} id='password' type={type} required='required' {...register('password', {required: 'Поле не может быть пустым'})}/>
                  <label htmlFor='password' className='restore-password-label'>Пароль</label>
                  <button type='button' className='eye-icon' onClick={togglePassInput}>{toggleIcon}</button>
                  <span className='error'>{errors.password?.message}</span>
                  {errorAuth?.includes('400') ?
                    <div className='restore-password-error-message'>
                      <span className='restore-password warn'>Неверный логин или пароль!</span>
                      <NavLink className='restore-password'>Восстановить?</NavLink>
                    </div> :
                    <NavLink className='forgot-password' to='/forgot-password'>Забыли логин или пароль?</NavLink>
                    }
                </div>   
              </div>           
              <button ddisabled={!isValid} className='restore-password-btn' type='submit'>вход</button>
              <p className='restore-password-enter'>Нет учётной записи?
                <NavLink to='/registration' className='restore-password-reg'>регистрация</NavLink>
              </p>
            </form>
          </div>
        }
      </div>
    </div>
    )
};