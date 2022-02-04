// AVATAR COMPONENTS
import {Avatar} from '../Avatar/Avatar';

// useFireStore Hook
import {useFirestore} from '../../hooks/useFirestore';

// useAuthContext Hook
import {useAuthContext} from '../../hooks/useAuthContext';

// React Router DOM Import
import {useNavigate} from 'react-router-dom';

export const ProjectSummary = ({project}) => {
    const {deleteDocument, response} = useFirestore('projects');
    const {user}= useAuthContext();
    const navigate = useNavigate();

    //HandleClick Method
    const handleClick = async() => {
        if(window.confirm("This will permanently delete the project. Are you sure?")){
            await deleteDocument(project.id);
        if(!response.error){
            navigate('/');
        }
        }
        
    }
  return (
    <div>
        <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className="due-date">
                    Project due by {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project is assigned to:</h4>
                <div className='assigned-users'>
                {project.assignedUsers.map(user => (
                    <div key={user.id} >
                        <Avatar src={user.photoURL} />
                    </div>
                ))}
                </div>

        </div>
        {user.uid === project.createdBy.id && <button className="btn" onClick={handleClick}>
                    Mark as Complete (Delete Project)
        </button>}
    </div>
  )
};
