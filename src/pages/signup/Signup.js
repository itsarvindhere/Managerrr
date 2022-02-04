//REACT Imports
import {useState} from 'react';
import { useSignUp } from '../../hooks/useSignUp';

//CSS
import './Signup.css'

// LOADER
import Loader from '../../assets/three-dots.svg';

export const Signup = () => {

  //STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setdisplayName] = useState('');
  const [displayPicture, setDisplayPicture] = useState(null);

  const [uploadError, setUploadError] = useState(null);

  // useSignup Hook
  const {signUp, isPending, error} = useSignUp();

  //Handle File Uploaded by the User
  const handleFileChange = (e) => {
    // RESET
    setDisplayPicture(null);
    let selectedImage = e.target.files[0];

    //CHECK IF THERE IS A FILE SELECTED
    if(!selectedImage){
      setUploadError('Please select a file!');
      return;
    }

    //CHECK IF IT IS AN IMAGE FILE OR NOT
    if(!selectedImage.type.includes('image')){
      setUploadError('Please select an image!');
      return;
    }

    //MAKE SURE THE SIZE IS NOT TOO BIG ( > 100000 bytes)
    if(selectedImage.size > 100000) {
      setUploadError('Image file size must be less than 100Kb');
      return;
    }

    setUploadError(null);
    setDisplayPicture(selectedImage);
  }


  //Handle FORM Submit Event
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!uploadError){
      signUp(email, password, displayName, displayPicture);
    }
  }

  return (
      <form className='auth-form' onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
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

          <label>
            <span>Display Name</span>
            <input 
              type='text' 
              required 
              onChange={(e) => setdisplayName(e.target.value)}
              value={displayName}
            />
          </label>

          <label>
            <span>Profile Picture</span>
            <input 
              required
              type='file'
              onChange={handleFileChange}
            />
             {uploadError && <span className='error'>{uploadError}</span>} 
          </label>
          {isPending && <img 
            src={Loader} 
            alt='Loading'
            style={{filter: "invert(100%)"}}
            />}
          {!isPending && <button className='btn'>Sign Up</button>}
          {error && <div className='error'>{error}</div>}
      </form>
  );
};
