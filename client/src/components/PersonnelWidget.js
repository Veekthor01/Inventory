import React from 'react'
import { useNavigate } from 'react-router-dom'

const PersonnelBox = ({ itemCount }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        // Navigate to the PersonnelPage when the box is clicked
        navigate('/personnel')
    }

    return (
        <div className="widget-box" onClick={handleClick}>
            <p>{itemCount}</p>
            <div className="box-content">
                <h2>Personnel</h2>
                <i className="bx bx-group" style={{ color: '#056608' }} />
            </div>
        </div>
    )
}

export default PersonnelBox
