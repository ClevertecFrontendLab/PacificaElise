import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import './forgot-password.scss';

export const ForgotPassword = () => { 
  const { forgotpassister, formState: {errors,}, handleSubmit } = useForm();

  return (
  <div className='forgotpass'>
    <h1 className='company-title'>Cleverland</h1>
    <form className='forgotpass-form' onSubmit={handleSubmit}>
      <NavLink to='/profile' className='forgotpass-profile'>вход в личный кабинет</NavLink>
      <div className='forgotpass-block'>
        <h2 className='forgotpass-title'>Восстановление пароля</h2>
      </div>
      <div className='forgotpass-inputs'>  
        <label htmlFor='email' className='forgotpass-label'> 
          <input className='forgotpass-input' id='email' type='email' placeholder='Email'/>
          <span>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
        </label>   
      </div>           
      <button className='forgotpass-btn' type='button'>восстановить</button>
      <p className='forgotpass-enter'>Нет учётной записи?
        <NavLink to='/' className='forgotpass-reg'>регистрация</NavLink>
      </p>
    </form>
  </div>
  )
};
