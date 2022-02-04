import './App.css';
import {Route ,BrowserRouter, Link, Switch, Redirect} from 'react-router-dom';

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
          <Switch>
              <Route exact path='/'>
                  { user ? <Dashboard /> : <Redirect to='/login' /> }
              </Route>

              <Route path='/login'>
                { user ? <Redirect to='/' /> : <Login /> }
              </Route>

              <Route path='/signup'>
              { user ? <Redirect to='/' /> : <Signup /> }
              </Route>

              <Route path='/create'>
              { user ? <Create /> : <Redirect to='/login' /> }
              </Route>

              <Route path='/project/:id'>
              { user ? <Project /> : <Redirect to='/login' /> }
              </Route>
          </Switch>
      </div>
      {user && <OnlineUsers/>}
      </BrowserRouter>
      
      }
    </div>
  );
}

export default App
