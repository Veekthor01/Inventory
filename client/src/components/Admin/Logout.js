import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

//* Component for logging out user
function Logout() {
    const navigate = useNavigate()

    // Function to handle user logout
    const handleLogout = () => {
        // Clear any stored user authentication information
        localStorage.removeItem('token')
        // Redirect to the login page
        navigate('/login')
        // Disable the ability to go back or navigate forward
        navigate(0)
    }

    // Check if user is authenticated
    useEffect(() => {
        const isAuthenticated = false
        // If not authenticated, redirect to login page
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [navigate])

    return <button onClick={handleLogout}>Logout</button>
}

export default Logout
