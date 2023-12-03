import React, { useEffect, useState } from 'react';
import { fetchComputers, createComputer, updateComputer, deleteComputer } from '../../api/api';
import AddComputer from './addComputer';
import UpdateComputer from './updateComputer';
import styles from '../pages.module.css';

function ComputerPage() {
  // State variable to store the list of computers
  const [computers, setComputers] = useState([]);
  // State variables for managing the computer form visibility and selected computer data
  const [showForm, setShowForm] = useState(false);
  const [selectedComputerData, setSelectedComputerData] = useState(null);

  // Use effect to fetch computers on component mount
  useEffect(() => {
    fetchComputers()
      .then(computersData => {
        setComputers(computersData);
      })
      .catch(error => {
        console.error('Error fetching computers:', error);
      });
  }, []);

  // Function to handle the create button click and show the form
  const handleCreateButtonClick = () => {
    setShowForm(true);
  };

// Function to create a new computer and update the computer list
  const handleCreateComputer = (newComputerData) => {
    createComputer(newComputerData)
      .then(() => {
        // Fetch the updated list of computers
        fetchComputers()
          .then(computersData => {
            setComputers(computersData);
          })
          .catch(error => {
            console.error('Error fetching computers:', error);
          });
          window.alert('Computer created successfully!');
      })
      .catch(error => {
        console.error('Error creating computer:', error);
        window.alert('An error occurred while creating the computer. Please try again later.');
      });

    setShowForm(false);
  };

// Function to handle updating a computer data and hide the form
  const handleUpdateComputer = (computer) => {
  setSelectedComputerData({ ...computer }); // Update the selected computer data
  setShowForm(false);
};

// Function to update a computer and update the computer list
const handleUpdate = () => {
  updateComputer(selectedComputerData.id, selectedComputerData)
    .then(() => {
      // Fetch the updated list of computers
      fetchComputers()
        .then(computersData => {
          setComputers(computersData);
        })
        .catch(error => {
          console.error('Error fetching computers:', error);
        });
    })
    .catch(error => {
      console.error('Error updating computer:', error);
      window.alert('An error occurred while updating the computer. Please try again later.');
    })
    .finally(() => {
      setSelectedComputerData(null); // Clear the selected computer data
      window.alert('Computer updated successfully!');
    });
};
  
// Function to delete a computer and update the computer list
const handleDeleteComputer = (computerId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this computer?");

  if (confirmDelete) {
    deleteComputer(computerId)
      .then(() => {
        setComputers(prevComputers => prevComputers.filter(computer => computer.id !== computerId));
        window.alert('Computer deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting computer:', error);
        window.alert('An error occurred while deleting the computer. Please try again later.');
      });
  }
};

// Function to handle canceling the computer form and hide the form
  const handleCancel = () => {
    setShowForm(false);
    setSelectedComputerData(null);
  };

  // Function to handle the print button click and generate the PDF data
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className = "header"><h1>Computers</h1></div>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
          <th className={styles.tableHeader}>NO.</th>
          <th className={styles.tableHeader}>PC S/N</th>
          <th className={styles.tableHeader}>Processor</th>
          <th className={styles.tableHeader}>HD Size</th>
          <th className={styles.tableHeader}>RAM</th>
          <th className={styles.tableHeader}>Keyboard</th>
          <th className={styles.tableHeader}>Mouse</th>
          <th className={styles.tableHeader}>Monitor</th>
          <th className={styles.tableHeader}>Monitor S/N</th>
          <th className={styles.tableHeader}>O.S Type</th>
          <th className={styles.tableHeader}>PC Name</th>
          <th className={styles.tableHeader}>Room</th>
          <th className={styles.tableHeader}>Status</th>
          <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {computers.map(computer => (
            <tr key={computer.id}>
              <td className={styles.td}>{computer.id}</td>
              <td className={styles.td}>{computer.pc_sn}</td>
              <td className={styles.td}>{computer.processor}</td>
              <td className={styles.td}>{computer.hd_size}</td>
              <td className={styles.td}>{computer.ram_size}</td>
              <td className={styles.td}>{computer.kyb_name}</td>
              <td className={styles.td}>{computer.mouse_name}</td>
              <td className={styles.td}>{computer.monitor_name}</td>
              <td className={styles.td}>{computer.monitor_sn}</td>
              <td className={styles.td}>{computer.os_type}</td>
              <td className={styles.td}>{computer.pc_name}</td>
              <td className={styles.td}>{computer.room}</td>
              <td className={styles.td}>{computer.status}</td>
              <td>
              {selectedComputerData && selectedComputerData.id === computer.id ? (
  <UpdateComputer
    computer={selectedComputerData}
    onUpdate={handleUpdate}
    setSelectedComputerData={setSelectedComputerData}
    onCancel={handleCancel}
  />
) : (
  <button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateComputer(computer)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteComputer(computer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Conditionally render the form */}
      {showForm ? (
        <div id="computer-form">
        <AddComputer onAddComputer={handleCreateComputer} onCancel={handleCancel} />
        </div>
      ) : (
        <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create Computer</button>
      )}
       <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
    </div>
    </div>
    
  );
}


export default ComputerPage;

