//CSS
import './Sidebar.css';
import DashboardIcon from '../../assets/dashboard_icon.svg'
import AddIcon from '../../assets/add_icon.svg'

// React Router Imports
import {NavLink} from 'react-router-dom';

// User Avatar Component
import { Avatar } from '../Avatar/Avatar';

// useAuthContet
import { useAuthContext } from '../../hooks/useAuthContext';

export const Sidebar = () => {
    const {user}  = useAuthContext();
  return (
     <div className='sidebar'>
         <div className='sidebar-content'>
            <div className='user'>
                {/* User Avatar an Display Name Here */}
               <Avatar src={user.photoURL} /> 
               <p>
                   Hey {user.displayName}
               </p>
              
            </div>
            <nav className='links'>
                <ul>
                    <li>
                        <NavLink exact to='/'>
                            <img src={DashboardIcon} alt='Dashboard Icon' />
                            <span>Dashboard</span>
                        </NavLink>


                        <NavLink to='/create'>
                            <img src={AddIcon} alt='Add Project Icon' />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
         </div>
     </div>
  );
}
