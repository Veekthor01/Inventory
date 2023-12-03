import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdateAccessory({ accessory, onUpdate, setSelectedAccessoryData, onCancel }) {
// State variable to store the accessory data for the form
    const [accessoryData, setAccessoryData] = useState(accessory);
    
     // Function to handle changes in the form and update accessoryData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccessoryData(prevData => ({
        ...prevData,
        [name]: value
        }));
    // Update the selected accessory data in the parent component
        setSelectedAccessoryData(prevData => ({
        ...prevData,
        [name]: value
        }));
    };
    
    // Function to handle updating an accessory and hide the form
    const handleUpdate = () => {
        onUpdate(accessoryData);
    };

    // Function to handle canceling the accessory form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.computerForm}>
    <h2 className={styles.formTitle}>Update Accessory</h2>
            <form>
                <label>
                    Type:
                    <input type="text" name="type" value={accessoryData.type} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Serial Number:
                    <input type="text" name="S_N" value={accessoryData.S_N} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Model:
                    <input type="text" name="model" value={accessoryData.model} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Extension Number:
                    <input type="text" name="extension_no" value={accessoryData.extension_no} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={accessoryData.name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Room:
                    <input type="text" name="room" value={accessoryData.room} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
    </div>
    );
}

export default UpdateAccessory;