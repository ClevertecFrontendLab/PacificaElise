
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsReg, selectRegInfo } from '../../features/reg/reg';

import './registration-page.scss';
import {ReactComponent as RegArrow} from '../../imgs/icons/reg-arrow.svg';
import { selectIsAuth } from '../../features/auth/auth-slice';

export const RegistrationPage = () => { 
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const isReg = useSelector(selectIsReg);
  const isAuth = useSelector(selectIsAuth);
  const {statusReg} = useSelector(selectRegInfo);

  const { register, formState: {errors, isValid}, setError, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: ''
    },
    mode: 'all'
    }
  );

  const onSubmit = (values) => { 
    dispatch(fetchRegister(values));
  }

  if (isReg) {
    return <Navigate to='/auth'/>
  }

  if (isAuth) {
    return <Navigate to='/books/all'/>
  }

  return (
  <div className='loader-wrapper'>
    {statusReg === 'loading' ?
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
    <div className={statusReg === 'loading' ? 'reg blur' : 'reg'}>
      <h1 className='company-title'>Cleverland</h1>
      <form className='reg-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='reg-block'>
          <h2 className='reg-title'>Регистрация</h2>
          <span className='reg-step'>{step} шаг из 3</span>
        </div>
        {step === 1 && (
        <div className='reg-inputs'>
          <label htmlFor='username' className='reg-label'>
            <input className='reg-input' id='username' type='text' placeholder='Придумайте логин для входа'
              {...register('username', {required: 'Поле не может быть пустым'})}/>
            {errors.username?.message ? <span className='error'>{errors.username?.message}</span> : <span>Используйте для логина латинский алфавит и цифры</span>}
          </label>
          <label htmlFor='password' className='reg-label'>
            <input className='reg-input' id='password' type='password' placeholder='Пароль' {...register('password', {required: 'Поле не может быть пустым'})}/>
            {errors.password?.message ? <span className='error'>{errors.password?.message}</span> :
            <span>Пароль не менее 8 символов, с заглавной буквой и цифрой</span>}
          </label>
        </div>
      )}
      {step === 2 && (
        <div className='reg-inputs'>
          <label htmlFor='firstName' className='reg-label'>
            <input className='reg-input' id='firstName' type='text' placeholder='Имя' {...register('firstName', {required: 'Поле не может быть пустым'})}/>
            {errors.firstName?.message && <span className='error'>{errors.firstName?.message}</span>}
          </label>   
          <label htmlFor='lastName' className='reg-label'>
            <input className='reg-input' id='lastName' type='text' placeholder='Фамилия' {...register('lastName', {required: 'Поле не может быть пустым'})}/>
            {errors.lastName?.message && <span className='error'>{errors.lastName?.message}</span>}
          </label>   
        </div>
      )}
      {step === 3 && (
        <div className='reg-inputs'>
          <label htmlFor='phone' className='reg-label'>
            <input className='reg-input' id='phone' type='phone' placeholder='Номер телефона' {...register('phone', {required: 'Поле не может быть пустым'})}/>
            {errors.phone?.message && <span className='error'>{errors.phone?.message}</span>}
          </label>   
          <label htmlFor='email' className='reg-label'>
            <input className='reg-input' id='email' type='email' placeholder='E-mail'
            {...register('email', {required: 'Поле не может быть пустым'})}/>
            {errors.email?.message && <span className='error'>{errors.email?.message}</span>}
          </label>  
        </div>
      )}
        {step === 3 ?
        <button disabled={!isValid} className='reg-btn' type='submit'>зарегистрироваться</button> :
        <button disabled={!isValid} className='reg-btn' type='submit' onClick={() => {setStep(prevStep => prevStep+1)}}>следующий шаг</button>}
        <p className='reg-enter'>Есть учётная запись?
          <NavLink to='/auth' className='reg-login'>войти</NavLink>
          {(step === 2 || step === 3) &&
          <NavLink to='/auth' className='reg-login'><RegArrow/></NavLink>}
        </p>
      </form>
    </div>
  </div>
  )
};
