import React, { useEffect, useState } from 'react';
import { fetchPersonnel, createPersonnel, updatePersonnel, deletePersonnel } from '../../api/api';
import AddPersonnel from './addPersonnel';
import UpdatePersonnel from './updatePersonnel';
import styles from '../pages.module.css';

function PersonnelPage() {
  // State variable to store the list of personnel
  const [personnel, setPersonnel] = useState([]);
  // State variables for managing the personnel form visibility and selected personnel data
  const [showForm, setShowForm] = useState(false);
  const [selectedPersonnelData, setSelectedPersonnelData] = useState(null);

  // Use effect to fetch personnel on component mount
  useEffect(() => {
    fetchPersonnel()
      .then(personnelData => {
        setPersonnel(personnelData);
      })
      .catch(error => {
        console.error('Error fetching personnel:', error);
      });
  }
  , []);

  // Function to handle the create button click and show the form
  const handleCreateButtonClick = () => {
    setShowForm(true);
  }

  // Function to create a new personnel and update the personnel list
  const handleCreatePersonnel = (newPersonnelData) => {
    createPersonnel(newPersonnelData)
      .then(() => {
        // Fetch the updated list of personnel
        fetchPersonnel()
          .then(personnelData => {
            setPersonnel(personnelData);
          })
          .catch(error => {
            console.error('Error fetching personnel:', error);
          });
          window.alert('Personnel created successfully!');
      })
      .catch(error => {
        console.error('Error creating personnel:', error);
        window.alert('An error occurred while creating the personnel. Please try again later.');
      });

    setShowForm(false);
  }

  // Function to handle updating a personnel data and hide the form
  const handleUpdatePersonnel = (personnel) => {
    setSelectedPersonnelData({ ...personnel }); // Update the selected personnel data
    setShowForm(false);
  }

   // Function to update a personnel and update the personnel list
  const handleUpdate = () => {
    updatePersonnel(selectedPersonnelData.id, selectedPersonnelData)
      .then(() => {
        // Fetch the updated list of personnel
        fetchPersonnel()
          .then(personnelData => {
            setPersonnel(personnelData);
          })
          .catch(error => {
            console.error('Error fetching personnel:', error);
          });
      })
      .catch(error => {
        console.error('Error updating personnel:', error);
        window.alert('An error occurred while updating the personnel. Please try again later.');
      })
      .finally(() => {
        setSelectedPersonnelData(null); // Clear the selected computer data
        window.alert('Personnel updated successfully!');
      });
  }

  // Function to delete a personnel and update the personnel list
  const handleDeletePersonnel = (personnelId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this personnel?");
  
    if (confirmDelete) {
      deletePersonnel(personnelId)
        .then(() => {
          setPersonnel(prevPersonnel => prevPersonnel.filter(personnel => personnel.id !== personnelId));
          window.alert('Personnel deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting personnel:', error);
          window.alert('An error occurred while deleting the personnel. Please try again later.');
        });
    }
  };
  
// Function to handle canceling the personnel form and hide the form
  const handleCancel = () => {
    setShowForm(false);
    setSelectedPersonnelData(null);
  };

  // Function to handle the print button click and generate the PDF data
const handlePrint = () => {
  window.print();
};

  return (
    <div>
      <div className = "header"><h1>Personnel</h1></div>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
          <th className={styles.tableHeader}>NO.</th>
          <th className={styles.tableHeader}>First Name</th>
          <th className={styles.tableHeader}>Last Name</th>
          <th className={styles.tableHeader}>Department</th>
          <th className={styles.tableHeader}>Role</th>
          <th className={styles.tableHeader}>Email Address</th>
          <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {personnel.map(personnel => (
            <tr key={personnel.id}>
              <td className={styles.td}>{personnel.id}</td>
              <td className={styles.td}>{personnel.first_name}</td>
              <td className={styles.td}>{personnel.last_name}</td>
              <td className={styles.td}>{personnel.department}</td>
              <td className={styles.td}>{personnel.role}</td>
              <td className={styles.td}>{personnel.email_address}</td>
              <td>
              {selectedPersonnelData && selectedPersonnelData.id === personnel.id ? (
  <UpdatePersonnel
    personnel={selectedPersonnelData}
    onUpdate={handleUpdate}
    setSelectedPersonnelData={setSelectedPersonnelData}
    onCancel={handleCancel}
  />
) : (
  <button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdatePersonnel(personnel)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeletePersonnel(personnel.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Conditionally render the form */}
      {showForm ? (
        <AddPersonnel onAddPersonnel={handleCreatePersonnel}  onCancel={handleCancel} />
      ) : (
        <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create personnel</button>
      )}
         <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
    </div>
  );
  
}

export default PersonnelPage;
