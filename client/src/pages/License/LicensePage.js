import React, { useEffect, useState } from 'react';
import { fetchLicenses, createLicense, updateLicense, deleteLicense } from '../../api/api';
import AddLicense from './addLicense';
import UpdateLicense from './updateLicense';
import styles from '../pages.module.css';

function LicensePage() {
  // State variable to store the list of licenses
  const [licenses, setLicenses] = useState([]);
  // State variables for managing the license form visibility and selected license data
  const [showForm, setShowForm] = useState(false);
  const [selectedLicenseData, setSelectedLicenseData] = useState(null);

  // Use effect to fetch licenses on component mount
  useEffect(() => {
    fetchLicenses()
      .then(licensesData => {
        setLicenses(licensesData);
      })
      .catch(error => {
        console.error('Error fetching licenses:', error);
      });
  }
  , []);

  // Function to handle the create button click and show the form
  const handleCreateButtonClick = () => {
    setShowForm(true);
  }

  // Function to create a new license and update the license list
  const handleCreateLicense = (newLicenseData) => {
    createLicense(newLicenseData)
      .then(() => {
        // Fetch the updated list of licenses
        fetchLicenses()
          .then(licensesData => {
            setLicenses(licensesData);
          })
          .catch(error => {
            console.error('Error fetching licenses:', error);
          });
          // Show a success message when license is created
      window.alert('License created successfully!');
      })
      .catch(error => {
        console.error('Error creating license:', error);
        window.alert('An error occurred while creating the license. Please try again later.');
      });

    setShowForm(false);
    
  }

  // Function to handle updating a license data and hide the form
  const handleUpdateLicense = (license) => {
    setSelectedLicenseData({ ...license }); // Update the selected license data
    setShowForm(false);
  }

// Function to update a license and update the license list
  const handleUpdate = () => {
    updateLicense(selectedLicenseData.id, selectedLicenseData)
      .then(() => {
        // Fetch the updated list of licenses
        fetchLicenses()
          .then(licensesData => {
            setLicenses(licensesData);
          })
          .catch(error => {
            console.error('Error fetching licenses:', error);
          });
      })
      .catch(error => {
        console.error('Error updating license:', error);
        window.alert('An error occurred while updating the license. Please try again later.');
      })
      .finally(() => {
        setSelectedLicenseData(null); // Clear the selected license data
        window.alert('License updated successfully!');
      });
  }

  // Function to delete a license and update the license list
  const handleDeleteLicense = (licenseId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this license?");
  
    if (confirmDelete) {
      deleteLicense(licenseId)
        .then(() => {
          setLicenses(prevLicenses => prevLicenses.filter(license => license.id !== licenseId));
          window.alert('License deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting license:', error);
          window.alert('An error occurred while deleting the license. Please try again later.');
        });
    }
  };
  
// Function to handle canceling the form
  const handleCancel = () => {
    setShowForm(false);
    setSelectedLicenseData(null);
  };

// Function to handle the print button click and generate the PDF data
const handlePrint = () => {
  window.print();
};

  return (
    <div>
      <div className = "header"><h1>Licenses</h1></div>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
          <th className={styles.tableHeader}>NO.</th>
          <th className={styles.tableHeader}>Product Name</th>
          <th className={styles.tableHeader}>License Key</th>
          <th className={styles.tableHeader}>Expired</th>
          <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {licenses.map(license => (
            <tr key={license.id}>
              <td className={styles.td}>{license.id}</td>
              <td className={styles.td}>{license.product_name}</td>
              <td className={styles.td}>{license.license_key}</td>
              <td className={styles.td}>{license.expired}</td>
              <td>
              {selectedLicenseData && selectedLicenseData.id === license.id ? (
  <UpdateLicense
    license={selectedLicenseData}
    onUpdate={handleUpdate}
    setSelectedLicenseData={setSelectedLicenseData}
    onCancel={handleCancel}
  />
) : (
  <button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateLicense(license)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteLicense(license.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Conditionally render the form */}
      {showForm ? (
        <AddLicense onAddLicense={handleCreateLicense} onCancel={handleCancel} />
      ) : (
        <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create License</button>
      )}
       <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
    </div>
  );
  
}

export default LicensePage;
