import avatar from '../../imgs/avatar.jpg';

import './personal-input.scss';

export const PersonalInput = () => (
  <div className='personal-input-container'>
      <span className='personal-input-greetings'>Привет, Иван!</span>
      <div className='img-container'><img src={avatar} alt='avatar'/></div>
  </div>
);