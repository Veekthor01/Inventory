import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdateComputer({ computer, onUpdate, setSelectedComputerData, onCancel }) {
    // State variable to store the computer data for the form
    const [computerData, setComputerData] = useState(computer);
  // Function to handle changes in the form and update computerData state
    const handleChange = (e) => {
      const { name, value } = e.target;
      setComputerData(prevData => ({
        ...prevData,
        [name]: value
      }));
  
      // Update the selected computer data in the parent component
      setSelectedComputerData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };
  
    // Function to handle updating a computer and hide the form
    const handleUpdate = () => {
      onUpdate(computerData);
    };
  
    // Function to handle canceling the computer form and hide the form
    const handleCancel = () => {
      onCancel();
  }

  return (
    <div className={styles.formOverlay}>
    <div id="computer-form" className={styles.computerForm}>
    <h2 className={styles.formTitle}>Update Computer</h2>
    <form className={styles.form}>
        {/* Render input fields for each computer data field */}
        <label>
          PC Serial Number:
          <input type="text" name="pc_sn" value={computerData.pc_sn} onChange={handleChange} className={styles.inputField} />
        </label>
        <label>
          Processor:
          <input type="text" name="processor" value={computerData.processor} onChange={handleChange} className={styles.inputField} />
        </label>
        <label>
          Hard Drive Size:
          <input type="text" name="hd_size" value={computerData.hd_size} onChange={handleChange} className={styles.inputField} />
        </label>
        <label>
          RAM Size:
          <input type="text" name="ram_size" value={computerData.ram_size} onChange={handleChange} className={styles.inputField} />
        </label>
        <label>
          Keyboard Name:
          <select name="kyb_name" value={computerData.kyb_name} onChange={handleChange} className={styles.inputField}>
            <option value="">Select Keyboard</option>
            <option value="Logitech">Logitech</option>
            <option value="Dell">Dell</option>
            <option value="HP">HP</option>
            <option value="Microsoft">Microsoft</option>
          </select>
        </label>
        <label>
          Mouse Name:
          <select name="mouse_name" value={computerData.mouse_name} onChange={handleChange} className={styles.inputField}>
            <option value="">Select Mouse</option>
            <option value="Microsoft">Microsoft</option>
            <option value="HP">HP</option>
            <option value="Logitech">Logitech</option>
            <option value="Dell">Dell</option>
          </select>
        </label>
        <label>
          Monitor Name:
          <select name="monitor_name" value={computerData.monitor_name} onChange={handleChange} className={styles.inputField}>
            <option value="">Select Monitor</option>
            <option value="Dell">Dell</option>
            <option value="LG">LG</option>
            <option value="HP">HP</option>
          </select>
        </label>
        <label>
          Monitor Serial Number:
          <input type="text" name="monitor_sn" value={computerData.monitor_sn} onChange={handleChange} className={styles.inputField} />
        </label>
        <label>
          OS Type:
          <select name="os_type" value={computerData.os_type} onChange={handleChange} className={styles.inputField}>
            <option value="">Select OS</option>
            <option value="Windows">Windows</option>
            <option value="Linux">Linux</option>
            <option value="Mac">Mac</option>
            <option value="Ubuntu">Ubuntu</option>
          </select>
        </label>
        <label>
          PC Name:
          <input type="text" name="pc_name" value={computerData.pc_name} onChange={handleChange} className={styles.inputField} />
        </label>
        <label>
          Room:
          <select name="room" value={computerData.room} onChange={handleChange} className={styles.inputField} >
          <option value="">Select Room</option>
            <option value="Room 2.1">Room 2.1</option>
            <option value="Room 2.2">Room 2.2</option>
            <option value="Room 2.4">Room 2.4</option>
            <option value="Room 2.5">Room 2.5</option>
            <option value="Room 2.6">Room 2.6</option>
            <option value="Library">Library</option>
            </select>
        </label>
        <label>
          Status:
          <input type="text" name="status" value={computerData.status} onChange={handleChange} className={styles.inputField} />
        </label>

        <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
        <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
      </form>
    </div>
    </div>
  );
}

export default UpdateComputer;