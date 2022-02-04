// STYLES
import './OnlineUsers.css';

// useCollection HOOK
import {useCollection} from '../../hooks/useCollection';
import { Avatar } from '../Avatar/Avatar';

export const OnlineUsers = () => {
  const {documents, error} = useCollection('users');
  return (
    <div className='user-list'>
        <h2>All Users</h2>
        {error && <div className='error'>{error}</div>}
        <div className='all-users'>
        {documents && documents.map(user => (
            <div key={user.id} className='user-list-item'>
                {user.online && <span className='online-user'></span>}
                <span>{user.displayName}</span>
                <Avatar className="avatar" src={user.photoURL} />
            </div>
        ) )}
        </div>
    </div>
    );
};
