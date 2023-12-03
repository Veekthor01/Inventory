import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddLicense({ onAddLicense, onCancel }) {
    // State variable to store license data for the form
    const [licenseData, setLicenseData] = useState({
        product_name: '',
        license_key: '',
        expired: ''
    });

    // State variables to hold the error messages for each field
    const [productNameError, setProductNameError] = useState('');
    const [licenseKeyError, setLicenseKeyError] = useState('');
    const [expiredError, setExpiredError] = useState('');

    const licenseKeyPattern = /^[A-Z0-9-]{16,25}$/; 

    // Function to handle changes in the form and update licenseData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicenseData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Function to handle adding a new license and hide the form
    const handleAdd = () => {
        // Check if the required dropdowns are not selected
        if (!licenseData.product_name || !licenseData.expired) {
            setProductNameError(!licenseData.product_name ? 'Please choose a product' : '');
            setExpiredError(!licenseData.expired ? 'Please choose an expiration status' : '');
        } else {
            setProductNameError('');
            setExpiredError('');
        }
    
        // Validate license key before adding
        if (!licenseKeyPattern.test(licenseData.license_key)) {
            setLicenseKeyError('Invalid License Key. Please use the correct format.');
        } else {
            setLicenseKeyError('');
        }
    
        // Check if all required fields are filled before adding the license
        if (!licenseData.product_name || !licenseData.license_key || !licenseData.expired) {
            alert('Please fill in all required fields.');
            return;
        }
        onAddLicense(licenseData);
        setLicenseData({
            product_name: '',
            license_key: '',
            expired: ''
        });
    }

    // Function to handle canceling the license form and hide the form
    const handleCancel = () => {
        onCancel();
    }

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.ProfileForm}>
            <h2 className={styles.formTitle}>Add New License</h2>
            <form className={styles.form}>
                <label>
                    Product Name:
                    <select name="product_name" value={licenseData.product_name} onChange={handleChange} className={styles.inputField} required>
                        <option value="">Select Product</option>
                        <option value="Microsoft Windows">Microsoft Windows</option>
                        <option value="MegaTool Deluxe Suite">MegaTool Deluxe Suite</option>
                        <option value="SmartOffice Professional">SmartOffice Professional</option>
                        <option value="Adobe Creative Cloud">Adobe Photoshop</option>
                        <option value="Avast Antivirus">Avast Antivirus</option>
                    </select>
                    {productNameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{productNameError}</span>}
                </label>
                <label>
                    License Key:
                    <input type="text" name="license_key" value={licenseData.license_key} onChange={handleChange} className={styles.inputField} required />
                    {licenseKeyError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{licenseKeyError}</span>}
                </label>
                <label>
                    Expired:
                    <select name="expired" value={licenseData.expired} onChange={handleChange} className={styles.inputField} required>
                        <option value="">Expiration Status</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                    {expiredError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{expiredError}</span>}
                </label>
                <button type="button" onClick={handleAdd} className={styles.addButtonForm}>Add</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
        </div>
    );
}

export default AddLicense;
