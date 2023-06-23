import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";
import firebase from 'firebase/app'

export const useCollection = (collection,_query,_orderBy,filterByDateField) => {
	const [documents, setDocuments] = useState(null);
	const [error, setError] = useState(null);

    // prevent infinite loop 
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

	useEffect(() => {
		let ref = projectFirestore.collection(collection)

        if(query && query[2]){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref= ref.orderBy(...orderBy)
        }

		if(filterByDateField){
			const currentDate = firebase.firestore.Timestamp.now();
			ref = ref.where(filterByDateField, '>=', currentDate);
		  }


		const unsubscribe = ref.onSnapshot(
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id });
				});

				//update state
				setDocuments(results);
				setError(null);
			},
			(error) => {
				console.log(error);
				setError("Could not fetch Data");
			}
		);

		//unsubscribe from collection when unmounting
		return () => unsubscribe();
	}, [collection, query, orderBy,filterByDateField]);
	return { documents, error };
};
