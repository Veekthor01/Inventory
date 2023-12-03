import React, { useState } from 'react';
import styles from '../addupdate.module.css';

function AddDepartment({ onAddDepartment, onCancel }) {
  // State variable to store department data for the form
  const [departmentData, setDepartmentData] = useState({
    department: '', // Initialize with an empty value
    staff: ''
  });

  // State variable to hold the error messages for each field
  const [staffError, setStaffError] = useState('');
  const [departmentError, setDepartmentError] = useState('');

  // Function to handle changes in the form and update departmentData state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Perform validation for the staff field (numeric only)
    if (name === 'staff') {
      setStaffError(/^\d+$/.test(value) ? '' : 'Wrong Staff Data');
    }
  };

  // Function to handle adding a new department and hide the form
  const handleAdd = () => {
    // Check if the department is not selected or the staff field is empty or has non-numeric characters
    if (!departmentData.department || !departmentData.staff.trim() || !/^\d+$/.test(departmentData.staff)) {
      setStaffError(!departmentData.staff.trim() ? 'Staff is required' : 'Wrong Staff Data');
      setDepartmentError(!departmentData.department ? 'Please choose a department' : '');
      alert('Please check the fields with invalid data.');
      return;
    }

    // If all validations pass, proceed with adding the department
    onAddDepartment(departmentData);
    setDepartmentData({
      department: '', // Reset to the empty value after adding
      staff: ''
    });
    setStaffError('');
    setDepartmentError('');
  };
  // Function to handle canceling the department form and hide the form
  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className={styles.formOverlay}>
    <div id="computer-form" className={styles.ProfileForm}>
      <h2 className={styles.formTitle}>Add New Department</h2>
      <form className={styles.form}>
        <label>
          Department:
          <select name="department" value={departmentData.department} onChange={handleChange}  
          className={`${styles.inputField} ${departmentError && styles.warning}`}
            required >
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
          {departmentError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{departmentError}</span>}
        </label>
        <label>
          Staff:
          <input
            type="text"
            name="staff"
            value={departmentData.staff}
            onChange={handleChange}
            className={`${styles.inputField} ${staffError && styles.warning}`}
             required
          />
          {staffError && <span className={styles.requiredIndicator} style={{ fontSize: '14px', color: '#e70404' }}>{staffError}</span>}
        </label>
        <button type="button" onClick={handleAdd} className={styles.addButtonForm}>Add</button>
        <p onClick={handleCancel} className={styles.cancelForm}>Cancel</p>
      </form>
    </div>
    </div>
  );
}

export default AddDepartment;
