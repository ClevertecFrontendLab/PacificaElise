import { NavLink } from 'react-router-dom';
import { Logo } from '../logo/logo';
import { PersonalInput } from '../personal-input/personal-input';
import { BurgerMenu } from '../burger-menu/burger-menu';

import './header.scss';

export const Header = () => (
  <header className='header'>
      <div className='title-container'>
          <BurgerMenu /> 
          <Logo />
        <h1 className='title'>Библиотека</h1>
      </div>
      <NavLink className='personal-profile' to='/profile'>
        <PersonalInput/>
      </NavLink>
  </header>
);

