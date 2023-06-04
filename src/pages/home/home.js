import { useAuthContext } from '../../hooks/useAuthContext'
import TransactionForm from './TransactionForm'
import styles from './home.module.css'

import React from 'react'

export default function Home() {

const {user} = useAuthContext()
  return (
    <div className={styles.container}>
      <div className={styles.content}>
    transaction list
      </div>
      <div className={styles.sidebar}>
        <TransactionForm  uid={user.uid}/>
      </div>
    </div>
  )
}
