import React, { useState, useEffect } from 'react'
import styles from '../../pages/addupdate.module.css'

//* Component for user profile page
function ProfilePage() {
    // State variables to manage user profile data
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [title, setTitle] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [picture, setPicture] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [isProfileUpdated, setIsProfileUpdated] = useState(false)

    // Fetch profile data from local storage when the component mounts
    useEffect(() => {
        // Fetch the profile data from local storage when the component mounts
        const profileData = JSON.parse(localStorage.getItem('profileData'))
        if (profileData) {
            setFirstName(profileData.firstName)
            setLastName(profileData.lastName)
            setTitle(profileData.title)
            setPhone(profileData.phone)
            setEmail(profileData.email)
            setPicture(profileData.picture)
        }
    }, [])

    // State variables to hold error messages
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');


    // Function to handle saving the profile data
    const handleSaveProfile = () => {
         // Validate phone number format
         const phonePattern = /^\+254\d{9}$/;
         if (!phonePattern.test(phone)) {
             window.alert('Invalid phone number. Please use the correct format (+254xxxxxxxxx).');
             return;
         }
 
         // Validate email format
         const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
         if (!emailPattern.test(email)) {
             window.alert('Invalid email address. Please use a valid email format.');
             return;
         }
         if (!firstName) {
            setFirstNameError('First Name is required');
            return;
        } else {
            setFirstNameError('');
        }

        if (!lastName) {
            setLastNameError('Last Name is required');
            return;
        } else {
            setLastNameError('');
        }

        if (!phone) {
            setPhoneError('Phone Number is required');
            return;
        } else {
            setPhoneError('');
        }

        if (!email) {
            setEmailError('Email is required');
            return;
        } else {
            setEmailError('');
        }
        // Prepare the updated profile data
        const updatedProfileData = {
            firstName,
            lastName,
            title,
            phone,
            email,
            picture,
        }

        setIsUpdating(true)

        // Update the profile data in local storage
        localStorage.setItem('profileData', JSON.stringify(updatedProfileData))
        setIsUpdating(false)
        setIsProfileUpdated(true) // Set the update status to true
    }

    // Function to handle picture upload
    const handlePictureUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            setPicture(reader.result)
            localStorage.setItem('profilePicture', reader.result)
        })
        reader.readAsDataURL(file)
    }

    // Function to handle removing the profile picture
    const handleRemovePicture = () => {
        // Remove the existing picture from the state and local storage
        setPicture(null)
        localStorage.removeItem('profilePicture')
    }

    // Effect to show success message for profile update
    useEffect(() => {
        let timer
        if (isProfileUpdated) {
            timer = setTimeout(() => {
                setIsProfileUpdated(false)
            }, 3000) // Hide the success message after 3 seconds
        }
        return () => clearTimeout(timer) // Cleanup the timer on unmount
    }, [isProfileUpdated])

    return (
        <div id="computer-form" className={styles.ProfileForm}>
            <h2 className={styles.formTitle}>Edit Profile</h2>
            <form className={styles.form}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                     {firstNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{firstNameError}</span>}
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                        {lastNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{lastNameError}</span>}
                </label>
                <br />
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.inputField}
                        placeholder= 'admin'
                        readOnly
                    />
                </label>
                <br />
                <label>
                    Phone:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.inputField}
                    />
                    {phoneError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{phoneError}</span>}
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.inputField}
                        required
                    />
                    {emailError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{emailError}</span>}
                </label>
                <br />
                <label>
                    Picture:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureUpload}
                        className={styles.pictureField}
                        required
                    />
                </label>
                <br />
                {picture && (
                    <div className={styles.pictureContainer}>
                        <img
                            src={picture}
                            alt="Profile"
                            className="save-picture"
                        />
                        <button
                            className={styles.addButton}
                            type="button"
                            onClick={handleRemovePicture}
                        >
                            Remove Picture
                        </button>
                    </div>
                )}
                <br />
                <div className={styles.saveProfile}>
                    <button
                        className={styles.updateButton}
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={isUpdating}
                    >
                        Save Profile
                    </button>
                    {isProfileUpdated && (
                        <div className={styles.successMessage}>
                            Profile updated successfully!
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ProfilePage
