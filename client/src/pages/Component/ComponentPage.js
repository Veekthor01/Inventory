import React, { useEffect, useState } from 'react';
import { fetchComponents, createComponent, updateComponent, deleteComponent } from '../../api/api';
import AddComponent from './addComponent';
import UpdateComponent from './updateComponent';
import styles from '../pages.module.css';

function ComponentPage() {
  // State variable to store the list of components
  const [components, setComponents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedComponentData, setSelectedComponentData] = useState(null);

  // Use effect to fetch components on component mount
  useEffect(() => {
    fetchComponents()
      .then(componentsData => {
        setComponents(componentsData);
      })
      .catch(error => {
        console.error('Error fetching components:', error);
      });
  }
  , []);

  // Function to handle the create button click and show the form
  const handleCreateButtonClick = () => {
    setShowForm(true);
  }

  // Function to create a new component and update the component list
  const handleCreateComponent = (newComponentData) => {
    createComponent(newComponentData)
      .then(() => {
        // Fetch the updated list of components
        fetchComponents()
          .then(componentsData => {
            setComponents(componentsData);
          })
          .catch(error => {
            console.error('Error fetching components:', error);
          });
          window.alert('Component created successfully!');
      })
      .catch(error => {
        console.error('Error creating component:', error);
        window.alert('An error occurred while creating the component. Please try again later.');
      });

    setShowForm(false);
  };

  // Function to handle updating a component data and hide the form
  const handleUpdateComponent = (component) => {
    setSelectedComponentData({ ...component }); // Update the selected component data
    setShowForm(false);
  }

  // Function to update a component and update the component list
  const handleUpdate = () => {
    updateComponent(selectedComponentData.id, selectedComponentData)
      .then(() => {
        // Fetch the updated list of components
        fetchComponents()
          .then(componentsData => {
            setComponents(componentsData);
          })
          .catch(error => {
            console.error('Error fetching components:', error);
          });
      })
      .catch(error => {
        console.error('Error updating component:', error);
        window.alert('An error occurred while updating the component. Please try again later.');
      })

    .finally(() => {
        setSelectedComponentData(null); // Clear the selected computer data
        window.alert('Component updated successfully!');
      });
      
  };

  // Function to handle deleting a component
  const handleDeleteComponent = (componentId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this component?");
  
    if (confirmDelete) {
      deleteComponent(componentId)
        .then(() => {
          setComponents(prevComponents => prevComponents.filter(component => component.id !== componentId));
          window.alert('Component deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting component:', error);
          window.alert('An error occurred while deleting the component. Please try again later.');
        });
    }
  };
  
// Function to handle canceling the component form and hide the form
const handleCancel = () => {
  setShowForm(false);
  setSelectedComponentData(null);
};

 // Function to handle the print button click and generate the PDF data
 const handlePrint = () => {
  window.print();
};

return (
  <div>
   <div className = "header"><h1>Components</h1></div>
    <div className={styles.tableContainer}>
      <table className={styles.table}>
      <thead>
        <tr>
        <th className={styles.tableHeader}>NO.</th>
        <th className={styles.tableHeader}>Type</th>
        <th className={styles.tableHeader}>Name</th>
        <th className={styles.tableHeader}>MAC_Add</th>
        <th className={styles.tableHeader}>S_N</th>
        <th className={styles.tableHeader}>Model</th>
        <th className={styles.tableHeader}>Processor</th>
        <th className={styles.tableHeader}>HD Size</th>
        <th className={styles.tableHeader}>RAM</th>
        <th className={styles.tableHeader}>O.S Type</th>
        <th className={styles.tableHeader}>Room</th>
        <th className={styles.tableHeader}>Status</th>
        <th className={styles.tableHeader}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {components.map(component => (
          <tr key={component.id}>
            <td className={styles.td}>{component.id}</td>
            <td className={styles.td}>{component.type}</td>
            <td className={styles.td}>{component.name}</td>
            <td className={styles.td}>{component.MAC_Address}</td>
            <td className={styles.td}>{component.S_N}</td>
            <td className={styles.td}>{component.model}</td>
            <td className={styles.td}>{component.processor}</td>
            <td className={styles.td}>{component.hd_size}</td>
            <td className={styles.td}>{component.ram_size}</td>
            <td className={styles.td}>{component.os_type}</td>
            <td className={styles.td}>{component.room}</td>
            <td className={styles.td}>{component.status}</td>
            <td>
            {selectedComponentData && selectedComponentData.id === component.id ? (
<UpdateComponent
  component={selectedComponentData}
  onUpdate={handleUpdate}
  setSelectedComponentData={setSelectedComponentData}
  onCancel={handleCancel}
/>
) : (
<button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateComponent(component)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteComponent(component.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    {/* Conditionally render the form */}
    {showForm ? (
      <AddComponent onAddComponent={handleCreateComponent} onCancel={handleCancel} />
    ) : (
      <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create Component</button>
    )}
     <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
  </div>
);
}


export default ComponentPage;
