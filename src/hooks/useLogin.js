//React Imports
import { useEffect, useState } from "react"

//Firebase Authentication Object
import {auth, db} from '../firebase/config';

//useAuthContext hook
import {useAuthContext} from '../hooks/useAuthContext';

export const useLogin = () => {

    const [isUnmounted, setIsUnmounted] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        setIsUnmounted(false);
        setError(null);
        setIsPending(true);
        try {
            const response = await auth.signInWithEmailAndPassword(email, password);
            if(!response) {
                throw new Error("Couldn't log in. Please try again!")
            }

            // Set online to true for this user
            await db.collection('users')
                    .doc(response.user.uid)
                    .update({
                        online: true
                    })

            dispatch({type: 'LOGIN', payload: response.user});

            if(!isUnmounted){
            setIsPending(false);    
            setError(null);
            }
            
        }catch (error){
            console.log(error.message);
            if(!isUnmounted){
                setError(error.message);
                setIsPending(false);
            }
           
        }
    }


    //For Cleanup
    useEffect(() => {
        return () => {
            setIsUnmounted(true);
        }
    },[])


    return {login, error, isPending};
}
