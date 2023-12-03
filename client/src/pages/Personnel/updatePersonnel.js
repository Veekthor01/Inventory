import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdatePersonnel({ personnel, onUpdate, setSelectedPersonnelData, onCancel }) {
    // State variable to store the personnel data for the form
    const [personnelData, setPersonnelData] = useState(personnel);
  
    // Function to handle changes in the form and update personnelData state
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPersonnelData(prevData => ({
        ...prevData,
        [name]: value
      }));
  
        // Update the selected personnel data in the parent component
      setSelectedPersonnelData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    // Function to handle updating a personnel and hide the form
    const handleUpdate = () => {
        onUpdate(personnelData);
        }

        // Function to handle canceling the personnel form and hide the form
        const handleCancel = () => {
            onCancel();
        }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.computerForm}>
    <h2 className={styles.formTitle}>Update Personnel</h2>
    <form className={styles.form}>
                <label>
                    First Name:
                    <input type="text" name="first_name" value={personnelData.first_name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="last_name" value={personnelData.last_name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Department:
                    <input type="text" name="department" value={personnelData.department} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Role:
                    <input type="text" name="role" value={personnelData.role} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Email Address:
                    <input type="text" name="email_address" value={personnelData.email_address} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
        </div>
    );
}

export default UpdatePersonnel;
