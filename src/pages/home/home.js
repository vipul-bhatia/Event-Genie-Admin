import { useAuthContext } from '../../hooks/useAuthContext'
import TransactionForm from './TransactionForm'
import styles from './home.module.css'
import { useCollection } from '../../hooks/useCollection'
import TransactionList from './TransactionList'
import { useState } from 'react'

import React from 'react'

export default function Home() {

const {user} = useAuthContext()
const {documents, error}= useCollection(
  'events',
  ["uid","==",user.uid],
  ['eventDate','desc'],
  'eventDate'
  )
const [selectedEvent, setSelectedEvent] = useState(null);

const handleUpdate = (event) => {
  setSelectedEvent(event);
};

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error  && <p>{error}</p>}
      {documents && <TransactionList events={documents} onUpdate={handleUpdate} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm  uid={user.uid} email={user.email} eventToUpdate={selectedEvent}/>
      </div>
    </div>
  )
}
