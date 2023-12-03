// AddPersonnel.js
import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddPersonnel({ onAddPersonnel, onCancel }) {
    const [personnelData, setPersonnelData] = useState({
        first_name: '',
        last_name: '',
        department: '',
        role: '',
        email_address: ''
    });

    // State variable to hold the error messages for each field
    const [firstNameWarning, setFirstNameWarning] = useState('');
    const [lastNameWarning, setLastNameWarning] = useState('');
    const [departmentWarning, setDepartmentWarning] = useState('');
    const [roleWarning, setRoleWarning] = useState('');
    const [emailWarning, setEmailWarning] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Perform validation based on the field name
        if (name === 'first_name') {
            const alphabeticRegex = /^[A-Za-z]*$/;
            setFirstNameWarning(!value.match(alphabeticRegex) ? 'Enter only alphabets for first name' : '');
        } else if (name === 'last_name') {
            const alphabeticRegex = /^[A-Za-z]*$/;
            setLastNameWarning(!value.match(alphabeticRegex) ? 'Enter only alphabets for last name' : '');
        }  else if (name === 'department') {
            setDepartmentWarning(value.trim() ? '' : 'Required');
        } else if (name === 'role') {
            setRoleWarning(value.trim() ? '' : 'Required');
        }  else if (name === 'email_address') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailWarning(!value.match(emailRegex) ? 'Enter a valid email address' : '');
        }

        setPersonnelData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleAdd = () => {
        // Check if any required fields are empty
        const requiredFields = ['first_name', 'last_name', 'department', 'role', 'email_address'];
        let hasRequiredFieldsEmpty = false;
        requiredFields.forEach((field) => {
            if (!personnelData[field].trim()) {
                hasRequiredFieldsEmpty = true;
            }
        });

        if (hasRequiredFieldsEmpty) {
            alert('Please fill in all required fields.');
            setFirstNameWarning(personnelData.first_name.trim() ? '' : 'Required');
            setLastNameWarning(personnelData.last_name.trim() ? '' : 'Required');
            setDepartmentWarning(personnelData.department.trim() ? '' : 'Required');
            setRoleWarning(personnelData.role.trim() ? '' : 'Required');
            setEmailWarning(personnelData.email_address.trim() ? '' : 'Required');
        } else {
            // Check if any field has invalid characters
            const hasInvalidCharacters =
                !personnelData.first_name.match(/^[A-Za-z]*$/) ||
                !personnelData.last_name.match(/^[A-Za-z]*$/) ||
                !personnelData.email_address.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

            if (hasInvalidCharacters) {
                alert('Please check the fields with invalid characters.');
            } else {
                onAddPersonnel(personnelData);
                setPersonnelData({
                    first_name: '',
                    last_name: '',
                    department: '',
                    role: '',
                    email_address: ''
                });
                setFirstNameWarning('');
                setLastNameWarning('');
                setDepartmentWarning('');
                setRoleWarning('');
                setEmailWarning('');
            }
        }
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div className={styles.formOverlay}>
        <div id="computer-form" className={styles.ProfileForm}>
            <h2 className={styles.formTitle}>Add New Personnel</h2>
            <form className={styles.form}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="first_name"
                        value={personnelData.first_name}
                        onChange={handleChange}
                        className={`${styles.inputField} ${firstNameWarning && styles.warning}`}
                    />
                    {firstNameWarning && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{firstNameWarning}</span>}
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={personnelData.last_name}
                        onChange={handleChange}
                        className={`${styles.inputField} ${lastNameWarning && styles.warning}`}
                    />
                    {lastNameWarning && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{lastNameWarning}</span>}
                </label>
                <label>
                    Department:
                    <select name="department" value={personnelData.department} onChange={handleChange} 
                    className={`${styles.inputField} ${departmentWarning && styles.warning}`} required>
                    <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="Public Relations">Public Relations</option>
                        <option value="Admissions Department">Admissions Department</option>
                        <option value="Student Affairs Department">Student Affairs Department</option>
                        <option value="Finance Department">Finance Department</option>
                        <option value="Library Department">Library Department</option>
                        <option value="Software Engineering">Software Engineering</option>
                        <option value="Data Science">Data Science</option>
                        <option value="ICDL/Graphic Design/Animation">ICDL/Graphic Design/Animation</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Transport Department">Transport Department</option>
                    </select>
                    {departmentWarning && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{departmentWarning}</span>}
                </label>
                <label>
                    Role:
                    <select name="role" value={personnelData.role} onChange={handleChange} 
                    className={`${styles.inputField} ${roleWarning && styles.warning}`} required >
                    <option value="">Select Role</option>
                        <option value="IT Manager">IT Manager</option>
                        <option value="Social Media Manager">Social Media Manager</option>
                        <option value="Admissions Counselor">Admissions Counselor</option>
                        <option value="Counselor">Counselor</option>
                        <option value="Administrative Assistant">Administrative Assistant</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Library Manager">Library Manager</option>
                        <option value="Lecturer">Lecturer</option>
                        <option value="Driver">Driver</option>
                    </select>
                    {roleWarning && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{roleWarning}</span>}
                </label>
                <label>
                    Email Address:
                    <input
                        type="text"
                        name="email_address"
                        value={personnelData.email_address}
                        onChange={handleChange}
                        className={`${styles.inputField} ${emailWarning && styles.warning}`}
                    />
                    {emailWarning && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{emailWarning}</span>}
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

export default AddPersonnel;
