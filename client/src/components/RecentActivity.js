import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

//* Component for rendering a table of recent activity
const RecentActivity = () => {
    const [activityData, setActivityData] = useState([])

    // Fetch recent activity data from the API when the component mounts
    useEffect(() => {
        fetchRecentActivity()
    }, [])

    // Function to fetch recent activity data from the API
    const fetchRecentActivity = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/recentActivity?sort=datetime:desc`
            )
            setActivityData(response.data)
        } catch (error) {
            console.error('Error fetching recent activity data:', error)
        }
    }

    // Formats the datetime string into a more readable format.
    const formatDateTime = (datetime) => {
        const dateObj = new Date(datetime)
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        })
        const formattedTime = dateObj.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        })
        return `${formattedDate} ${formattedTime}`
    }

    return (
        <div className="activity">
            <h2>Recent Activity</h2>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Action</th>
                        <th>User</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {activityData.map((activity) => (
                        <tr key={activity.id}>
                            <td>{activity.item}</td>
                            <td>{activity.action}</td>
                            <td>{activity.account}</td>
                            <td>{formatDateTime(activity.datetime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RecentActivity