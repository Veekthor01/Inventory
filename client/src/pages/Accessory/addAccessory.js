import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddAccessory({ onAddAccessory, onCancel }) {
// State variable to store accessory data for the form
    const [accessoryData, setAccessoryData] = useState({
        type: '',
        S_N: '',
        model: '',
        extension_no: '',
        name: '',
        room: ''
        });

        // Function to handle changes in the form and update accessoryData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccessoryData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // Function to handle adding a new accessory and hide the form
    const handleAdd = () => {
        const { type, name, room } = accessoryData;
        if (type === '' || name === '' || room === '') {
            alert('Please enter all required fields.');
            return;
        }

        onAddAccessory(accessoryData);
        setAccessoryData({
            type: '',
            S_N: '',
            model: '',
            extension_no: '',
            name: '',
            room: ''
        });
    }

    // Function to handle canceling the accessory form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.ProfileForm}>
        <h2 className={styles.formTitle}>Add New Accessory</h2>
        <form className={styles.form}>
        <label>
                Type:
                <select name="type" value={accessoryData.type || ''} onChange={handleChange} className={styles.inputField}>
                    <option value="">Select Type</option>
                    <option value="Printer">Printer</option>
                    <option value="Telephone">Telephone</option>
                    <option value="Projector">Projector</option>
                    <option value="Television">Television</option>
                </select>
                {accessoryData.type === '' && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>Required</span>}
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
                <select name="name" value={accessoryData.name || ''} onChange={handleChange} className={styles.inputField}>
                    <option value="">Select Name</option>
                    <option value="HP LaserJet">HP LaserJet</option>
                    <option value="L.G">L.G</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Epson">Epson</option>
                    <option value="Cisco">Cisco</option>
                {accessoryData.name === '' && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>Required</span>}
                </select>
                </label>

                <label>
                Room:
                <select name="room" value={accessoryData.room || ''} onChange={handleChange} className={styles.inputField}>
                    <option value="">Select Room</option>
                    <option value="Room 2.1">Room 2.1</option>
                    <option value="Room 2.2">Room 2.2</option>
                    <option value="Room 2.3">Room 2.3</option>
                    <option value="Room 2.4">Room 2.4</option>
                    <option value="Room 2.5">Room 2.5</option>
                    <option value="Account Office">Account Office</option>
                    <option value="Registrar Office">Registrar Office</option>
                    <option value="Reception">Reception</option>
                    <option value="HOD Office">HOD Office</option>
                    <option value="Staff Room">Staff Room</option>
                    <option value="Admission Office">Admission Office</option>
                    <option value="Security Office">Security Office</option>
                    <option value="Library">Library</option>
                {accessoryData.room === '' && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>Required</span>}
                </select>
                </label>

                <button type="button" onClick={handleAdd} className={styles.addButtonForm}>Add</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
    </div>
    );
}

export default AddAccessory;

