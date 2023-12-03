import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import SearchPage from './SearchBar'

function NavigationMenu() {
    // State variables to manage the visibility of the dropdowns
    const [isNewDropdownOpen, setIsNewDropdownOpen] = useState(false)
    const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false)
    // Refs to DOM elements for handling click outside of dropdowns
    const newDropdownRef = useRef(null)
    const adminDropdownRef = useRef(null)
    // Get profile data from local storage
    const profileData = JSON.parse(localStorage.getItem('profileData'))
    // Extract profile data fields
    const lastName = profileData ? profileData.lastName : ''
    const firstName = profileData ? profileData.firstName : ''
    const picture = profileData ? profileData.picture : null

    useEffect(() => {
        // Function to close the dropdowns when clicking outside of them
        const handleOutsideClick = (event) => {
            if (
                newDropdownRef.current &&
                !newDropdownRef.current.contains(event.target) &&
                isNewDropdownOpen
            ) {
                setIsNewDropdownOpen(false)
            }
            if (
                adminDropdownRef.current &&
                !adminDropdownRef.current.contains(event.target) &&
                isAdminDropdownOpen
            ) {
                setIsAdminDropdownOpen(false)
            }
        }

        // Add event listener to window on mount
        window.addEventListener('click', handleOutsideClick)

        // Remove event listener on unmount
        return () => {
            window.removeEventListener('click', handleOutsideClick)
        }
    }, [isNewDropdownOpen, isAdminDropdownOpen])

    // Function to toggle the admin dropdown and close the new dropdown
    const handleAdminDropdownToggle = () => {
        setIsAdminDropdownOpen(!isAdminDropdownOpen)
        setIsNewDropdownOpen(false)
    }

    return (
        <nav className="nav">
            <div className="logo">
                <img src={require('./edulink-logo1.png')} alt="Logo" />
            </div>

            <div className="search-bar">
                <SearchPage />
            </div>

            <div className="navigation-menu">
                {/* Rest of the navigation menu code */}
                <div
                    className={`admin-bar ${
                        isAdminDropdownOpen ? 'isOpen' : ''
                    }`}
                    ref={adminDropdownRef}
                >
                    <div
                        className="dropdown-header"
                        onClick={handleAdminDropdownToggle}
                    >
                        {lastName && firstName && (
                            <div className="profile-info">
                                <img
                                    src={picture}
                                    alt="Profile"
                                    className="profile-picture"
                                />
                                <span className="profile-name">
                                    {firstName} {lastName}
                                </span>
                            </div>
                        )}

                        <span className="dropdown-icon">▼</span>
                    </div>
                    <div className="dropdown-menu">
                        {firstName && lastName && (
                            <div className="dropdownProfile-info">
                                <img
                                    src={picture}
                                    alt="Profile"
                                    className="Dprofile-picture"
                                />
                                <div className="profile-details">
                                    <span className="Dprofile-name">
                                        {firstName.charAt(0)}. {lastName}
                                    </span>
                                    <h6>Software Developer</h6>
                                </div>
                            </div>
                        )}

                        <Link to="/profile">
                            <i
                                className="bx bx-user"
                                style={{ fontWeight: 'bold' }}
                            ></i>{' '}
                            Profile
                        </Link>
                        <Link to="/change-password">
                            <i
                                className="bx bx-lock-alt"
                                style={{ fontWeight: 'bold' }}
                            ></i>{' '}
                            Change Password
                        </Link>
                        <Link to="/logout">
                            <i
                                className="bx bx-log-out"
                                style={{ fontWeight: 'bold' }}
                            ></i>{' '}
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavigationMenu
