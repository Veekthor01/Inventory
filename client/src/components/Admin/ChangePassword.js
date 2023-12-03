import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styles from '../../pages/addupdate.module.css'

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

//* Component for changing user password
function ChangePassword() {
    // State variables to manage form inputs and error messages
    const [username, setUsername] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    // State variables to manage error messages
    const [usernameError, setUsernameError] = useState('')
    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [isPasswordChanged, setIsPasswordChanged] = useState(false) // State to track successful password change
    const navigate = useNavigate()

    const newPasswordPattern = /^.{4,10}$/;
    // Function to handle form submission and change password
    const handleChangePassword = async (e) => {
        e.preventDefault()

        // Validate the input fields
        if (!username) {
            setUsernameError('Username is required')
            return
        }
        if (!oldPassword) {
            setOldPasswordError('Old password is required')
            return
        }
        if (!newPassword) {
            setNewPasswordError('New password is required')
            return
        }
        if (!newPasswordPattern.test(newPassword)) {
            setNewPasswordError('New password must be between 4 to 10 characters');
            return;
        }
        try {
            // API call to change password
            const response = await axios.put(
                `${API_BASE_URL}/api/change-password`,
                {
                    username,
                    oldPassword,
                    newPassword,
                }
            )

            // Check the response status and perform the necessary actions based on success or failure
            if (response.status === 200) {
                // Password changed successfully
                setIsPasswordChanged(true)
                setTimeout(() => {
                    navigate('/')
                }, 4000)
            } else if (response.status === 401) {
                // Invalid old password
                window.alert(response.data.error)
            } else if (response.status === 404) {
                // User not found
                window.alert(response.data.error)
            } else {
                // Handle other error cases
                window.alert(
                    'An error occurred while changing the password. Please try again later.'
                )
            }
        } catch (error) {
            // Handle error, display error message
            console.error('Error changing password:', error)
            window.alert(
                'An error occurred while changing the password. Please try again later.'
            )
        }
    }

    useEffect(() => {
        let timer
        if (isPasswordChanged) {
            timer = setTimeout(() => {
                setIsPasswordChanged(false)
            }, 3000) // Hide the success message after 3 seconds
        }
        return () => clearTimeout(timer) // Cleanup the timer on unmount
    }, [isPasswordChanged])

    return (
        <div id="computer-form" className={styles.ProfileForm}>
            <h2 className={styles.formTitle}>Change Password</h2>
            <form onSubmit={handleChangePassword} className={styles.form}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.inputField}
                    />
                    {usernameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{usernameError}</span>}
                </label>
                <br />
                <label>
                    Old Password:
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className={styles.inputField}
                    />
                    {oldPasswordError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{oldPasswordError}</span>}
                </label>
                <br />
                <label>
                    New Password:
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className={styles.inputField}
                    />
                    {newPasswordError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{newPasswordError}</span>}
                </label>
                <br />
                <div className={styles.saveProfile}>
                    <button type="submit" className={styles.updateButton}>
                        Save Password
                    </button>
                    {isPasswordChanged && (
                        <div className={styles.successMessage}>
                            Password changed successfully!
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
