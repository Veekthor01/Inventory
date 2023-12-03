import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdateComputer({ supplier, onUpdate, setSelectedSupplierData, onCancel }) {
// State variable to store the supplier data for the form
    const [supplierData, setSupplierData] = useState(supplier);
    
    // Function to handle changes in the form and update supplierData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSupplierData(prevData => ({
        ...prevData,
        [name]: value
        }));
    
        // Update the selected supplier data in the parent component
        setSelectedSupplierData(prevData => ({
        ...prevData,
        [name]: value
        }));
    };
    
    // Function to handle updating a supplier and hide the form
    const handleUpdate = () => {
        onUpdate(supplierData);
    };

    // Function to handle canceling the supplier form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.computerForm}>
    <h2 className={styles.formTitle}>Update Supplier</h2>
    <form className={styles.form}>
                <label>
                    Name:
                    <input type="text" name="name" value={supplierData.name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={supplierData.address} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={supplierData.phone} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={supplierData.email} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Items:
                    <input type="text" name="items" value={supplierData.items} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Quantity:
                    <input type="text" name="quantity" value={supplierData.quantity} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
        </div>
    );
}

export default UpdateComputer;
    