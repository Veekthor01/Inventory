import React, { useState, useEffect, lazy, Suspense } from 'react'
import axios from 'axios'
import ComputerBox from './ComputerWidget'
import AccessoryBox from './AccessoryWidget'
import ComponentBox from './ComponentWidget'
import PersonnelBox from './PersonnelWidget'
import RecentActivity from './RecentActivity'
import RoomTable from './RoomItems'
// Importing the chart components using lazy loading
const ChartPage = lazy(() => import('./Charts'))
const ColumnChart = lazy(() => import('./ColumnChart'))

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

function Dashboard() {
    // State variables to store data fetched from the API
    const [computersData, setComputersData] = useState([])
    const [accessoriesData, setAccessoriesData] = useState([])
    const [componentsData, setComponentsData] = useState([])
    const [personnelData, setPersonnelData] = useState([])

    // Fetch data for the components from the API using useEffect hook when the component mounts
    useEffect(() => {
        fetchComputers()
        fetchAccessories()
        fetchComponents()
        fetchPersonnel()
    }, [])

    // Function to fetch computer data from the API
    const fetchComputers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/computers`)
            setComputersData(response.data)
        } catch (error) {
            console.error('Error fetching computer data:', error)
        }
    }

    // Function to fetch accessory data from the API
    const fetchAccessories = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/accessories`)
            setAccessoriesData(response.data)
        } catch (error) {
            console.error('Error fetching accessory data:', error)
        }
    }

    // Function to fetch component data from the API
    const fetchComponents = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/components`)
            setComponentsData(response.data)
        } catch (error) {
            console.error('Error fetching component data:', error)
        }
    }

    // Function to fetch personnel data from the API
    const fetchPersonnel = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/personnel`)
            setPersonnelData(response.data)
        } catch (error) {
            console.error('Error fetching personnel data:', error)
        }
    }

    return (
        <div>
            {/* Dashboard header */}
            <div className="header">
                <h1>Dashboard</h1>
            </div>

            {/* Widgets section */}
            <div className="widgets">
                <ComputerBox itemCount={computersData.length} />
                <AccessoryBox itemCount={accessoriesData.length} />
                <ComponentBox itemCount={componentsData.length} />
                <PersonnelBox itemCount={personnelData.length} />
            </div>

            {/* Charts and recent activity section */}
            <div className="activity_charts">
                <div className="activity">
                    <RecentActivity />
                </div>
                <div className="chart">
                    <Suspense fallback={<div>Loading Charts...</div>}>
                        <ChartPage />
                    </Suspense>
                </div>
            </div>

            {/* Column chart and location table section */}
            <div className="column_location">
                <div className="column-chart">
                    <Suspense fallback={<div>Loading Charts...</div>}>
                        <ColumnChart />
                    </Suspense>
                </div>
                <div className="location">
                    <RoomTable />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
