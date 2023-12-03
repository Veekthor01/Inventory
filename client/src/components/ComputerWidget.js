import React from 'react'
import { useNavigate } from 'react-router-dom'

const ComputerBox = ({ itemCount }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        // Navigate to the ComputersPage when the box is clicked
        navigate('/computers')
    }

    return (
        <div className="widget-box" onClick={handleClick}>
            <p>{itemCount}</p>
            <div className="box-content">
                <h2>Computers</h2>
                <i className="bx bx-desktop" />
            </div>
        </div>
    )
}

export default ComputerBox
