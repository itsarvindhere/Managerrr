//CSS
import './Login.css'

//React Imports
import { useEffect, useState } from 'react';

// React Router Imports
import {useHistory}  from 'react-router-dom';

// LOADER
import Loader from '../../assets/three-dots.svg';

//Custom Hooks
import { useLogin } from '../../hooks/useLogin';
import { useAuthContext } from '../../hooks/useAuthContext';


export const Login = () => {
  //STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useSignup Hook
  const {login, isPending, error} = useLogin();

  // useAuthContext
  const {user} = useAuthContext();

  // Location
  const history = useHistory();

  //Handle FORM Submit Event
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    
  }

  // If user has logged in, then redirect to the homepage
  useEffect(() => {
      if(user){
        history.push('/');
      }
  }, [user])


  return(
    <form className='auth-form' onSubmit={handleSubmit}>
    <h2>Log In</h2>
    <label>
      <span>Email</span>
      <input 
        type='email' 
        required 
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </label>


    <label>
      <span>Password</span>
      <input 
        type='password' 
        required 
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
    </label>

    {isPending && <img 
      src={Loader} 
      alt='Loading'
      style={{filter: "invert(100%)"}}
      />}
    {!isPending && <button className='btn'>Log In</button>}
    {error && <div className='error'>{error}</div>}
</form>
   );
};
