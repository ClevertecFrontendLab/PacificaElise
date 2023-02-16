import { Route, Routes, Navigate} from 'react-router-dom';

import { Layout } from '../layout/layout';
import { LayoutMainPage } from '../../pages/layout-main-page';
import { UseTerms } from '../../pages/terms';
import { ContractOffer } from '../../pages/contract';
import { BookPage } from '../../pages/book';
import { ProfilePage } from '../../pages/profile-page';
import { NotFoundPage } from '../../pages/not-found-page';
import { BooksList } from '../books-list/books-list';
import { Context } from '../../context';

export const App = () => (
  <Context>
    <Routes>
      <Route path='/' element={<Layout />}>
      <Route path='/' element={<Navigate to='/books/all'/>}/>
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
  </Context>
  );
