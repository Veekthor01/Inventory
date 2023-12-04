const { sql } = require('@vercel/postgres');

const deleteComputer = async (computerId) => {
  const deleteComputerQuery = sql`DELETE FROM computers WHERE id = ${computerId}`;
  try {
    await sql`${deleteComputerQuery}`;
  } catch (err) {
    console.error(`Error deleting computer: ${err.message}`);
  }
};

const deleteAccessory = async (accessoryId) => {
  const deleteAccessoryQuery = sql`DELETE FROM accessories WHERE id = ${accessoryId}`;
  try {
    await sql`${deleteAccessoryQuery}`;
  } catch (err) {
    console.error(`Error deleting accessory: ${err.message}`);
  }
};

const deleteComponent = async (componentId) => {
  const deleteComponentQuery = sql`DELETE FROM components WHERE id = ${componentId}`;
  try {
    await sql`${deleteComponentQuery}`;
  } catch (err) {
    console.error(`Error deleting component: ${err.message}`);
  }
};

const deletePersonnel = async (personnelId) => {
  const deletePersonnelQuery = sql`DELETE FROM personnel WHERE id = ${personnelId}`;
  try {
    await sql`${deletePersonnelQuery}`;
  } catch (err) {
    console.error(`Error deleting personnel: ${err.message}`);
  }
};

const deleteLicense = async (licenseId) => {
  const deleteLicenseQuery = sql`DELETE FROM licenses WHERE id = ${licenseId}`;
  try {
    await sql`${deleteLicenseQuery}`;
  } catch (err) {
    console.error(`Error deleting license: ${err.message}`);
  }
};

const deleteCategory = async (categoryId) => {
  const deleteCategoryQuery = sql`DELETE FROM categories WHERE id = ${categoryId}`;
  try {
    await sql`${deleteCategoryQuery}`;
  } catch (err) {
    console.error(`Error deleting category: ${err.message}`);
  }
};

const deleteSupplier = async (supplierId) => {
  const deleteSupplierQuery = sql`DELETE FROM suppliers WHERE id = ${supplierId}`;
  try {
    await sql`${deleteSupplierQuery}`;
  } catch (err) {
    console.error(`Error deleting supplier: ${err.message}`);
  }
};

const deleteDepartment = async (departmentId) => {
  const deleteDepartmentQuery = sql`DELETE FROM department WHERE id = ${departmentId}`;
  try {
    await sql`${deleteDepartmentQuery}`;
  } catch (err) {
    console.error(`Error deleting department: ${err.message}`);
  }
};

const deleteMaintenance = async (maintenanceId) => {
  const deleteMaintenanceQuery = sql`DELETE FROM maintenance WHERE id = ${maintenanceId}`;
  try {
    await sql`${deleteMaintenanceQuery}`;
  } catch (err) {
    console.error(`Error deleting maintenance: ${err.message}`);
  }
};

const deleteActivity = async (recentActivityId) => {
  const deleteActivityQuery = sql`DELETE FROM recentActivity WHERE id = ${recentActivityId}`;
  try {
    await sql`${deleteActivityQuery}`;
  } catch (err) {
    console.error(`Error deleting ACTIVITY: ${err.message}`);
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