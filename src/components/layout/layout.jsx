import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

import './layout.scss';
import { selectBooksInfo } from '../../store/books/books-selectors';
import { ErrorToast } from '../../error-toast/error-toast';

export const Layout = () => {
const {status, error} = useSelector(selectBooksInfo);

return (
    <div className='layout-container'>
      <Header />
      {status === 'loading' && <h1>Loading...</h1>}
      {error === null ? null : <ErrorToast />}
        <Outlet />
      <Footer />
    </div>
)
};
