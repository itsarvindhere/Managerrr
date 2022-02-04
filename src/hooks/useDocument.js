//React Imports
import {useEffect, useState} from 'react';

//Firestore db object
import { db } from "../firebase/config"


export const useDocument = (collection, documentId) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    //Real Time Data for the Document
    useEffect(() => {
        //Get a Reference to that document
        const docRef = db.collection(collection).doc(documentId);
        //Listen for changes in that document
        const unsub = docRef.onSnapshot(snapshot => {
            //if the document reference has data or not
            if(snapshot.data()){
                setDocument({...snapshot.data(), id: snapshot.id});
                setError(null);
            } else {
                setError("No Such Project Exists!");
            }
            
        }, error => {
            console.log(error);
            setError("Could not fetch the data!");
        })

        return () => {
            unsub();
        }

    },[collection, documentId])

    return {document, error}
};
