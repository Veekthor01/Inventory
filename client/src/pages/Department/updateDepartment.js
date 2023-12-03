import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdateComputer({ department, onUpdate, setSelectedDepartmentData, onCancel }) {
    // State variable to store the department data for the form
    const [departmentData, setDepartmentData] = useState(department);

    // Function to handle changes in the form and update departmentData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    
        // Update the selected department data in the parent component
        setSelectedDepartmentData(prevData => ({
            ...prevData,
            [name]: value
        }));
        }

    // Function to handle updating a department and hide the form
    const handleUpdate = () => {
        onUpdate(departmentData);
    }

    // Function to handle canceling the department form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.computerForm}>
    <h2 className={styles.formTitle}>Update Department</h2>
            <form>
                <label>
                    Department:
                    <input type="text" name="department" value={departmentData.department} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Staff:
                    <input type="text" name="staff" value={departmentData.staff} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
    </div>
    );
}

export default UpdateComputer;