import React, { useEffect, useState } from 'react';
import { fetchSuppliers, createSupplier, updateSupplier, deleteSupplier } from '../../api/api';
import AddSupplier from './addSupplier';  
import UpdateSupplier from './updateSupplier';
import styles from '../pages.module.css';

function SupplierPage() {
  // State variable to store the list of suppliers
  const [suppliers, setSuppliers] = useState([]);
  // State variables for managing the supplier form visibility and selected supplier data
  const [showForm, setShowForm] = useState(false);
  const [selectedSupplierData, setSelectedSupplierData] = useState(null);

  // Use effect to fetch suppliers on component mount
  useEffect(() => {
    fetchSuppliers()
      .then(suppliersData => {
        setSuppliers(suppliersData);
      })
      .catch(error => {
        console.error('Error fetching suppliers:', error);
      });
  }, []);

  // Function to handle the create button click and show the form
  const handleCreateButtonClick = () => {
    setShowForm(true);
  };

  // Function to create a new supplier and update the supplier list
  const handleCreateSupplier = (newSupplierData) => {
    createSupplier(newSupplierData)
      .then(() => {
        // Fetch the updated list of suppliers
        fetchSuppliers()
          .then(suppliersData => {
            setSuppliers(suppliersData);
          })
          .catch(error => {
            console.error('Error fetching suppliers:', error);
          });
          window.alert('Supplier created successfully!');
      })
      .catch(error => {
        console.error('Error creating supplier:', error);
        window.alert('An error occurred while creating the supplier. Please try again later.');
      });

    setShowForm(false);
  };

  // Function to handle updating a supplier data and hide the form
  const handleUpdateSupplier = (supplier) => {
    setSelectedSupplierData({ ...supplier }); // Update the selected supplier data
    setShowForm(false)
}


  const handleUpdate = () => {
    updateSupplier(selectedSupplierData.id, selectedSupplierData)
      .then(() => {
        // Fetch the updated list of suppliers
        fetchSuppliers()
          .then(suppliersData => {
            setSuppliers(suppliersData);
          })
          .catch(error => {
            console.error('Error fetching suppliers:', error);
          });
      })
      .catch(error => {
        console.error('Error updating supplier:', error);
        window.alert('An error occurred while updating the supplier. Please try again later.');
      })
      .finally(() => {
        setSelectedSupplierData(null); // Clear the selected computer data
        window.alert('Supplier updated successfully!');
      });
  };

  // Function to handle deleting a supplier
  const handleDeleteSupplier = (supplierId) => {
  // Display a confirmation prompt before deleting the supplier
  const confirmDelete = window.confirm('Are you sure you want to delete this supplier?');

  // If the user confirms the deletion, proceed with the delete operation
  if (confirmDelete) {
    deleteSupplier(supplierId)
      .then(() => {
        setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier.id !== supplierId));
        window.alert('Supplier deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting supplier:', error);
        window.alert('An error occurred while deleting the supplier. Please try again later.');
      });
  }
};

  // Function to handle canceling the supplier form and hide the form
  const handleCancel = () => {
    setShowForm(false);
    setSelectedSupplierData(null);
  };

 // Function to handle the print button click and generate the PDF data
 const handlePrint = () => {
  window.print();
};

  return (
    <div>
      <div className = "header"><h1>Suppliers</h1></div>
      <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
          <th className={styles.tableHeader}>NO.</th>
          <th className={styles.tableHeader}>Name</th>
          <th className={styles.tableHeader}>Address</th>
          <th className={styles.tableHeader}>Email Address</th>
          <th className={styles.tableHeader}>Phone</th>
          <th className={styles.tableHeader}>Items</th>
          <th className={styles.tableHeader}>Quantity</th>
          <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {suppliers.map(supplier => (
            <tr key={supplier.id}>
               <td className={styles.td}>{supplier.id}</td>
               <td className={styles.td}>{supplier.name}</td>
               <td className={styles.td}>{supplier.address}</td>
               <td className={styles.td}>{supplier.email}</td>
               <td className={styles.td}>{supplier.phone}</td>
               <td className={styles.td}>{supplier.items}</td>
               <td className={styles.td}>{supplier.quantity}</td>
              <td>
              {selectedSupplierData && selectedSupplierData.id === supplier.id ? (
  <UpdateSupplier
    supplier={selectedSupplierData}
    onUpdate={handleUpdate}
    setSelectedSupplierData={setSelectedSupplierData}
    onCancel={handleCancel}
  />
) : (
  <button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateSupplier(supplier)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* Conditionally render the form */}
      {showForm ? (
        <AddSupplier onAddSupplier={handleCreateSupplier}  onCancel={handleCancel} />
      ) : (
        <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create Supplier</button>
      )}
       <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
    </div>
  );
}




export default SupplierPage;
