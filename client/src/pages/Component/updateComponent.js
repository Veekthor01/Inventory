import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdateComponent({ component, onUpdate, setSelectedComponentData, onCancel }) {
    // State variable to store the component data for the form
    const [componentData, setComponentData] = useState(component);

    // Function to handle changes in the form and update componentData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setComponentData(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Update the selected component data in the parent component
        setSelectedComponentData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // Function to handle updating a component and hide the form
    const handleUpdate = () => {
        onUpdate(componentData);
    }

    // Function to handle canceling the component form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.computerForm}>
    <h2 className={styles.formTitle}>Update Component</h2>
    <form className={styles.form}>
                {/* Render input fields for each component data field */}
                <label>
                    Type:
                    <input type="text" name="type" value={componentData.type} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={componentData.name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    MAC Address:
                    <input type="text" name="MAC_Address" value={componentData.MAC_Address} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Serial Number:
                    <input type="text" name="S_N" value={componentData.S_N} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Model:
                    <input type="text" name="model" value={componentData.model} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Processor:
                    <input type="text" name="processor" value={componentData.processor} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Hard Drive Size:
                    <input type="text" name="hd_size" value={componentData.hd_size} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    RAM Size:
                    <input type="text" name="ram_size" value={componentData.ram_size} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    OS Type:
                    <input type="text" name="os_type" value={componentData.os_type} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Room:
                    <input type="text" name="room" value={componentData.room} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Status:
                    <input type="text" name="status" value={componentData.status} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
        </div>
    );
}

export default UpdateComponent;