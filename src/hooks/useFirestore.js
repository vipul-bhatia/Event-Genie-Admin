import {useReducer, useEffect, useState} from 'react'
import { projectFirestore , projectStorage, timestamp} from '../firebase/config'


let initailState ={
    document : null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action)=>{
    switch(action.type){
        case 'IS_PENDING':
            return { isPending: true, document: null, sucess: false, error: null}
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null}
        case 'ERROR':
            return { isPending: false, error: action.payload, success: false,document: null }
        default:
            return state
    }
}
export const useFirestore= (collection)=>{
    const [response, dispatch] = useReducer(firestoreReducer, initailState)
    const [isCancelled, setIsCancelled] = useState(false)

    // collection ref
    const ref = projectFirestore.collection(collection)

    // only dispatch is not calcelled
    const dispatchIfNotCancelled = (action)=>{
        if(!isCancelled){
            dispatch(action)
        }
    }


    // image ref
    const imageRef = projectStorage.ref()

    // add document
    const addDocument = async (doc, image)=>{
        dispatch({type: 'IS_PENDING'})

        const uploadTask = imageRef.child(`images/${image.name}`).put(image);

        //upload image also
        uploadTask.on(
            'state_changed',
            snapshot => { /* handle progress */ },
            error => dispatchIfNotCancelled({ type: 'ERROR', payload: error.message }),
            async () => {
              try {
                const createdAt = timestamp.fromDate(new Date())
                const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
                const addedDocument = await ref.add({ ...doc, imageUrl,createdAt });
                dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument });
              } catch (error) {
                dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
              }
            }
          );
    }

    //delete document
    const deleteDocument = (id)=>{

    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)
    },[])

    return {addDocument, deleteDocument, response}
}