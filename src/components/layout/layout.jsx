/* eslint-disable */

import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

import './layout.scss';

export const Layout = () => (
    <div className='layout-container'>
      <Header />
        <Outlet />
      <Footer />
    </div>
);
