//CSS
import './Dashboard.css'

// useState
import { useState } from 'react';

// useCollection Hook
import {useCollection} from '../../hooks/useCollection';

//useAuthContext
import {useAuthContext} from '../../hooks/useAuthContext';

// Project List Component
import { ProjectList } from '../../components/ProjectList/ProjectList';

// Project Filter Component
import { ProjectFilter } from './Project Filter/ProjectFilter';

// LOADER
import Loader from '../../assets/three-dots.svg';

export const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  
  const {documents, error, isPending} = useCollection(
    'projects'
    );

  const {user} = useAuthContext();

  // FILTERED PROJECTS
  const filteredProjects = documents && documents.filter((document) => {
    switch(currentFilter){
        case 'all':
          return true;
        case 'mine':
          let assignedToMe = false;
          document.assignedUsers.forEach(assignedUser => {
            console.log(assignedUser.id === user.uid);
            if(assignedUser.id === user.uid){
              assignedToMe = true;
            }
          })
          return assignedToMe;
        case 'development':
        case 'design':
        case 'marketing':
        case 'sales':
          return document.category === currentFilter;
        default:
          return true;
    }
  })

  return (
  <div>
      <h2 className='page-title'>Dashboard</h2>
      {error && <p className='error'>{error}</p>}
      {documents && 
      <ProjectFilter 
      currentFilter = {currentFilter}
      setCurrentFilter = {setCurrentFilter}
      />
      }
      <hr></hr>

      {isPending && <div 
        className='loading'
        style={{textAlign: 'center',
        marginTop: '50px'}}
      >
        <img 
              src={Loader} 
              alt='Loading'
              style={{filter: "invert(100%)"}}
              /></div>}
      {documents &&
       <ProjectList 
       projects={filteredProjects}
       />}
  </div>
  );
};
