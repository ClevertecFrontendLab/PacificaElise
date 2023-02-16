import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Tile } from '../../imgs/icons/tile.svg';
import { ReactComponent as List } from '../../imgs/icons/list.svg';
import { useResize } from '../../hooks/use-resize'

import { selectSearch } from '../../store/controls/controls-selectors';
import './navigation.scss';
import { setSearch } from '../../store/controls/controls-actions';

export const Navigation = ({onChangeView}) => {
const dispatch = useDispatch();
const search =  useSelector(selectSearch);

const handleSearch = (e) => {
  dispatch(setSearch(e.target.value))
}

  const [btns, setBtns] = useState([
      { btnId: 0, img: <Tile className='view'/>, status: true, dataTestId: 'button-menu-view-window' },
      { btnId: 1, img: <List className='view'/>, status: false, dataTestId: 'button-menu-view-list' }
    ]);
    const { isScreenSm} = useResize();
    const [searchIsActive, setSearchIsActive] = useState(false);

  const choosebtn = (img) => {
    const newArr = btns.map((btn) =>
      btn.img === img ? { ...btn, status: true } : { ...btn, status: false }
    );
    setBtns(newArr);
  };

return (
  <nav className='navigation'>
    <form className='form'>
      <div className={isScreenSm && searchIsActive ? 'search active' : 'search'}>
        <button type='button' aria-label='search' data-test-id='button-search-open' className={isScreenSm && searchIsActive ? 'invisible' : 'icon'} onClick={() => setSearchIsActive(true)}/>
        <div className='input'>
          <input type='text' placeholder='Поиск книги или автора…' data-test-id='input-search' className={isScreenSm && !searchIsActive ? 'invisible' : 'input-search'} onChange={handleSearch} value={search}/>
          <button className='clear' type='button' aria-label='clear' data-test-id='button-search-close' onClick={() => setSearchIsActive(false)}/>
        </div>
      </div>
      <select className={isScreenSm && searchIsActive ? 'invisible' : 'select'}>
        <option value='1'>По рейтингу</option>
        <option value='2'>По автору</option>
        <option value='3'>По алфавиту</option>
      </select>
    </form>
    <div className={isScreenSm && searchIsActive ? 'invisible' : 'btns'}>
      {btns.map((btn) => (
          <button key={btn.btnId} data-test-id={btn.dataTestId} className={btn.status ? 'btn-active' : 'btn'} type='button' 
          onClick={
            () => {
              choosebtn(btn.img);
              onChangeView(btn.btnId)
            }
          }>{btn.img}</button>
        ))}
    </div>
  </nav>
  )
};


// options сделать динамически по категориям + selected disabled
