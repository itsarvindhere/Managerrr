//React Imports
import { useState, useEffect} from "react";

//Firebase Auth Object
import { auth, storage, db } from "../firebase/config"

//Context
import {useAuthContext} from './useAuthContext';

export const useSignUp = () => {

    const [isUnmounted, setIsUnmounted] = useState(false);
    const [error, setError] =  useState(null);
    const [isPending, setIsPending] =  useState(false);

      
    //context
    const {dispatch} = useAuthContext();
    const signUp = async (email, password, displayName, displayPicture) => {
        setIsUnmounted(false);
        setError(null);
        setIsPending(true);
        try {
            //Sign up the user
            const response = await auth.createUserWithEmailAndPassword(email, password);

            if(!response){
                throw new Error('We Could not complete your Sign Up. Please Try Again after some time!');
            }

            //Upload the profile pic of the user to Firebase storage
            const imagePath =  `thumbnails/${response.user.uid}/${displayPicture.name}`;

            //Put the profile picture into the image path we created
            const image = await storage.ref(imagePath).put(displayPicture);

            //Get the image url from the storage
            const imageURL = await image.ref.getDownloadURL();

            //Add user's displayname
            await response.user.updateProfile({displayName, photoURL : imageURL});

            //Store the user details in users collection as a document. 
            
            //Instead of add() method that will create a document with auto generated id, we want the document id to be the same as the user id for which we are creating this document. So, that is why we used .doc() method because it will accept an id to refer to a document. If that document is not present in the collection, it will create that. Exactly what we want.

            //Finally, on that document, we set some fields and so we use the set() method that will create new fields if they are not already in that document. 
            await db.collection('users')
                    .doc(response.user.uid)
                    .set({
                        online: true,
                        displayName,
                        photoURL: imageURL
                    })

            //Dispatch Login action
            dispatch({type: 'LOGIN', payload: response.user});
            if(!isUnmounted) {
                setIsPending(false);
                setError(null);
            }
            

        } catch(error) {
            //if sign up fails with some error then this code runs
            console.log(error.message);
            if(!isUnmounted) {
                setError(error.message);
                setIsPending(false);
            }
        }
    }


    //For Cleanup we do this
    useEffect(() => {
        return () => {
            console.log("Unmounted");
            setIsUnmounted(true);
        }
    }, [])

    return {signUp, error, isPending};
    
}
