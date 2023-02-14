import { NavLink } from 'react-router-dom';
import logo from '../../imgs/logo.svg';

import './logo.scss';

export const Logo = () => (
  <NavLink to='/' className='logo-container'>
    <img src={logo} alt='logo'/>
    <span className='logo-inscription'>Cleverland</span>
  </NavLink>
);