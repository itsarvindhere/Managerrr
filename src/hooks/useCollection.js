//React Imports
import {useEffect, useState, useRef} from 'react';

//Firestore db object
import { db } from "../firebase/config"

export const useCollection = (collectionName, _query, _orderBy) => {

    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    //To avoid an infinite loop of useEffect because _query is passed as an array which is a reference type. 
    const query = useRef(_query).current;  
    const orderBy = useRef(_orderBy).current;    
    useEffect(() => {
        setIsPending(true);
        let collectionReference = db.collection(collectionName);
        if(query){
            collectionReference = collectionReference.where(...query);
        }

        if(orderBy){
            collectionReference = collectionReference.orderBy(...orderBy);
        }
        const unsub = collectionReference.onSnapshot(snapshot => {
            let docArray = [];
            snapshot.docs.forEach(doc => {
                docArray.push({...doc.data(), id: doc.id});
            })
            setIsPending(false);
            setDocuments(docArray);
            setError(null);
        }, error => {
            setIsPending(false);
            console.log(error);
            setError("Could not fetch the data!");
        })


        //Cleanup
        return () => {
            unsub();
        }
    }, [collectionName, query, orderBy])

    return {documents, error, isPending}
}
