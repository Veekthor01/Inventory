const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const deleteComputer = (computerId, db, callback) => {
    const deleteComputerQuery = 'DELETE FROM computers WHERE id = ?';
    db.run(deleteComputerQuery, [computerId], (err) => {
      if (err) {
        console.error(`Error deleting computer: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  const deleteAccessory = (accessoryId, db, callback) => {
    const deleteAccessoryQuery = 'DELETE FROM accessories WHERE id = ?';
    db.run(deleteAccessoryQuery, [accessoryId], (err) => {
      if (err) {
        console.error(`Error deleting accessory: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };
  
  const deleteComponent = (componentId, db, callback) => {
    const deleteComponentQuery = 'DELETE FROM components WHERE id = ?';
    db.run(deleteComponentQuery, [componentId], (err) => {
      if (err) {
        console.error(`Error deleting component: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  const deletePersonnel = (personnelId, db, callback) => {
    const deletePersonnelQuery = 'DELETE FROM personnel WHERE id = ?';
    db.run(deletePersonnelQuery, [personnelId], (err) => {
      if (err) {
        console.error(`Error deleting personnel: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  const deleteLicense = (licenseId, db, callback) => {
    const deleteLicenseQuery = 'DELETE FROM licenses WHERE id = ?';
    db.run(deleteLicenseQuery, [licenseId], (err) => {
      if (err) {
        console.error(`Error deleting license: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };


  const deleteCategory = (categoryId, db, callback) => {
    const deleteCategoryQuery = 'DELETE FROM categories WHERE id = ?';
    db.run(deleteCategoryQuery, [categoryId], (err) => {
      if (err) {
        console.error(`Error deleting categories: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
      
    });
  };

  const deleteSupplier = (supplierId, db, callback) => {
    const deleteSupplierQuery = 'DELETE FROM suppliers WHERE id = ?';
    db.run(deleteSupplierQuery, [supplierId], (err) => {
      if (err) {
        console.error(`Error deleting Supplier: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  const deleteDepartment = (departmentId, db, callback) => {
    const deleteDepartmentQuery = 'DELETE FROM department WHERE id = ?';
    db.run(deleteDepartmentQuery, [departmentId], (err) => {
      if (err) {
        console.error(`Error deleting department: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  const deleteMaintenance = (maintenanceId, db, callback) => {
    const deleteMaintenanceQuery = 'DELETE FROM maintenance WHERE id = ?';
    db.run(deleteMaintenanceQuery, [maintenanceId], (err) => {
      if (err) {
        console.error(`Error deleting maintenance: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };

  const deleteActivity = (recentActivityId, db, callback) => {
    const deleteActivityQuery = 'DELETE FROM recentActivity WHERE id = ?';
    db.run(deleteActivityQuery, [recentActivityId], (err) => {
      if (err) {
        console.error(`Error deleting ACTIVITY: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    });
  };


  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });

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
  