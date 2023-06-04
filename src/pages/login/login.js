import React from 'react'
import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

//styles
import styles from './login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {error, isPending, login} = useLogin()

    const handleSubmit = (e)=>{
       e.preventDefault()
       login(email,password)
    }

  return (
    <form className={styles['login-form']} onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
            <span>Email</span>
            <input 
            type='email' 
            onChange={(e)=> setEmail(e.target.value)}
            value = {email}
            required
            />
        </label>
        <label>
            <span>Password</span>
            <input
            type='password'
            onChange={(e)=> setPassword(e.target.value)}
            value = {password}
            required
            />
        </label>
        {!isPending && <button className='btn'>Login</button>}
        {isPending && <button className='btn' disabled>Loading</button>}
        {error && <p>{error}</p>}
    </form>
  )
}
