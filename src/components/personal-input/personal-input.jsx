/* eslint-disable */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import avatar from '../../imgs/avatar.jpg';
import { logOut } from '../../features/auth/auth-slice';

import './personal-input.scss';
import { useDispatch } from 'react-redux';

export const PersonalInput = () => {
  const dispatch = useDispatch();
  const [isVisible, setVisible] = useState(false);

  const toogleProfileMenu = () => {
    setVisible(isVisible => !isVisible);
  }

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.clear();
  }
  
  return (
    <div className='personal-input-container' onClick={() => toogleProfileMenu()}>
      <div className='personal-input-info'>
        <span className='personal-input-greetings'>Привет, {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).firstName : 'Иван'}!</span>
        <span style={{ color: '#727272', fontSize: '12px'}}> Договор 123456789</span>
      </div>
      <div className='img-container'><img src={avatar} alt='avatar'/></div>
      <ul className={isVisible ? 'profile-menu-container' : 'invisible'}>
        <li><NavLink className='personal-profile' to='/profile'>Профиль</NavLink></li>
        <li onClick={handleLogOut}>Выход</li>
      </ul>
    </div>
    
)};