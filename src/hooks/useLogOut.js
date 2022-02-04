//React Imports
import { useState, useEffect } from "react"

//Firebase Auth Object

import { auth, db } from "../firebase/config"

//Context Hook
import { useAuthContext } from "./useAuthContext"

export const useLogOut = () => {
    const [isUnmounted, setIsUnmounted] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const {dispatch, user} = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        //Logout the user
        try {

            //Set online to false in users collection
            //We cannot do it after we hae signed user out because in that case no user has logged in and hence our firestore rules will not allow that. 

            await db.collection('users').doc(user.uid).update({
                online: false
            })

            await auth.signOut();

            //Dispatch Logout action (No Payload means all we want is the user to be null in our AuthContext)
            dispatch({type: 'LOGOUT'});

            //Update states
            if(!isUnmounted){
                setIsPending(false);
                setError(null);
            }
           
        } catch(error){
            if(!isUnmounted){
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
            }
    }
}

    //For Cleanup we do this
    useEffect(() => {
        return () => {
            setIsUnmounted(true);
        }
    }, [])

    return {logout, error, isPending};

}
