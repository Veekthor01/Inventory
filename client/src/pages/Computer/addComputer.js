import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddComputer({ onAddComputer, onCancel }) {
    // State variable to store computer data for the form
    const [computerData, setComputerData] = useState({
      pc_sn: '',
      processor: '',
      hd_size: '',
      ram_size: '',
      kyb_name: '',
      mouse_name: '',
      monitor_name: '',
      monitor_sn: '',
      os_type: '',
      pc_name: '',
      room: '',
      status: ''
    });
    
  // State variable to hold the error messages for each field
    const [pcSnError, setPcSnError] = useState('');
    const [processorError, setProcessorError] = useState('');
    const [hdSizeError, setHdSizeError] = useState('');
    const [ramSizeError, setRamSizeError] = useState('');
    const [kybNameError, setKybNameError] = useState('');
    const [mouseNameError, setMouseNameError] = useState('');
    const [monitorNameError, setMonitorNameError] = useState('');
    const [monitorSnError, setMonitorSnError] = useState('');
    const [osTypeError, setOsTypeError] = useState('');
    const [pcNameError, setPcNameError] = useState('');
    const [roomError, setRoomError] = useState('');
    const [statusError, setStatusError] = useState('');
  
  // Function to handle changes in the form and update computerData state
    const handleChange = (e) => {
      const { name, value } = e.target;
      
      setComputerData(prevData => ({
        ...prevData,
        [name]: value
      }));

      // Reset the corresponding error when the user starts typing in the field again
    if (name === 'pc_sn') {
      setPcSnError('');
    } else if (name === 'processor') {
      setProcessorError('');
    } else if (name === 'hd_size') {
      setHdSizeError('');
    } else if (name === 'ram_size') {
      setRamSizeError('');
    } else if (name === 'kyb_name') {
      setKybNameError('');
    } else if (name === 'mouse_name') {
      setMouseNameError('');
    } else if (name === 'monitor_name') {
      setMonitorNameError('');
    } else if (name === 'monitor_sn') {
      setMonitorSnError('');
    } else if (name === 'os_type') {
      setOsTypeError('');
    } else if (name === 'pc_name') {
      setPcNameError('');
    } else if (name === 'room') {
      setRoomError('');
    } else if (name === 'status') {
      setStatusError('');
    }
  };

// Function to handle adding a new computer and hide the form
    const handleAdd = () => {
      // Validate the "PC Serial Number" and "Monitor Serial Number" patterns before adding the computer
    const pcSnPattern = /^[A-Z]{2}\d{5}$/; 
    const monitorSnPattern = /^[A-Z]{2}\d{4}$/;
    const pcNamePattern = /^[A-Z0-9]{1,}PC$/;

    if (!pcSnPattern.test(computerData.pc_sn)) {
      setPcSnError('Invalid PC Serial Number. Please use the correct format');
    }
    if (!monitorSnPattern.test(computerData.monitor_sn)) {
      setMonitorSnError('Invalid Monitor Serial Number. Please use the correct format');
    }
    if (!pcNamePattern.test(computerData.pc_name)) {
      setPcNameError('Invalid PC Name. Please use the correct format');
    }
    
    // Check if all required fields are filled before adding the computer
    if (
      !computerData.processor ||
      !computerData.hd_size ||
      !computerData.ram_size ||
      !computerData.kyb_name ||
      !computerData.mouse_name ||
      !computerData.monitor_name ||
      !computerData.monitor_sn ||
      !computerData.os_type ||
      !computerData.pc_name ||
      !computerData.room ||
      !computerData.status
    ) {
      setProcessorError(!computerData.processor ? 'Required' : '');
      setHdSizeError(!computerData.hd_size ? 'Required' : '');
      setRamSizeError(!computerData.ram_size ? 'Required' : '');
      setKybNameError(!computerData.kyb_name ? 'Required' : '');
      setMouseNameError(!computerData.mouse_name ? 'Required' : '');
      setMonitorNameError(!computerData.monitor_name ? 'Required' : '');
      setOsTypeError(!computerData.os_type ? 'Required' : '');
      setRoomError(!computerData.room ? 'Required' : '');
      setStatusError(!computerData.status ? 'Required' : '');
    
      alert('Please fill in all required fields.');
      return;
    }
    
    //if all required fields are filled, add the computer
      onAddComputer(computerData);
      setComputerData({
        pc_sn: '',
        processor: '',
        hd_size: '',
        ram_size: '',
        kyb_name: '',
        mouse_name: '',
        monitor_name: '',
        monitor_sn: '',
        os_type: '',
        pc_name: '',
        room: '',
        status: ''
      });
    };
  
  // Function to handle canceling the computer form and hide the form
    const handleCancel = () => {
      onCancel();
  }

    return (
      <div className={styles.formOverlay}>
      <div id="computer-form" className={styles.ProfileForm}>
        <h2 className={styles.formTitle}>Add New Computer</h2>
        <form className={styles.form}>
          <label>
            PC Serial NO:
            <input type="text" name="pc_sn" value={computerData.pc_sn} onChange={handleChange} 
            className={styles.inputField} required pattern="^[A-Z]{2}\d{5}$"/>
             {pcSnError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{pcSnError}</span>}
          </label>
          <label>
            Processor:
            <select name="processor" value={computerData.processor} onChange={handleChange} className={styles.inputField} required>
              <option value="">Select Processor</option>
              <option value="Intel i3">Intel i3</option>
              <option value="Intel Xeon">Intel Xeon</option>
              <option value="AMD Ryzen 5">AMD Ryzen 5</option>
              <option value="Intel i5">Intel i5</option>
              <option value="Intel i7">Intel</option>
              <option value="AMD Ryzen 9">Intel i7</option>
              <option value="AMD Ryzen 7">AMD Ryzen 7</option>
              <option value="ARM">ARM</option>
              <option value="Apple">Apple</option>
          </select>
          {processorError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{processorError}</span>}
          </label>
          <label>
            Hard Drive Size:
            <select type="text" name="hd_size" value={computerData.hd_size} onChange={handleChange} className={styles.inputField} required>
              <option value="">Select Hard Drive Size</option>
              <option value="256GB">256GB</option>
              <option value="500GB">500GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
              <option value="2TB">2TB</option>
          </select>
          {hdSizeError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{hdSizeError}</span>}
          </label>
          <label>
            RAM Size:
            <select type="text" name="ram_size" value={computerData.ram_size} onChange={handleChange} className={styles.inputField} required>
              <option value="">Select RAM Size</option>
              <option value="4GB">4GB</option>
              <option value="8GB">8GB</option>
              <option value="16GB">16GB</option>
              <option value="32GB">32GB</option>
              <option value="64GB">64GB</option>
          </select>
          {ramSizeError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{ramSizeError}</span>}
          </label>
          <label>
            Keyboard Name:
            <select name="kyb_name" value={computerData.kyb_name} onChange={handleChange} className={styles.inputField} required>
              <option value="">Select Keyboard</option>
              <option value="Logitech">Logitech</option>
              <option value="Dell">Dell</option>
              <option value="HP">HP</option>
              <option value="Microsoft">Microsoft</option>
            </select>
            {kybNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{kybNameError}</span>}
          </label>
          <label>
            Mouse Name:
            <select name="mouse_name" value={computerData.mouse_name} onChange={handleChange} className={styles.inputField} required>
              <option value="">Select Mouse</option>
              <option value="Microsoft">Microsoft</option>
              <option value="HP">HP</option>
              <option value="Logitech">Logitech</option>
              <option value="Dell">Dell</option>
            </select>
            {mouseNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{mouseNameError}</span>}
          </label>
          <label>
            Monitor Name:
            <select name="monitor_name" value={computerData.monitor_name} onChange={handleChange} className={styles.inputField} required>
              <option value="">Select Monitor</option>
              <option value="Dell">Dell</option>
              <option value="LG">LG</option>
              <option value="HP">HP</option>
            </select>
            {monitorNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{monitorNameError}</span>}
          </label>
          <label>
            Monitor S/NO:
            <input type="text" name="monitor_sn" value={computerData.monitor_sn} onChange={handleChange} className={styles.inputField} required />
            {monitorSnError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{monitorSnError}</span>}
          </label>
          <label>
            Operating System:
            <select name="os_type" value={computerData.os_type} onChange={handleChange} className={styles.inputField}>
            <option value="">Select OS</option>
            <option value="Windows">Windows</option>
            <option value="Linux">Linux</option>
            <option value="Mac">Mac</option>
            <option value="Ubuntu">Ubuntu</option>
          </select>
          {osTypeError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{osTypeError}</span>}
          </label>
          <label>
            PC Name:
            <input type="text" name="pc_name" value={computerData.pc_name} onChange={handleChange} className={styles.inputField} required />
            {pcNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{pcNameError}</span>}
          </label>
          <label>
            Room:
            <select name="room" value={computerData.room} onChange={handleChange} className={styles.inputField} required>
            <option value="">Select Room</option>
            <option value="Room 2.1">Room 2.1</option>
            <option value="Room 2.2">Room 2.2</option>
            <option value="Room 2.4">Room 2.4</option>
            <option value="Room 2.5">Room 2.5</option>
            <option value="Room 2.6">Room 2.6</option>
            <option value="Library">Library</option>
            </select>
            {roomError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{roomError}</span>}
          </label>
          <label>
            Status:
            <select name="status" value={computerData.status} onChange={handleChange} className={styles.inputField} required>
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            </select>
            {statusError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{statusError}</span>}
          </label>
          <button type="button" onClick={handleAdd} className={styles.addButtonForm}>Add</button>
          <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
        </form>
        </div>
      </div>
      
    );
    
  }
  
  export default AddComputer;
