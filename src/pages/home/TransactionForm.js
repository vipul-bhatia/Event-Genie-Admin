import React, { useEffect } from 'react'
import firebase from 'firebase/app'
import { useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm(uid) {
    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [eventPlace, setEventPlace] = useState('')
    const [eventImage, setEventImage] = useState('')
    const [eventRegistrationLink, setEventRegistrationLink] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const {addDocument, response} =    useFirestore('events')


    const handleSubmit = (e)=>{
        e.preventDefault()
        const eventDateTimeString = `${eventDate}T${eventTime}:00`;
        const eventDateTime = new Date(eventDateTimeString);
        const firestoreTimestamp = firebase.firestore.Timestamp.fromDate(eventDateTime);


        if(eventImage) {
            addDocument({
                uid,
                eventName,
                eventDate: firestoreTimestamp,
                eventTime,
                eventPlace,
                eventRegistrationLink,
                eventDescription
            }, eventImage)
        } else {
            // handle case where image is not provided
            


        }
            
        
    }

    // reset the form fields
    useEffect(()=>{
        if(response.success){
            setEventName('')
            setEventDate('')
            setEventTime('')
            setEventPlace('')
            setEventImage('')
            setEventRegistrationLink('')
            setEventDescription('')
        }
    }, [response.success])
    const handleFileChange = (e) => {
        setEventImage(e.target.files[0]);
      };


  return (
    <>
      <h3>Add a Event</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Event Name: </span>
                <input type="text" required value={eventName} onChange={(e)=>setEventName(e.target.value)} />
            </label>
            <label>
                <span>Event Date: </span>
                <input type="date" required value={eventDate} onChange={(e)=>setEventDate(e.target.value)} />
            </label>
            <label>
                <span>Event Time: </span>
                <input type="time" required value={eventTime} onChange={(e)=>setEventTime(e.target.value)} />
            </label>
            <label>
                <span>Event Place: </span>
                <input type="text" required value={eventPlace} onChange={(e)=>setEventPlace(e.target.value)} />
            </label>
            <label>
                <span>Event Image: </span>
                <input type="file" required onChange={handleFileChange}/>
            </label>
            <label>
                <span>Event Registration Link: </span>
                <input type="url" required value={eventRegistrationLink} onChange={(e)=>setEventRegistrationLink(e.target.value)} />
            </label>
            <label>
                <span>Event Description: </span>
                <input type="text" required value={eventDescription} onChange={(e)=>setEventDescription(e.target.value)} />
            </label>

            <button>Add Event</button>
            </form>
    </>
  )
}
