
import React, { useState } from 'react'
import styles from './home.module.css'
import { useFirestore } from '../../hooks/useFirestore'




export default function TransactionList({events, onUpdate}) {
    const {deleteDocument} = useFirestore('events')
    const [selectedEvent, setSelectedEvent] = useState(null);

    const toggleDetails = (id) => {
        if (selectedEvent === id) {
            setSelectedEvent(null); // If clicked again, collapse the dropdown
        } else {
            setSelectedEvent(id);
        }
    }

    return (
        <ul className={styles.transactions}>
            {events.map((transaction) => {
                return (
                    <li key={transaction.id}>
                        <p className={styles.name}>{transaction.eventName}</p>


                        {/* Group the buttons together */}
                        <div className={styles["action-buttons"]}>
                            <button onClick={() => deleteDocument(transaction.id)}>Delete  /</button>
                            <button onClick={() => onUpdate(transaction)}>Update /</button>
                            <button className={styles["dropdown-toggle"]} onClick={() => toggleDetails(transaction.id)}>Details</button>
                        </div>
                        
                        <div className={`${styles.dropdown} ${selectedEvent === transaction.id ? styles.visible : ''}`}>
                            <img src={transaction.imageUrl} alt={transaction.eventName}/>
                            <p>Date: {new Date(transaction.eventDate.seconds * 1000).toLocaleDateString()}</p>
                            <p>Description: {transaction.eventDescription}</p>
                            <p>Time: {transaction.eventTime}</p>
                            <p>Created at: {new Date(transaction.createdAt.seconds * 1000).toLocaleDateString()}</p>
                            <p>Place: {transaction.eventPlace}</p>
                        </div>
                        
                    </li>
                );
            })}
        </ul>
    );
}
