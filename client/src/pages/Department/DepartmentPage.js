import React, { useEffect, useState } from 'react';
import { fetchDepartment, createDepartment, updateDepartment, deleteDepartment } from '../../api/api';
import AddDepartment from './addDepartment.js';
import UpdateDepartment from './updateDepartment';
import styles from '../pages.module.css';

function DepartmentPage() {
  // State variable to store the list of departments
  const [department, setDepartment] = useState([]);
  // State variables for managing the department form visibility and selected department data
  const [showForm, setShowForm] = useState(false);
  const [selectedDepartmentData, setSelectedDepartmentData] = useState(null);

  // Use effect to fetch departments on component mount
  useEffect(() => {
    fetchDepartment()
      .then(departmentData => {
        setDepartment(departmentData);
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }
  , []);

  // Function to handle the create button click and show the form
  const handleCreateButtonClick = () => {
    setShowForm(true);
  }

  // Function to create a new department and update the department list
  const handleCreateDepartment = (newDepartmentData) => {
    createDepartment(newDepartmentData)
      .then(() => {
        // Fetch the updated list of departments
        fetchDepartment()
          .then(departmentData => {
            setDepartment(departmentData);
          })
          .catch(error => {
            console.error('Error fetching departments:', error);
            window.alert('Department created successfully!');
          });
      })
      .catch(error => {
        console.error('Error creating department:', error);
        window.alert('An error occurred while creating the department. Please try again later.');
      });

    setShowForm(false);
  }

  // Function to handle updating a department data and hide the form
  const handleUpdateDepartment = (department) => {
    setSelectedDepartmentData({ ...department }); // Update the selected department data
    setShowForm(false);
  }

// Function to update a department and update the department list
  const handleUpdate = () => {
    updateDepartment(selectedDepartmentData.id, selectedDepartmentData)
      .then(() => {
        // Fetch the updated list of departments
        fetchDepartment()
          .then(departmentData => {
            setDepartment(departmentData);
          })
          .catch(error => {
            console.error('Error fetching departments:', error);
          });
      })
      .catch(error => {
        console.error('Error updating department:', error);
        window.alert('An error occurred while updating the department. Please try again later.');
      })
      .finally(() => {
        setSelectedDepartmentData(null); // Clear the selected department data
        window.alert('Department updated successfully!');
      });
  }

  // Function to handle deleting a department
  const handleDeleteDepartment = (departmentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this department?");
  
    if (confirmDelete) {
      deleteDepartment(departmentId)
        .then(() => {
          setDepartment(prevDepartment => prevDepartment.filter(department => department.id !== departmentId));
          window.alert('Department deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting department:', error);
          window.alert('An error occurred while deleting the department. Please try again later.');
        });
    }
  };
  
// Function to handle canceling the department form and hide the form
  const handleCancel = () => {
    setShowForm(false);
    setSelectedDepartmentData(null);
  };

  // Function to handle the print button click and generate the PDF data
const handlePrint = () => {
  window.print();
};

  return (
    <div>
      <div className = "header"><h1>Departments</h1></div>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
          <th className={styles.tableHeader}>NO.</th>
          <th className={styles.tableHeader}>Departments</th>
          <th className={styles.tableHeader}>Staff</th>
          <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {department.map(department => (
            <tr key={department.id}>
              <td className={styles.td}>{department.id}</td>
              <td className={styles.td}>{department.department}</td>
              <td className={styles.td}>{department.staff}</td>
              <td>
              {selectedDepartmentData && selectedDepartmentData.id === department.id ? (
  <UpdateDepartment
  department={selectedDepartmentData}
    onUpdate={handleUpdate}
    setSelectedDepartmentData={setSelectedDepartmentData}
    onCancel={handleCancel}
  />
) : (
  <button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateDepartment(department)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteDepartment(department.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Conditionally render the form */}
      {showForm ? (
        <AddDepartment onAddDepartment={handleCreateDepartment} onCancel={handleCancel} />
      ) : (
        <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create Department</button>
      )}
       <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
    </div>
  );
}



export default DepartmentPage;
