//CSS
import './Project.css';

// useParams
import {useParams} from 'react-router-dom';

// useDocument Hook
import {useDocument} from '../../hooks/useDocument';

// LOADER
import Loader from '../../assets/three-dots.svg';

// PROJECT SUMMARY COMPONENT
import { ProjectSummary } from '../../components/Project Summary/ProjectSummary';

// COMMENTS COMPONENTS
import { Comments } from '../../components/Comments/Comments/Comments';


export const Project = () => {

  const { id } = useParams();

  const {document, error} = useDocument('projects', id);

  if(error){
    return <div className='error'>{error}</div>
  }

  if(!document){
    return <div className='loading'><img 
    src={Loader} 
    alt='Loading'
    style={{filter: "invert(100%)"}}
    /></div>
  }

  return (
  <div className='project-details'>
      <ProjectSummary project={document}/>
      <Comments project={document}/>
  </div>
  );
};
