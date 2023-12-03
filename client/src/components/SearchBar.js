import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchComputers, fetchAccessories, fetchComponents } from '../api/api'

//* Component for handling the search functionality and navigation
function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    // Handles the search form submission.
    const handleSearchSubmit = async (e) => {
        e.preventDefault()

        try {
            // Fetch all computers, accessories and components from the API
            const computers = await fetchComputers()
            const accessories = await fetchAccessories()
            const components = await fetchComponents()

            // Filter the data based on the search query.
            const computerResults = computers.filter(
                (computer) =>
                    computer.monitor_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    computer.mouse_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
            const accessoryResults = accessories.filter(
                (accessory) =>
                    accessory.type
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    accessory.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
            const componentResults = components.filter(
                (component) =>
                    component.type
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    component.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            )
            // Based on the search results, navigate to the corresponding pages.
            if (computerResults.length > 0) {
                navigateToComputers() // Redirect to the "Computers" page with the search query as a URL parameter
            } else if (accessoryResults.length > 0) {
                navigateToAccessories() // Redirect to the "Accessories" page with the search query as a URL parameter
            } else if (componentResults.length > 0) {
                navigateToComponents() // Redirect to the "Components" page with the search query as a URL parameter
            } else {
                navigateToNotFound() // Redirect to the "Not Found" page
            }
        } catch (error) {
            console.error('Error performing search:', error)
        }

        setSearchQuery('')
    }

    // Navigates to the "Computers" page with the search query as a URL parameter.
    const navigateToComputers = () => {
        navigate(`/computers?search=${encodeURIComponent(searchQuery)}`) // Redirect to the "Computers" page with the search query as a URL parameter
    }
    // Navigates to the "Accessories" page with the search query as a URL parameter.
    const navigateToAccessories = () => {
        navigate(`/accessories?search=${encodeURIComponent(searchQuery)}`) // Redirect to the "Accessories" page with the search query as a URL parameter
    }
    // Navigates to the "Components" page with the search query as a URL parameter.
    const navigateToComponents = () => {
        navigate(`/components?search=${encodeURIComponent(searchQuery)}`) // Redirect to the "Components" page with the search query as a URL parameter
    }
    // Navigates to the "Not Found" page if no search results are found.
    const navigateToNotFound = () => {
        navigate('/not-found') // Redirect to the "Not Found" page
    }

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" aria-label="Search">
                    <i className="bx bx-search"></i>
                </button>
            </form>
        </div>
    )
}

export default SearchPage
