import { Rating } from '../raiting/raiting';
import { BASE_URL } from '../../config';
import userAva from '../../imgs/user.jpg';

export const Comment = (props) => {
    const {user, createdAt, rating, text} = props;
    const date = new Date(createdAt);
    const myDate = date.toString().slice(4,15)

    return (
    <div className='comments-container'>
      <div className='user-profile'>
        <div className='image-container'><img src={user.avatarUrl === null ? userAva : BASE_URL+Object.values(user.avatarUrl)} alt='user avatar'/></div>
        <p className='user-name'>{user.firstName} &#160; {user.lastName}</p>
        <p className='user-date'>{myDate}</p>
      </div>
      <div className='user-raiting-container'><Rating />{rating}</div>
      <p className='comment'>
      {text}
      </p>
    </div>)
    }