import React, { useState } from 'react';
import styles from '../../addupdate.module.css';

function UpdateComputer({ maintenance, onUpdate, setSelectedMaintenanceData, onCancel }) {
    // State variable to store the maintenance data for the form
    const [maintenanceData, setMaintenanceData] = useState(maintenance);

    // Function to handle changes in the form and update maintenanceData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMaintenanceData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Update the selected maintenance data in the parent component
        setSelectedMaintenanceData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // Function to handle updating a maintenance and hide the form
    const handleUpdate = () => {
        onUpdate(maintenanceData);
    }

    // Function to handle canceling the maintenance form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.computerForm}>
    <h2 className={styles.formTitle}>Update Maintenance</h2>
    <form className={styles.form}>
                <label>
                    Item Name:
                    <input type="text" name="item_name" value={maintenanceData.item_name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={maintenanceData.type} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Maintenance Type:
                    <input type="text" name="maintenance_type" value={maintenanceData.maintenance_type} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
    </div>
    );
}

export default UpdateComputer;