import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddCategory({ onAddCategory, onCancel }) {
    // State variable to store category data for the form
    const [categoryData, setCategoryData] = useState({
        name: '',
        type: '',
        description: ''
      });

      // State variable to hold the error messages for each field
    const [nameError, setNameError] = useState('');
  const [typeError, setTypeError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

        // Function to handle changes in the form and update categoryData state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData(prevData => ({
          ...prevData,
          [name]: value
        }));
      }

    // Function to handle adding a new category and hide the form
    const handleAdd = () => {
      // Check if the required dropdowns are not selected
    if (!categoryData.name || !categoryData.type || !categoryData.description) {
      setNameError(!categoryData.name ? 'Name is required' : '');
      setTypeError(!categoryData.type ? 'Type is required' : '');
      setDescriptionError(!categoryData.description ? 'Description is required' : '');
      alert('Please check the fields with invalid data.');
      return;
    }

    // If all validations pass, proceed with adding the category
        onAddCategory(categoryData);
        setCategoryData({
            name: '',
            type: '',
            description: ''
          });
    setNameError('');
    setTypeError('');
    setDescriptionError('');
      }

    // Function to handle canceling the category form and hide the form
      const handleCancel = () => {
        onCancel();
    }

    return (
      <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.ProfileForm}>
        <h2 className={styles.formTitle}>Add New Category</h2>
        <form className={styles.form}>
                <label>
                    Name:
                    <select name="name" value={categoryData.name} onChange={handleChange} 
                   className={`${styles.inputField} ${nameError && styles.warning}`} required >
                      <option value="">Select Name</option>
                    <option value="HP LaserJet">HP LaserJet</option>
                    <option value="Samsung">Samsung</option>
                    <option value="L.G">L.G</option>
                    <option value="Cisco">Cisco</option>
                    <option value="CYBERROAM">CYBERROAM</option>
                    <option value="Lexmark">Lexmark</option>
                    <option value="D-LINK">D-LINK</option>
                    <option value="T-P LINK">T-P LINK</option>
                      </select>
                      {nameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{nameError}</span>}
                </label>
                <label>
                    Type:
                    <select name="type" value={categoryData.type} onChange={handleChange} 
                    className={`${styles.inputField} ${typeError && styles.warning}`} required >
                    <option value="">Select Type</option>
                    <option value="Printer">Printer</option>
                    <option value="Projector">Projector</option>
                    <option value="Telephone">Telephone</option>
                    <option value="Television">Television</option>
                    <option value="Switches">Switches</option>
                    <option value="Router">Router</option>
                    <option value="Server">Server</option>
                      </select>
                      {typeError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{typeError}</span>}
                </label>
                <label>
                    Description:
                    <select name="description" value={categoryData.description} onChange={handleChange} 
                   className={`${styles.inputField} ${descriptionError && styles.warning}`} required  >
                    <option value="">Select Description</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Components">Components</option>
                </select>
                {descriptionError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{descriptionError}</span>}
                </label>
                <button type="button" onClick={handleAdd} className={styles.addButtonForm}>Add</button>  
                <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
            </form>
        </div>
      </div>
    )
}

export default AddCategory;