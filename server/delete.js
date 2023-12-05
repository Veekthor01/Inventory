const { pool } = require('./db');

const deleteComputer = async (computerId) => {
  try {
    await pool.query(`DELETE FROM computers WHERE id = $1`, [computerId]);
  } catch (err) {
    console.error(`Error deleting computer: ${err.message}`);
  }
};

const deleteAccessory = async (accessoryId) => {
  try {
    await pool.query(`DELETE FROM accessories WHERE id = $1`, [accessoryId]);
  } catch (err) {
    console.error(`Error deleting accessory: ${err.message}`);
  }
};

const deleteComponent = async (componentId) => {
  try {
    await pool.query(`DELETE FROM components WHERE id = $1`, [componentId]);
  } catch (err) {
    console.error(`Error deleting component: ${err.message}`);
  }
};

const deletePersonnel = async (personnelId) => {
  try {
    await pool.query(`DELETE FROM personnel WHERE id = $1`, [personnelId]);
  }
  catch (err) {
    console.error(`Error deleting personnel: ${err.message}`);
  }
};

const deleteLicense = async (licenseId) => {
  try {
    await pool.query(`DELETE FROM licenses WHERE id = $1`, [licenseId]);
  } catch (err) {
    console.error(`Error deleting license: ${err.message}`);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    await pool.query(`DELETE FROM category WHERE id = $1`, [categoryId]);
  }
  catch (err) {
    console.error(`Error deleting category: ${err.message}`);
  }
};

const deleteSupplier = async (supplierId) => {
  try {
    await pool.query(`DELETE FROM suppliers WHERE id = $1`, [supplierId]);
  }
  catch (err) {
    console.error(`Error deleting supplier: ${err.message}`);
  }
};

const deleteDepartment = async (departmentId) => {
  try {
    await pool.query(`DELETE FROM department WHERE id = $1`, [departmentId]);
  }
  catch (err) {
    console.error(`Error deleting department: ${err.message}`);
  }
};

const deleteMaintenance = async (maintenanceId) => {
  try {
    await pool.query(`DELETE FROM maintenance WHERE id = $1`, [maintenanceId]);
  }
  catch (err) {
    console.error(`Error deleting maintenance: ${err.message}`);
  }
};

const deleteActivity = async (activityId) => {
  try {
    await pool.query(`DELETE FROM recentActivity WHERE id = $1`, [activityId]);
  }
  catch (err) {
    console.error(`Error deleting activity: ${err.message}`);
  }
};

  module.exports = {
    deleteComputer,
    deleteAccessory,
    deleteComponent,
    deletePersonnel,
    deleteLicense,
    deleteCategory,
    deleteSupplier,
    deleteDepartment,
    deleteMaintenance,
    deleteActivity,
  };