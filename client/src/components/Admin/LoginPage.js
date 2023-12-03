import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from '../../pages/login.module.css'

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

//* Component for user login page
function LoginPage() {
    // State variables to manage form inputs
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // Function to handle form submission and user login
    const handleLogin = async (e) => {
        e.preventDefault()

        if (!username || !password) {
            return
        }

        try {
            // API call to perform user login
            const response = await axios.post(`${API_BASE_URL}/api/login`, {
                username,
                password,
            })
            const token = response.data.token
            // Store the token in local storage
            localStorage.setItem('token', token)

            if (response.status === 200) {
                window.alert('Login successful!')
                navigate('/')
            } else {
                window.alert(
                    'Login failed. Please check your username and password.'
                )
            }
        } catch (error) {
            console.error('Error logging in:', error)
            window.alert(
                'An error occurred while logging in. Please try again later.'
            )
        }
    }

    return (
        <div className={styles.container}>
            <img
                src={require('../edulink-logo1.png')}
                alt="Logo"
                className={styles.img}
            />
            <div className={styles.loginInfo}>
                Use admin / password to login
            </div>
            <form onSubmit={handleLogin}>
                <div className={styles.data}>
                    <label htmlFor="username" className={styles.label}>
                        <i
                            className="bx bx-user"
                            style={{ fontWeight: 'bold', marginRight: '1px' }}
                        ></i>
                        Username
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </label>
                </div>
                <div className={styles.data}>
                    <label htmlFor="password" className={styles.label}>
                        <i
                            className="bx bx-key"
                            style={{ fontWeight: 'bold', marginRight: '1px' }}
                        ></i>
                        Password
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </label>
                </div>
                <div className={styles.btn}>
                    <div className={styles.inner}></div>
                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
