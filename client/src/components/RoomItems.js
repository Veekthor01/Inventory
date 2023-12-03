import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;
//* Component for rendering a table of Items by Location
const RoomTable = () => {
    const [roomData, setRoomData] = useState([])

    // Fetch room data from the API when the component mounts
    useEffect(() => {
        fetchRoomData()
    }, [])

    // Function to fetch room data from the API
    const fetchRoomData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/room_data`)
            setRoomData(response.data)
        } catch (error) {
            console.error('Error fetching room data:', error)
        }
    }

    return (
        <div>
            <h2>Item Location</h2>
            <table>
                <thead>
                    <tr>
                        <th>Room</th>
                        <th>Computer</th>
                        <th>Accessory</th>
                        <th>Component</th>
                    </tr>
                </thead>
                <tbody>
                    {roomData.map((row) => (
                        <tr key={row.id}>
                            <td>{row.room}</td>
                            <td>{row.computer}</td>
                            <td>{row.accessory}</td>
                            <td>{row.component}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RoomTable
