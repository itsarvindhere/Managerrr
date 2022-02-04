// REACT STATE
import {useState} from 'react';

// TIMESTAMP
import {timestamp} from '../../../firebase/config'

// useAuthContext
import {useAuthContext} from '../../../hooks/useAuthContext';

// useFirestore Hook
import {useFirestore} from '../../../hooks/useFirestore';

// AVATAR COMPONENT
import { Avatar } from '../../Avatar/Avatar';

// Date-FNS Imports
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const Comments = ({project}) => {
  const [newComment, setNewComment] = useState('');
   //Get Current User
   const {user} = useAuthContext();

    //Update Document Method
    const {updateDocument, response} = useFirestore('projects');
  
  // HANDLE SUBMIT METHOD
  const handleSubmit = async(e) => {
    e.preventDefault();
    const commentToAdd = {
        displayName: user.displayName,
        photoURL: user.photoURL,
        content: newComment,
        createdAt: timestamp.fromDate(new Date()),
        id: Math.random().toString(36).replace('0.', 'comment_' || '')
    }
    setNewComment('');
    await updateDocument(project.id, 
        //We have to also keep older comments if there are any and add new comments on top of those
        {comments: [{...commentToAdd}, ...project.comments]}
    );
  }

  return (
        <div className='project-comments'>
            <h4>Comments</h4> 
            <ul className='comments'>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className='comment-top'>
                       <div className='comment-author'>
                        <Avatar src={comment.photoURL}/>
                        <p>{comment.displayName}</p>
                       </div> 
                       <div className="comment-date">
                           <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix: true})}</p>
                       </div>
                       </div>
                       <div className='comment-content'>
                            <p>
                                {comment.content}
                            </p>
                       </div>
                    </li>
                ))
                }
            </ul>
            <form className='add-comment' onSubmit={handleSubmit}>
                <label>
                    <span>Add new Comment</span>
                    <textarea 
                      required
                      onChange={(e) => setNewComment(e.target.value)}
                      value={newComment}
                    >
                    </textarea>
                </label>
                <button disabled={response.isPending} style={{
                    cursor: response.isPending ? 'not-allowed' : 'pointer'
                }}
                className='btn'>Add Comment</button>
            </form>
        </div>
  );
};
