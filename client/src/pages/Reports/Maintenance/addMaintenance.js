import React, { useState } from 'react';
import styles from '../../addupdate.module.css';

function AddMaintenance({ onAddMaintenance, onCancel }) {
  // State variable to store maintenance data for the form
  const [maintenanceData, setMaintenanceData] = useState({
    item_name: '', 
    type: '',
    maintenance_type: ''
  });

  // State variable to hold the error messages for each field
  const [itemNameError, setItemNameError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [maintenanceTypeError, setMaintenanceTypeError] = useState('');

  // Function to handle changes in the form and update maintenanceData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle adding a new maintenance and hide the form
  const handleAdd = () => {
    // Check if the required dropdowns are not selected
    if (!maintenanceData.item_name || !maintenanceData.type || !maintenanceData.maintenance_type) {
      setItemNameError(!maintenanceData.item_name ? 'Item Name is required' : '');
      setTypeError(!maintenanceData.type ? 'Type is required' : '');
      setMaintenanceTypeError(!maintenanceData.maintenance_type ? 'Maintenance Type is required' : '');
      alert('Please check the fields with invalid data.');
      return;
    }

    // If all validations pass, proceed with adding the maintenance
    onAddMaintenance(maintenanceData);
    setMaintenanceData({
      item_name: '', // Reset to the empty value after adding
      type: '',
      maintenance_type: ''
    });
    setItemNameError('');
    setTypeError('');
    setMaintenanceTypeError('');
  };

  // Function to handle canceling the maintenance form and hide the form
  const handleCancel = () => {
    onCancel();
  };

    return (
      <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.ProfileForm}>
        <h2 className={styles.formTitle}>Add New Maintenance</h2>
        <form className={styles.form}>
                <label>
                    Item Name:
                    <select name="item_name" value={maintenanceData.item_name}
                     onChange={handleChange} className={`${styles.inputField} ${itemNameError && styles.warning}`} required>
                    <option value="">Select Item Name</option>
                    <option value="Cisco Router">Cisco Router</option>
                    <option value="HP Printer">HP Printer</option>
                    <option value="Dell Computer">Dell Computer</option>
                    <option value="Epson Projector">Epson Projector</option>
                    <option value="Server Rack">Server Rack</option>
                    <option value="Samsung Television">Samsung Television</option>
                    <option value="Cisco Telephone">Cisco Telephone</option>
                    <option value="D-LINK Switches">D-LINK Switches</option>
               </select>
               {itemNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{itemNameError}</span>}
                </label>
                <label>
                    Type:
                    <select name="type" value={maintenanceData.type} onChange={handleChange} 
                    className={`${styles.inputField} ${typeError && styles.warning}`} required >
                    <option value="">Select Type</option>
                    <option value="Computer">Computer</option>
                    <option value="Accessory">Accessory</option>
                    <option value="Component">Component</option>
                    </select>
                    {typeError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{typeError}</span>}
                </label>
                <label>
                    Maintenance Type:
                    <select name="maintenance_type" value={maintenanceData.maintenance_type} onChange={handleChange} 
                   className={`${styles.inputField} ${maintenanceTypeError && styles.warning}`} required>
                    <option value="">Select Maintenance Type</option>
                    <option value="Repair">Repair</option>
                    <option value="Update">Update</option>
                    <option value="Replacement">Replacement</option>
                    <option value="Upgrade">Upgrade</option>
                    <option value="Maintenance">Maintenance</option>
                    </select>
                    {maintenanceTypeError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{maintenanceTypeError}</span>}
                </label>
                <button type="button" onClick={handleAdd} className={styles.addButtonForm}>Add</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
    </div>
    );
}

export default AddMaintenance;
