import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddComponent({ onAddComponent, onCancel }) {
// State variable to store component data for the form
    const [componentData, setComponentData] = useState({
        type: '',
        name: '',
        MAC_Address: '',
        S_N: '',
        model: '',
        processor: '',
        hd_size: '',
        ram_size: '',
        os_type: '',
        room: '',
        status: ''
    });
    
    // Function to handle changes in the form and update componentData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setComponentData(prevData => ({
            ...prevData,
            [name]: value
          }));
    };

    // Function to handle adding a new component and hide the form
    const handleAdd = () => {
        const { type, name, model } = componentData;
        if (type === '' || name === '' || model === '') {
            alert('Please enter all required fields.');
            return;
        }
     onAddComponent(componentData);
        setComponentData({
            type: '',
            name: '',
            MAC_Address: '',
            S_N: '',
            model: '',
            processor: '',
            hd_size: '',
            ram_size: '',
            os_type: '',
            room: '',
            status: ''
        });
    };

    // Function to handle canceling the component form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.ProfileForm}>
        <h2 className={styles.formTitle}>Add New Component</h2>
        <form className={styles.form}>
                <label>
                    Type:
                    <select name="type" value={componentData.type} onChange={handleChange} className={styles.inputField}>
                        <option value="">Select Type</option>
                        <option value="Server">Server</option>
                        <option value="Router">Router</option>
                        <option value="Switches">Switches</option>
                    </select>
                    {componentData.type === '' && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>Required</span>}
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={componentData.name} onChange={handleChange} className={styles.inputField} />
                    {componentData.name === '' && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>Required</span>}
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
                    {componentData.model === '' && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>Required</span>}
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
                    <input type="text" name="room" value={componentData.room} onChange={handleChange} className={styles.inputField}  placeholder="Server Room" readOnly/>
                </label>
                <label>
                    Status:
                    <input type="text" name="status" value={componentData.status} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleAdd} className={styles.addButtonForm}>Add</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
        </div>
    );

}

export default AddComponent;