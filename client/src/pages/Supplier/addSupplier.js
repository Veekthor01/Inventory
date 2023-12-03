import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddSupplier({ onAddSupplier, onCancel }) {
  // State variables to store supplier data for the form and validation errors
  const [supplierData, setSupplierData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    items: '',
    quantity: '',
  });

  // State variable to hold the error messages for each field
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [itemError, setItemError] = useState('');
  const [quantityError, setQuantityError] = useState('');

  // Function to handle changes in the form and update supplierData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Perform validation based on the field name
    if (name === 'name') {
      setNameError(value.trim() ? '' : 'Required');
    } else if (name === 'address') {
      setAddressError(value.trim() ? '' : 'Required');
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setEmailError(value.match(emailRegex) ? '' : 'Enter a valid email address');
    } else if (name === 'phone') {
        const phoneRegex = /^\+254\d{9}$/;
      setPhoneError(value.match(phoneRegex) ? '' : 'Enter a valid phone number');
    } else if (name === 'items') {
      setItemError(value.trim() ? '' : 'Required');
    } else if (name === 'quantity') {
      setQuantityError(/^\d+$/.test(value) ? '' : 'Enter a valid quantity');
    }
  };

  // Function to handle adding a new supplier and hide the form
  const handleAdd = () => {
    // Check if any required fields are empty
    if (!supplierData.name.trim() || !supplierData.address.trim()) {
      setNameError(supplierData.name.trim() ? '' : 'Required');
      setAddressError(supplierData.address.trim() ? '' : 'Required');
      setEmailError(supplierData.email.trim() ? '' : 'Required');
      setPhoneError(supplierData.phone.trim() ? '' : 'Required');
      setItemError(supplierData.items.trim() ? '' : 'Required');
      setQuantityError(supplierData.quantity.trim() ? '' : 'Required');
      alert('Please fill in all required fields.');
      return;
    }

    // Check if any validation errors exist
    if (nameError || addressError || emailError || phoneError || itemError || quantityError) {
      alert('Please check the fields with invalid data.');
      return;
    }

    // If all validations pass, proceed with adding the supplier
    onAddSupplier(supplierData);
    setSupplierData({
      name: '',
      address: '',
      phone: '',
      email: '',
      items: '',
      quantity: '',
    });
    setNameError('');
    setAddressError('');
    setEmailError('');
    setPhoneError('');
    setItemError('');
    setQuantityError('');
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.formOverlay}>
    <div id="computer-form" className={styles.ProfileForm}>
      <h2 className={styles.formTitle}>Add New Supplier</h2>
      <form className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={supplierData.name}
            onChange={handleChange}
            className={`${styles.inputField} ${nameError && styles.warning}`}
          />
          {nameError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{nameError}</span>}
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={supplierData.address}
            onChange={handleChange}
            className={`${styles.inputField} ${addressError && styles.warning}`}
          />
          {addressError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{addressError}</span>}
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={supplierData.phone}
            onChange={handleChange}
            className={`${styles.inputField} ${phoneError && styles.warning}`}
            required
            pattern="^\+254\d{9}$"
            placeholder= "+254"
          />
          {phoneError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{phoneError}</span>}
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={supplierData.email}
            onChange={handleChange}
            className={`${styles.inputField} ${emailError && styles.warning}`}
          />
          {emailError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{emailError}</span>}
        </label>
        <label>
          Items:
          <select name="items"value={supplierData.items}onChange={handleChange} className={`${styles.inputField} ${itemError && styles.warning}`}>
          <option value="">Select Item</option>
            <option value="Computer">Computer</option>
          <option value="Printer">Printer</option>
          <option value="Projector">Projector</option>
          <option value="Telephone">Telephone</option>
          <option value="Television">Television</option>
          <option value="Switches">Switches</option>
         <option value="Router">Router</option>
         <option value="Server">Server</option>
        </select>
        {itemError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{itemError}</span>}
        </label>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            value={supplierData.quantity}
            onChange={handleChange}
            className={`${styles.inputField} ${quantityError && styles.warning}`}
          />
          {quantityError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{quantityError}</span>}
        </label>
        <button type="button" onClick={handleAdd} className={styles.addButtonForm}>
          Add
        </button>
        <p onClick={handleCancel} className={styles.cancelForm}>
          Cancel
        </p>
      </form>
    </div>
  </div>
  );
}

export default AddSupplier;
