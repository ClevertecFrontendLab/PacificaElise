import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import {ReactComponent as EnterArrow} from '../../imgs/icons/enter-arrow.svg';
import './forgot-password.scss';

export const ForgotPassword = () => { 
  const { register, formState: {errors,}, handleSubmit } = useForm();

  return (
  <div className='forgotpass'>
    <h1 className='company-title'>Cleverland</h1>
    <form className='forgotpass-form' onSubmit={handleSubmit}>
      <div className='forgotpass-profile'><NavLink to='/profile'><EnterArrow/>вход в личный кабинет</NavLink></div>
      <div className='forgotpass-block'>
        <h2 className='forgotpass-title'>Восстановление пароля</h2>
      </div>
      <div className='forgotpass-inputs'>  
        <div htmlFor='email' className='forgotpass-container'> 
          <input className='forgotpass-input' id='email' type='email' required='required'/>
          <label htmlFor='email' className='forgotpass-label'>Email</label>
          <span>На это email будет отправлено письмо с инструкциями по восстановлению пароля</span>
        </div>   
      </div>           
      <button className='forgotpass-btn' type='button'>восстановить</button>
      <p className='forgotpass-enter'>Нет учётной записи?
        <NavLink to='/registration' className='forgotpass-reg'>регистрация</NavLink>
      </p>
    </form>
  </div>
  )
};
