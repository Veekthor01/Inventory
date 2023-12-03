const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const updateComputer = (computerId, updatedComputer, db, callback) => {
  const updateComputerQuery = `
    UPDATE computers
    SET
      pc_sn = ?,
      processor = ?,
      hd_size = ?,
      ram_size = ?,
      kyb_name = ?,
      mouse_name = ?,
      monitor_name = ?,
      monitor_sn = ?,
      os_type = ?,
      pc_name = ?,
      room = ?,
      status = ?
    WHERE
      id = ?
  `;

  db.run(
    updateComputerQuery,
    [
      updatedComputer.pc_sn,
      updatedComputer.processor,
      updatedComputer.hd_size,
      updatedComputer.ram_size,
      updatedComputer.kyb_name,
      updatedComputer.mouse_name,
      updatedComputer.monitor_name,
      updatedComputer.monitor_sn,
      updatedComputer.os_type,
      updatedComputer.pc_name,
      updatedComputer.room,
      updatedComputer.status,
      computerId
    ],
    (err) => {
      if (err) {
        console.error(`Error updating computer: ${err.message}`);
        callback(err);
      } else {
        callback(null);
      }
    }
  );
};

const updateAccessory = (AccessoryId, updatedAccessory, db, callback) => {
    const updateAccessoryQuery = `
      UPDATE accessories
      SET
        type = ?,
        S_N = ?,
        model = ?,
        extension_no = ?,
        name = ?,
        room = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updateAccessoryQuery,
      [
        updatedAccessory.type,
        updatedAccessory.S_N,
        updatedAccessory.model,
        updatedAccessory.extension_no,
        updatedAccessory.name,
        updatedAccessory.room,
        AccessoryId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating accessory: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };
 
  
  const updateComponent = (ComponentId, updatedComponent, db, callback) => {
    const updateComponentQuery = `
      UPDATE components
      SET
        type = ?,
        name = ?,
        MAC_Address = ?,
        S_N = ?,
        model = ?,
        processor = ?,
        hd_size = ?,
        ram_size = ?,
        os_type = ?,
        room = ?,
        status = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updateComponentQuery,
      [
        updatedComponent.type,
        updatedComponent.name,
        updatedComponent.MAC_Address,
        updatedComponent.S_N,
        updatedComponent.model,
        updatedComponent.processor,
        updatedComponent.hd_size,
        updatedComponent.ram_size,
        updatedComponent.os_type,
        updatedComponent.room,
        updatedComponent.status,
        ComponentId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating component: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };
  

  const updatePersonnel = (PersonnelId, updatedPersonnel, db, callback) => {
    const updatePersonnelQuery = `
      UPDATE personnel
      SET
        first_name = ?,
        last_name = ?,
        department = ?,
        role = ?,
        email_address = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updatePersonnelQuery,
      [
        updatedPersonnel.first_name,
        updatedPersonnel.last_name,
        updatedPersonnel.department,
        updatedPersonnel.role,
        updatedPersonnel.email_address,
        PersonnelId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating personnel: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };


  const updateLicense = (LicenseId, updatedLicense, db, callback) => {
    const updateLicenseQuery = `
      UPDATE licenses
      SET
        product_name = ?,
        license_key = ?,
        expired = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updateLicenseQuery,
      [
        updatedLicense.product_name,
        updatedLicense.license_key,
        updatedLicense.expired,
        LicenseId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating license: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };

  const updateCategory = (CategoryId, updatedCategory, db, callback) => {
    const updateCategoryQuery = `
      UPDATE categories
      SET
        name = ?,
        type = ?,
        description = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updateCategoryQuery,
      [
        updatedCategory.name,
        updatedCategory.type,
        updatedCategory.description,
        CategoryId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating category: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };

  const updateSupplier = (SuppliersId, updatedSuppliers, db, callback) => {
    const updateSuppliersQuery = `
      UPDATE suppliers
      SET
        name = ?,
        address = ?,
        email = ?,
        phone = ?,
        items = ?,
        quantity = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updateSuppliersQuery,
      [
        updatedSuppliers.name,
        updatedSuppliers.address,
        updatedSuppliers.email,
        updatedSuppliers.phone,
        updatedSuppliers.items,
        updatedSuppliers.quantity,
        SuppliersId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating supplier: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };

  const updateDepartment = (DepartmentId, updatedDepartment, db, callback) => {
    const updateDepartmentQuery = `
      UPDATE department
      SET
        department = ?,
        staff = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updateDepartmentQuery,
      [
        updatedDepartment.department,
        updatedDepartment.staff,
        DepartmentId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating department: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };

  const updateMaintenance = (MaintenanceId, updatedManintenance, db, callback) => {
    const updateMaintenanceQuery = `
      UPDATE maintenance
      SET
       item_name = ?,
       type = ?,
       maintenance_type = ?
      WHERE
        id = ?
    `;
  
    db.run(
        updateMaintenanceQuery,
      [
        updatedManintenance.item_name,
        updatedManintenance.type,
        updatedManintenance.maintenance_type,
        MaintenanceId
      ],
      (err) => {
        if (err) {
          console.error(`Error updating maintenance: ${err.message}`);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  };


  const updateChartData = () => {
    const selectCountsQuery = `
      SELECT
        (SELECT COUNT(*) FROM components) AS component_count,
        (SELECT COUNT(*) FROM computers) AS computer_count,
        (SELECT COUNT(*) FROM accessories) AS accessory_count,
        (SELECT COUNT(*) FROM personnel) AS personnel_count,
        (SELECT COUNT(*) FROM licenses) AS license_count,
        (SELECT COUNT(*) FROM suppliers) AS supplier_count;
    `;
  
    db.get(selectCountsQuery, (err, row) => {
      if (err) {
        console.error('Error retrieving item counts:', err);
        return;
      }
  
      const { component_count, computer_count, accessory_count, personnel_count,
       license_count, supplier_count } = row;
  
      const updateQuery = `
        UPDATE chart_data
        SET component_count = ?,
            computer_count = ?,
            accessory_count = ?,
            personnel_count = ?,
            license_count = ?,
            supplier_count = ?;
      `;
  
      db.run(updateQuery, [component_count, computer_count, accessory_count, 
        personnel_count, license_count, supplier_count], 
        (updateErr) => {
        if (updateErr) {
          console.error('Error updating chart data:', updateErr);
        }
      });
    });
  };

module.exports = {
  updateComputer,
    updateAccessory,
    updateComponent,
    updatePersonnel,
    updateLicense,
    updateCategory,
    updateSupplier,
    updateDepartment,
    updateMaintenance,
    updateChartData,
};
