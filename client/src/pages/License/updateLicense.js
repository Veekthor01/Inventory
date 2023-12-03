import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdateLicense({ license, onUpdate, setSelectedLicenseData, onCancel }) {
  // State variable to store the license data for the form
    const [licenseData, setLicenseData] = useState(license);
     
    // Function to handle changes in the form and update licenseData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLicenseData(prevData => ({
        ...prevData,
         [name]: value
         }));

          // Update the selected license data in the parent component
         setSelectedLicenseData(prevData => ({
             ...prevData,
             [name]: value
           }));
        };

        // Function to handle updating a license and hide the form
        const handleUpdate = () => {
          onUpdate(licenseData);
        }

        // Function to handle canceling the license form and hide the form
        const handleCancel = () => {
          onCancel();
      }

    return (
      <div className={styles.formOverlay}>
      <div id="computer-form" className={styles.computerForm}>
      <h2 className={styles.formTitle}>Update License</h2>
      <form className={styles.form}>
              <label>
                Product Name:
                 <input type="text" name="product_name" value={licenseData.product_name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                License Key:
                 <input type="text" name="license_key" value={licenseData.license_key} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                Expired:
                 <input type="text" name="expired" value={licenseData.expired} onChange={handleChange} className={styles.inputField} />
                 </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
        </div>
    );
}

export default UpdateLicense;
