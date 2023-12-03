import React, { useEffect, useState } from 'react';
import { fetchAccessories, createAccessory, updateAccessory, deleteAccessory } from '../../api/api';
import AddAccessory from './addAccessory';
import UpdateAccessory from './updateAccessory';
import styles from '../pages.module.css';

function AccessoryPage () {
   // State variable to store the list of accessories
  const [accessories, setAccessories] = useState([]);
  // State variables for managing the accessory form visibility and selected accessory data
  const [showForm, setShowForm] = useState(false);
  const [selectedAccessoryData, setSelectedAccessoryData] = useState(null);

   // Use effect to fetch accessories on component mount
  useEffect(() => {
    fetchAccessories()
      .then(accessoriesData => {
        setAccessories(accessoriesData);
      })
      .catch(error => {
        console.error('Error fetching accessories:', error);
      });
  }, []);

  // Function to handle the create button click and show the form
  const handleCreateButtonClick = () => {
    setShowForm(true);
  };

// Function to create a new accessory and update the accessory list
  const handleCreateAccessory = (newAccessoryData) => {
    createAccessory(newAccessoryData)
      .then(() => {
        // Fetch the updated list of accessories
        fetchAccessories()
          .then(accessoriesData => {
            setAccessories(accessoriesData);
          })
          .catch(error => {
            console.error('Error fetching accessories:', error);
          });
          window.alert('Accessory created successfully!');
      })
      .catch(error => {
        console.error('Error creating accessory:', error);
        window.alert('An error occurred while creating the accessory. Please try again later.');
      });

    setShowForm(false);
  };

// Function to handle updating an accessory data and hide the form
  const handleUpdateAccessory = (accessory) => {
  setSelectedAccessoryData({ ...accessory }); // Update the selected accessory data
  setShowForm(false);
};

// Function to update an accessory and update the accessory list
const handleUpdate = () => {
  updateAccessory(selectedAccessoryData.id, selectedAccessoryData)
    .then(() => {
      // Fetch the updated list of accessories
      fetchAccessories()
        .then(accessoriesData => {
          setAccessories(accessoriesData);
        })
        .catch(error => {
          console.error('Error fetching accessories:', error);
        });
    })
    .catch(error => {
      console.error('Error updating accessory:', error);
      window.alert('An error occurred while updating the accessory. Please try again later.');
    })
    .finally(() => {
      setSelectedAccessoryData(null); // Clear the selected accessory data
      window.alert('Accessory updated successfully!');
    });
};

// Function to delete an accessory and update the accessory list
const handleDeleteAccessory = (accessoryId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this accessory?");

  if (confirmDelete) {
    deleteAccessory(accessoryId)
      .then(() => {
        setAccessories(prevAccessories => prevAccessories.filter(accessory => accessory.id !== accessoryId));
        window.alert('Accessory deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting accessory:', error);
        window.alert('An error occurred while deleting the accessory. Please try again later.');
      });
  }
};

// Function to handle canceling the accessory form and hide the form
const handleCancel = () => {
  setShowForm(false);
  setSelectedAccessoryData(null);
};

// Function to handle the print button click and generate the PDF data
const handlePrint = () => {
  window.print();
};

return (
  <div>
    <div className = "header"><h1>Accessories</h1></div>
    <div className={styles.tableContainer}>
      <table className={styles.table}>
      <thead>
        <tr>
        <th className={styles.tableHeader}>NO.</th>
        <th className={styles.tableHeader}>Type</th>
        <th className={styles.tableHeader}>S_N</th>
        <th className={styles.tableHeader}>Model</th>
        <th className={styles.tableHeader}>Extension_no</th>
        <th className={styles.tableHeader}>Name</th>
        <th className={styles.tableHeader}>Room</th>
        <th className={styles.tableHeader}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {accessories.map(accessory => (
          <tr key={accessory.id}>
            <td className={styles.td}>{accessory.id}</td>
            <td className={styles.td}>{accessory.type}</td>
            <td className={styles.td}>{accessory.S_N}</td>
            <td className={styles.td}>{accessory.model}</td>
            <td className={styles.td}>{accessory.extension_no}</td>
            <td className={styles.td}>{accessory.name}</td>
            <td className={styles.td}>{accessory.room}</td>
            <td>
            {selectedAccessoryData && selectedAccessoryData.id === accessory.id ? (
<UpdateAccessory
  accessory={selectedAccessoryData}
  onUpdate={handleUpdate}
  setSelectedAccessoryData={setSelectedAccessoryData}
  onCancel={handleCancel}
/>
) : (
<button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateAccessory(accessory)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteAccessory(accessory.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    {/* Conditionally render the form */}
    {showForm ? (
      <AddAccessory onAddAccessory={handleCreateAccessory} onCancel={handleCancel} />
    ) : (
      <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create Accessory</button>
    )}
     <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
  </div>
);
}

export default AccessoryPage;
