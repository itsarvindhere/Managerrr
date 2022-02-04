// STYLES
import './ProjectList.css';

// React Router DOM Imports
import {Link} from 'react-router-dom';

// Avatar Component
import { Avatar } from '../Avatar/Avatar';


export const ProjectList = ({projects}) => {
  return (
    <div className='project-list'>
    {projects.length === 0  && <p className='empty-project'>No projects yet.</p>}
    {projects.map(project => (
        <Link key={project.id} to={`/project/${project.id}`}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className='assigned-to'>
                <ul>
                {project.assignedUsers.map(user => (
                    <li key={user.id}>
                        <Avatar src={user.photoURL} alt='User Avatar'/>
                    </li>
                ))}
                </ul>
            </div>
        </Link>
        ))
    }
    </div>
    )
};
