/* eslint-disable */

import { Route, Routes, Navigate, useSearchParams} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout } from '../layout/layout';
import { LayoutMainPage } from '../../pages/layout-main-page';
import { UseTerms } from '../../pages/terms';
import { ContractOffer } from '../../pages/contract';
import { BookPage } from '../../pages/book';
import { ProfilePage } from '../../pages/profile-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { BooksList } from '../books-list/books-list';
import { RegistrationPage } from '../../pages/registration';
import { LogIn } from '../../pages/log-in';
import {ForgotPassword} from '../../pages/forgot-password';
import { selectIsStorage } from '../../features/auth/auth-slice';
import { ResetPassword } from '../../pages/reset-password/reset-password';

export const App = () => {
  const isStorage = useSelector(selectIsStorage);
  const [searchParams] = useSearchParams();
  const code =searchParams.get('code');

  return (
    <Routes>
      <Route path='/' element = {<Navigate to={isStorage? '/auth' : '/registration'}/>}/>
      <Route path='/auth' element={<LogIn />} />
      <Route path='/registration' element={<RegistrationPage />} />
      <Route path='/forgot-pass' element={code ? <ResetPassword /> : <ForgotPassword />} />
      <Route path='/' element={<Layout />} >
        <Route path='books/' element={<LayoutMainPage />}>
            <Route path=':bookCategory' element={<BooksList />} />
            <Route path='terms' element={<UseTerms />} />
            <Route path='contract' element={<ContractOffer />} />
        </Route>
        <Route path='books/:bookCategory/:bookId' element={<BookPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
};