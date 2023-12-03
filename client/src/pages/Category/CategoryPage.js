import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../api/api';
import AddCategory from './addCategory';
import UpdateCategory from './updateCategory';
import styles from '../pages.module.css';

function CategoryPage() {
  // State variable to store the list of categories
  const [categories, setCategories] = useState([]);
  // State variables for managing the category form visibility and selected category data
  const [showForm, setShowForm] = useState(false);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

// Use effect to fetch categories on component mount
useEffect(() => {
  fetchCategories()
    .then(categoriesData => {
      setCategories(categoriesData);
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
    });
}, []);

// Function to handle the create button click and show the form
const handleCreateButtonClick = () => {
  setShowForm(true);
};

// Function to create a new category and update the category list
const handleCreateCategory = (newCategoryData) => {
  createCategory(newCategoryData)
    .then(() => {
      // Fetch the updated list of categories
      fetchCategories()
        .then(categoriesData => {
          setCategories(categoriesData);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
        window.alert('Category created successfully!');
    })
    .catch(error => {
      console.error('Error creating category:', error);
      window.alert('An error occurred while creating the category. Please try again later.');
    });

  setShowForm(false);
};

// Function to handle updating a category data and hide the form
const handleUpdateCategory = (category) => {
  setSelectedCategoryData({ ...category }); // Update the selected category data
  setShowForm(false);
};

// Function to update a category and update the category list
const handleUpdate = () => {
  updateCategory(selectedCategoryData.id, selectedCategoryData)
    .then(() => {
      // Fetch the updated list of categories
      fetchCategories()
        .then(categoriesData => {
          setCategories(categoriesData);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    })
    .catch(error => {
      console.error('Error updating category:', error);
      window.alert('An error occurred while updating the category. Please try again later.');
    })
    .finally(() => {
      setSelectedCategoryData(null); // Clear the selected category data
      window.alert('Category updated successfully!');
    });
}

// Function to delete a category and update the category list
const handleDeleteCategory = (categoryId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this category?");

  if (confirmDelete) {
    deleteCategory(categoryId)
      .then(() => {
        setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
        window.alert('Category deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting category:', error);
        window.alert('An error occurred while deleting the category. Please try again later.');
      });
  }
};

// Function to handle canceling the category form and hide the form
const handleCancel = () => {
  setShowForm(false);
  setSelectedCategoryData(null);
};

// Function to handle the print button click and generate the PDF data
const handlePrint = () => {
  window.print();
};

return (
  <div>
    <div className = "header"><h1>Categories</h1></div>
    <div className={styles.tableContainer}>
      <table className={styles.table}>
      <thead>
        <tr>
        <th className={styles.tableHeader}>NO.</th>
        <th className={styles.tableHeader}>Name</th>
        <th className={styles.tableHeader}>Type</th>
        <th className={styles.tableHeader}>Description</th>
        <th className={styles.tableHeader}>Actions</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {categories.map(category => (
          <tr key={category.id}>
            <td className={styles.td}>{category.id}</td>
            <td className={styles.td}>{category.name}</td>
            <td className={styles.td}>{category.type}</td>
            <td className={styles.td}>{category.description}</td>
            <td>
            {selectedCategoryData && selectedCategoryData.id === category.id ? (
<UpdateCategory
  category={selectedCategoryData}
  onUpdate={handleUpdate}
  setSelectedCategoryData={setSelectedCategoryData}
  onCancel={handleCancel}
/>
) : (
<button className={`${styles.button} ${styles.updateButton}`} onClick={() => handleUpdateCategory(category)}>Update</button>
)}

<button className={`${styles.button} ${styles.deleteButton}`} onClick={() => handleDeleteCategory(category.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    {/* Conditionally render the form */}
    {showForm ? (
      <AddCategory onAddCategory={handleCreateCategory} onCancel={handleCancel} />
    ) : (
      <button className={`${styles.button} ${styles.createButton}`} onClick={handleCreateButtonClick}>Create Category</button>
    )}
     <button className={`${styles.button} ${styles.printButton}`} onClick={handlePrint}>Print PDF</button>
  </div>
);
}



export default CategoryPage;
