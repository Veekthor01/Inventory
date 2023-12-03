import React, { useEffect, useState } from 'react';
import { fetchMaintenance, createMaintenance, updateMaintenance, deleteMaintenance } from '../../../api/api';
import AddMaintenance from './addMaintenance';
import UpdateMaintenance from './updateMaintenance';
import styles from '../../pages.module.css';

function MaintenancePage() {
  // State variable to store the list of maintenance
  const [maintenance, setMaintenance] = useState([]);
  // State variables for managing the maintenance form visibility and selected maintenance data
  const [showForm, setShowForm] = useState(false);
  const [selectedMaintenanceData, setSelectedMaintenanceData] = useState(null);

  // Use effect to fetch maintenance on component mount
  useEffect(() => {
    fetchMaintenance()
      .then(maintenanceData => {
        setMaintenance(maintenanceData);
      })
      .catch(error => {
        console.error('Error fetching maintenance:', error);
      });
  }, []);

  // Function to handle the create button click and show the form 
  const handleCreateButtonClick = () => {
    setShowForm(true);
  };

  // Function to create a new maintenance and update the maintenance list
  const handleCreateMaintenance = (newMaintenanceData) => {
    createMaintenance(newMaintenanceData)
      .then(() => {
        // Fetch the updated list of maintenance
        fetchMaintenance()
          .then(maintenanceData => {
            setMaintenance(maintenanceData);
          })
          .catch(error => {
            console.error('Error fetching maintenance:', error);
          });
          window.alert('Maintenance created successfully!');
      })
      .catch(error => {
        console.error('Error creating maintenance:', error);
        window.alert('An error occurred while creating the Maintenance. Please try again later.');
      });

    setShowForm(false);
  };

  // Function to handle updating a maintenance data and hide the form
  const handleUpdateMaintenance = (maintenance) => {
  setSelectedMaintenanceData({ ...maintenance }); // Update the selected maintenance data
  setShowForm(false);
};

// Function to update a maintenance and update the maintenance list
const handleUpdate = () => {
 updateMaintenance(selectedMaintenanceData.id, selectedMaintenanceData)
    .then(() => {
      // Fetch the updated list of maintenance
      fetchMaintenance()
        .then(maintenanceData => {
          setMaintenance(maintenanceData);
        })
        .catch(error => {
          console.error('Error fetching maintenance:', error);
        });
    })
    .catch(error => {
      console.error('Error updating maintenance:', error);
      window.alert('An error occurred while updating the maintenance. Please try again later.');
    })
    .finally(() => {
      setSelectedMaintenanceData(null); // Clear the selected computer data
      window.alert('Maintenance updated successfully!');
    });
};

// Function to delete a maintenance and update the maintenance list
const handleDeleteMaintenance = (maintenanceId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this maintenance?");

  if (confirmDelete) {
    deleteMaintenance(maintenanceId)
      .then(() => {
        setMaintenance(prevMaintenance => prevMaintenance.filter(maintenance => maintenance.id !== maintenanceId));
        window.alert('Maintenance deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting maintenance:', error);
        window.alert('An error occurred while deleting the maintenance. Please try again later.');
      });
  }
};

// Function to handle the cancel button click and hide the form
const handleCancel = () => {
  setShowForm(false);
  setSelectedMaintenanceData(null);
};

 // Function to handle the print button click and generate the PDF data
 const handlePrint = () => {
  window.print();
};

return (
  <div>
    <div className = "header"><h1>Maintenance</h1></div>
    <div className={styles.tableContainer}>
      <table className={styles.table}>
      <thead>
        <tr>
        <th className={styles.tableHeader}>NO.</th>
        <th className={styles.tableHeader}>Item Name</th>
        <th className={styles.tableHeader}>Type</th>
        <th className={styles.tableHeader}>Maintenance Type</th>
        <th className={styles.tableHeader}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {maintenance.map(maintenance => (
          <tr key={maintenance.id}>
            <td className={styles.td}>{maintenance.id}</td>
            <td className={styles.td}>{maintenance.item_name}</td>
            <td className={styles.td}>{maintenance.type}</td>
            <td className={styles.td}>{maintenance.maintenance_type}</td>
            <td>
            {selectedMaintenanceData && selectedMaintenanceData.id === maintenance.id ? (
<UpdateMaintenance
  maintenance={selectedMaintenanceData}
  onUpdate={handleUpdate}
  setSelectedMaintenanceData={setSelectedMaintenanceData}
  onCancel={handleCancel}
/>
) : (
<button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateMaintenance(maintenance)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteMaintenance(maintenance.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    {/* Conditionally render the form */}
    {showForm ? (
      <AddMaintenance onAddMaintenance={handleCreateMaintenance} onCancel={handleCancel} />
    ) : (
      <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create Maintenance</button>
    )}
     <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
  </div>
);

}

export default MaintenancePage;
