import React from 'react'
import { useNavigate } from 'react-router-dom'

const AccessoryBox = ({ itemCount }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        // Navigate to the AccessoryPage when the box is clicked
        navigate('/accessories')
    }

    return (
        <div className="widget-box" onClick={handleClick}>
            <p>{itemCount}</p>
            <div className="box-content">
                <h2>Accessories</h2>
                <i className="bx bx-printer" style={{ color: '#F62817' }} />
            </div>
        </div>
    )
}
export default AccessoryBox
