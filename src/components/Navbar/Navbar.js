//CSS
import './Navbar.css';

//React Router imports
import {Link} from 'react-router-dom';

//Logo
import Temple from '../../assets/temple.svg'

//Custom Hooks
import {useLogOut} from '../../hooks/useLogOut';
import {useAuthContext} from '../../hooks/useAuthContext';


// LOADER
import Loader from '../../assets/three-dots.svg';

export const Navbar = () => {

    const {logout, isPending} = useLogOut();
    const {user} = useAuthContext();
  
    return ( 
    <div  className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple}  alt='Managerrr'/>
                <span>Managerrr</span>
            </li>

            { !user && 
            <>
            <li>
                <Link to='/login'>Login</Link>
            </li>

            <li>
                <Link to='/signup'>Signup</Link>
            </li>
            </>
            }

            { user && 
            <li className='logout-container'>
                {isPending && 
                <img src={Loader}
                alt='Loading'
                style={{filter: "invert(100%)"}}
                />}
               {!isPending && 
               <button 
               onClick={() => logout()}className='btn'>
                   Logout
                </button>}
            </li>
}

        </ul>
    </div>
  );
};
