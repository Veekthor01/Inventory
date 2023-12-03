import React from 'react'
import { useNavigate } from 'react-router-dom'

const ComponentBox = ({ itemCount }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        // Navigate to the ComponentsPage when the box is clicked
        navigate('/components')
    }

    return (
        <div className="widget-box" onClick={handleClick}>
            <p>{itemCount}</p>
            <div className="box-content">
                <h2>Components</h2>
                <i className="bx bx-server" style={{ color: '#FFB700' }} />
            </div>
        </div>
    )
}
export default ComponentBox
