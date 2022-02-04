//CSS
import './Create.css'
// React Imports 
import {useState, useEffect} from 'react';

// React-Select Package
import Select from 'react-select';

//React Router Imports
import {useHistory} from 'react-router-dom';

// useCollection Hook
import {useCollection} from '../../hooks/useCollection';

// TimeStamp 
import { timestamp } from '../../firebase/config';

// AuthContext
import {useAuthContext} from '../../hooks/useAuthContext';

// useFirestore Hook
import {useFirestore} from '../../hooks/useFirestore';

// LOADER
import Loader from '../../assets/three-dots.svg';

// Categories. Never gonna change so outside the Component
const categories = [
  {value: 'development', label: 'Development'},
  {value: 'design', label: 'Design'},
  {value: 'sales', label: 'Sales'},
  {value: 'marketing', label: 'Marketing'}
]


export const Create = () => {
  const {documents}  = useCollection('users');
  const [users, setUsers] = useState([]);

  //Creatiing object for the users to use in React-Select below
  useEffect (() => {
    if(documents) {
      const options = documents.map(user => {
        return {value: user, label: user.displayName}
      })
      setUsers(options);
    }
  }, [documents])


  // FORM FIELDS
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);

  // ERROR STATE
  const [categoryError, setCategoryError] = useState(null);
  const [assignedUsersError, setAssignedUsersError] = useState(null);

  // useHistory
  const history = useHistory();


  // User from AuthContext
  const {user} = useAuthContext();

  // useFireStore Hook
  const {addDocument, response} = useFirestore('projects');
 
  // handleSubmit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCategoryError(false);
    setAssignedUsersError(false);

    // ERROR CHECKING
    if(!category){
      setCategoryError("Please Select a Project Category!");
      return;
    }

    if(assignedUsers.length < 1){
      setAssignedUsersError("There should be at least one assigned user!");
      return;
    }

    //Details of user who created this project
    const createdBy = {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL
    }


    //Trimmed down list for assigned users that only contains a few properties for each assigned user
    const assignedUsersList = assignedUsers.map(user => {
      return {
        id: user.value.id,
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
      }
    });


    // Creating an Object for the Project to save it to Database
    const project = {
      name,
      details,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      category: category.value,
      comments: [],
      createdBy,
      assignedUsers: assignedUsersList,
    };

    await addDocument(project);
    if(!response.error){
      history.push('/');
    }
  }

  return (
   <div className="create-form">
       <h2 className="page-title">Create a new Project</h2>
       <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name</span>
          <input
            type='text'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
           />
        </label>

        <label>
          <span>Project Details</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
           />
        </label>

        <label>
          <span>Due Date</span>
          <input
            type='date'
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
           />
        </label>

        <label>
          <span>Project Category</span>
          <Select 
            onChange={(option) => {
              setCategory(option);
              setCategoryError(false);
            }}
            options={categories}
          />
          {categoryError && <div className="error">{categoryError}</div>}
        </label>

        <label>
          <span>Assigned To</span>
          <Select 
            closeMenuOnSelect={false}
            onChange={(option) => {
              setAssignedUsers(option);
              setAssignedUsersError(false);
            }}
            options={users}
            isMulti
          />
          {assignedUsersError && <div className="error">{assignedUsersError}</div>}
        </label>

        {response.isPending && <img 
            src={Loader} 
            alt='Loading'
            style={{filter: "invert(100%)"}}
            />
        }

        {!response.isPending && <button className='btn'>
          Add Project
        </button>
        }
       </form>
   </div>
   );
};
