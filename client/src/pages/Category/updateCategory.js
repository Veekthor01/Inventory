import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function UpdateCategory({ category, onUpdate, setSelectedCategoryData, onCancel }) {

    const [categoryData, setCategoryData] = useState(category);

    // Function to handle changes in the form and update categoryData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevData => ({
          ...prevData,
          [name]: value
        }));
    
        setSelectedCategoryData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

      // Function to handle updating a category and hide the form
    const handleUpdate = () => {
        onUpdate(categoryData);
      }

      // Function to handle canceling the category form and hide the form
      const handleCancel = () => {
        onCancel();
    }

    return (
      <div className={styles.formOverlay}>
      <div id="computer-form" className={styles.computerForm}>
      <h2 className={styles.formTitle}>Update Category</h2>
      <form className={styles.form}>
                <label>
                    Name:
                    <input type="text" name="name" value={categoryData.name} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Type:
                    <input type="text" name="type" value={categoryData.type} onChange={handleChange} className={styles.inputField} />
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={categoryData.description} onChange={handleChange} className={styles.inputField} />
                </label>
                <button type="button" onClick={handleUpdate} className={styles.updateButtonForm}>Update</button>
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
    </div>
    )
}

export default UpdateCategory;