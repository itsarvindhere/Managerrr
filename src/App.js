import './App.css';
import {Route ,BrowserRouter, Routes, Navigate} from 'react-router-dom';

//PAGES
import {Dashboard} from './pages/dashboard/Dashboard';
import {Login} from './pages/login/Login';
import {Signup} from './pages/signup/Signup';
import {Create} from './pages/create/Create';
import {Project} from './pages/project details/Project';

//COMPONENTS
import { Navbar } from './components/Navbar/Navbar';
import {Sidebar} from './components/Sidebar/Sidebar';

// useAuthContext
import { useAuthContext } from './hooks/useAuthContext';
import { OnlineUsers } from './components/Online Users/OnlineUsers';


function App() {
  const {user, authIsReady} = useAuthContext();
  return (
    <div className="App">
      {authIsReady && 
      <BrowserRouter>
      {user && <Sidebar  className="sidebar"/>}
      <div className='container'>
        <Navbar />
          <Routes>
              <Route path='/' element={ user ? <Dashboard /> : <Navigate to='/login' /> } />

              <Route path='/login' element={ user ? <Navigate to='/' /> : <Login /> } />

              <Route path='/signup' element={ user ? <Navigate to='/' /> : <Signup /> } />

              <Route path='/create' element={ user ? <Create /> : <Navigate to='/login' /> } />

              <Route path='/project/:id' element={ user ? <Project /> : <Navigate to='/login' /> } />

          </Routes>
      </div>
      {user && <OnlineUsers/>}
      </BrowserRouter>
      
      }
    </div>
  );
}

export default App
