import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../App.css'

function Sidebar() {
    // State variables to manage the visibility of reports and sidebar
    const [showReports, setShowReports] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    // State variable to track hovered icon when sidebar is closed
    const [hoveredIcon, setHoveredIcon] = useState(null)
    // Refs to DOM elements for handling click outside of reports and nested items
    const activityRef = useRef(null)
    const maintenanceRef = useRef(null)
    // Hook to get the current URL location
    const location = useLocation()

    // Toggle the visibility of the reports dropdown
    const toggleReports = () => {
        setShowReports(!showReports)
    }

    // Toggle the sidebar visibility
    const toggleSidebar = () => {
        setShowReports(false)
        setIsSidebarOpen(!isSidebarOpen)
    }

    // Handle click on the reports dropdown
    const handleReportClick = () => {
        setShowReports(!showReports)
    }

    // Handle mouse enter on an icon when the sidebar is closed
    const handleIconMouseEnter = (iconName) => {
        if (!isSidebarOpen) {
            setHoveredIcon(iconName)
        }
    }

    // Handle mouse leave on an icon when the sidebar is closed
    const handleIconMouseLeave = () => {
        if (!isSidebarOpen) {
            setHoveredIcon(null)
        }
    }

    // Handle click outside of reports and nested items to close the dropdown
    const handleOutsideClick = (event) => {
        if (
            !event.target.closest('.report') &&
            !event.target.closest('.nested')
        ) {
            setShowReports(false)
        }
    }

    // Use effect to reset the reports and hoveredIcon states when the sidebar is closed
    useEffect(() => {
        if (!isSidebarOpen) {
            setShowReports(false)
            setHoveredIcon(null)
        }
    }, [isSidebarOpen])

    // Use effect to add and remove click event listener for handling click outside
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="logo-bar">
                <div className="toggle-bar" onClick={toggleSidebar}>
                    <div className={`bar ${isSidebarOpen ? 'open' : ''}`} />
                    <div className={`bar ${isSidebarOpen ? 'open' : ''}`} />
                    <div className={`bar ${isSidebarOpen ? 'open' : ''}`} />
                </div>
            </div>
            <ul className="sidelinks">
                <li className={location.pathname === '/' ? 'active' : ''}>
                    <span>
                        <Link
                            to="/"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Dashboard')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Dashboard"
                        >
                            <i className="bx bx-grid-alt" />
                            {(isSidebarOpen || hoveredIcon === 'Dashboard') && (
                                <span>Dashboard</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/computers' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/computers"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Computers')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Computers"
                        >
                            <i className="bx bx-desktop" />
                            {(isSidebarOpen || hoveredIcon === 'Computers') && (
                                <span>Computers</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/accessories' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/accessories"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Accessories')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Accessories"
                        >
                            <i className="bx bx-printer" />
                            {(isSidebarOpen ||
                                hoveredIcon === 'Accessories') && (
                                <span>Accessories</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/components' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/components"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Components')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Components"
                        >
                            <i className="bx bx-server" />
                            {(isSidebarOpen ||
                                hoveredIcon === 'Components') && (
                                <span>Components</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/personnel' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/personnel"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Personnel')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Personnel"
                        >
                            <i className="bx bx-group" />
                            {(isSidebarOpen || hoveredIcon === 'Personnel') && (
                                <span>Personnel</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/licenses' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/licenses"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Licenses')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Licenses"
                        >
                            <i className="bx bx-key" />
                            {(isSidebarOpen || hoveredIcon === 'Licenses') && (
                                <span>Licenses</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/categories' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/categories"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Categories')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Categories"
                        >
                            <i className="bx bx-category" />
                            {(isSidebarOpen ||
                                hoveredIcon === 'Categories') && (
                                <span>Categories</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/suppliers' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/suppliers"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Suppliers')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Suppliers"
                        >
                            <i className="bx bx-package" />
                            {(isSidebarOpen || hoveredIcon === 'Suppliers') && (
                                <span>Suppliers</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li
                    className={
                        location.pathname === '/departments' ? 'active' : ''
                    }
                >
                    <span>
                        <Link
                            to="/departments"
                            onMouseEnter={() =>
                                handleIconMouseEnter('Departments')
                            }
                            onMouseLeave={handleIconMouseLeave}
                            aria-label="Departmemnts"
                        >
                            <i className="bx bx-store" />
                            {(isSidebarOpen ||
                                hoveredIcon === 'Departments') && (
                                <span>Departments</span>
                            )}
                        </Link>
                    </span>
                </li>
                <li>
                    <span
                        className="report"
                        onClick={handleReportClick}
                        onMouseEnter={() => handleIconMouseEnter('Reports')}
                        onMouseLeave={handleIconMouseLeave}
                    >
                        <i className="bx bx-file" />
                        {(isSidebarOpen || hoveredIcon === 'Reports') && (
                            <span>Reports</span>
                        )}
                        {isSidebarOpen && (
                            <i
                                className={`bx ${
                                    showReports
                                        ? 'bxs-chevron-down'
                                        : 'bxs-chevron-left'
                                } arrow`}
                                onClick={toggleReports}
                            />
                        )}
                    </span>
                    {showReports && (
                        <ul className="nested">
                            <li ref={activityRef}>
                                <li
                                    className={
                                        location.pathname ===
                                        '/reports/activity-history'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link
                                        to="/reports/activity-history"
                                        onMouseEnter={() =>
                                            handleIconMouseEnter(
                                                'Activity History'
                                            )
                                        }
                                        onMouseLeave={handleIconMouseLeave}
                                        aria-label="Activity History"
                                    >
                                        <i className="bx bx-list-ul" />
                                        {(isSidebarOpen ||
                                            hoveredIcon ===
                                                'Activity History') && (
                                            <span>Activity History</span>
                                        )}
                                    </Link>
                                </li>
                            </li>
                            <li ref={maintenanceRef}>
                                <li
                                    className={
                                        location.pathname ===
                                        '/reports/maintenance'
                                            ? 'active'
                                            : ''
                                    }
                                >
                                    <Link
                                        to="/reports/maintenance"
                                        onMouseEnter={() =>
                                            handleIconMouseEnter('Maintenance')
                                        }
                                        onMouseLeave={handleIconMouseLeave}
                                        aria-label="Maintenance"
                                    >
                                        <i className="bx bx-wrench" />
                                        {(isSidebarOpen ||
                                            hoveredIcon === 'Maintenance') && (
                                            <span>Maintenance</span>
                                        )}
                                    </Link>
                                </li>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
