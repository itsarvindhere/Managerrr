// STYLES
import './Avatar.css';

export const Avatar = ({src}) => {
  return (
    <div className='avatar'>
        <img src={src} alt='User Avatar' />
    </div>
  );
};
