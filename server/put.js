const { pool } = require('./db');

const updateComputer = async (computerId, updatedComputer) => {
  const updateComputerQuery = pool.query(`
    UPDATE computers
    SET
      pc_sn = ${updatedComputer.pc_sn},
      processor = ${updatedComputer.processor},
      hd_size = ${updatedComputer.hd_size},
      ram_size = ${updatedComputer.ram_size},
      kyb_name = ${updatedComputer.kyb_name},
      mouse_name = ${updatedComputer.mouse_name},
      monitor_name = ${updatedComputer.monitor_name},
      monitor_sn = ${updatedComputer.monitor_sn},
      os_type = ${updatedComputer.os_type},
      pc_name = ${updatedComputer.pc_name},
      room = ${updatedComputer.room},
      status = ${updatedComputer.status}
    WHERE
      id = ${computerId}
  `);

  try {
    await pool.query`${updateComputerQuery}`;
  } catch (err) {
    console.error(`Error updating computer in the computers table: ${err.message}`);
  }
};

const updateAccessory = async (AccessoryId, updatedAccessory) => {
  const updateAccessoryQuery = pool.query(`
    UPDATE accessories
    SET
      type = ${updatedAccessory.type},
      S_N = ${updatedAccessory.S_N},
      model = ${updatedAccessory.model},
      extension_no = ${updatedAccessory.extension_no},
      name = ${updatedAccessory.name},
      room = ${updatedAccessory.room}
    WHERE
      id = ${AccessoryId}
  `);

  try {
    await pool.query`${updateAccessoryQuery}`;
  } catch (err) {
    console.error(`Error updating accessory in the accessories table: ${err.message}`);
  }
};
  
const updateComponent = async (ComponentId, updatedComponent) => {
  const updateComponentQuery = pool.query(`
    UPDATE components
    SET
      type = ${updatedComponent.type},
      name = ${updatedComponent.name},
      MAC_Address = ${updatedComponent.MAC_Address},
      S_N = ${updatedComponent.S_N},
      model = ${updatedComponent.model},
      processor = ${updatedComponent.processor},
      hd_size = ${updatedComponent.hd_size},
      ram_size = ${updatedComponent.ram_size},
      os_type = ${updatedComponent.os_type},
      room = ${updatedComponent.room},
      status = ${updatedComponent.status}
    WHERE
      id = ${ComponentId}
  `);

  try {
    await pool.query`${updateComponentQuery}`;
  } catch (err) {
    console.error(`Error updating component in the components table: ${err.message}`);
  }
};
  
const updatePersonnel = async (PersonnelId, updatedPersonnel) => {
  const updatePersonnelQuery = pool.query(`
    UPDATE personnel
    SET
      first_name = ${updatedPersonnel.first_name},
      last_name = ${updatedPersonnel.last_name},
      department = ${updatedPersonnel.department},
      role = ${updatedPersonnel.role},
      email_address = ${updatedPersonnel.email_address}
    WHERE
      id = ${PersonnelId}
  `);

  try {
    await pool.query`${updatePersonnelQuery}`;
  } catch (err) {
    console.error(`Error updating personnel: ${err.message}`);
  }
};

const updateLicense = async (LicenseId, updatedLicense) => {
  const updateLicenseQuery = pool.query(`
    UPDATE licenses
    SET
      product_name = ${updatedLicense.product_name},
      license_key = ${updatedLicense.license_key},
      expired = ${updatedLicense.expired}
    WHERE
      id = ${LicenseId}
  `);

  try {
    await pool.query`${updateLicenseQuery}`;
  } catch (err) {
    console.error(`Error updating license: ${err.message}`);
  }
};

const updateCategory = async (CategoryId, updatedCategory) => {
  const updateCategoryQuery = pool.query(`
    UPDATE categories
    SET
      name = ${updatedCategory.name},
      type = ${updatedCategory.type},
      description = ${updatedCategory.description}
    WHERE
      id = ${CategoryId}
  `);

  try {
    await pool.query`${updateCategoryQuery}`;
  } catch (err) {
    console.error(`Error updating category: ${err.message}`);
  }
};

const updateSupplier = async (SuppliersId, updatedSuppliers) => {
  const updateSuppliersQuery = pool.query(`
    UPDATE suppliers
    SET
      name = ${updatedSuppliers.name},
      address = ${updatedSuppliers.address},
      email = ${updatedSuppliers.email},
      phone = ${updatedSuppliers.phone},
      items = ${updatedSuppliers.items},
      quantity = ${updatedSuppliers.quantity}
    WHERE
      id = ${SuppliersId}
  `);

  try {
    await pool.query`${updateSuppliersQuery}`;
  } catch (err) {
    console.error(`Error updating supplier: ${err.message}`);
  }
};

const updateDepartment = async (DepartmentId, updatedDepartment) => {
  const updateDepartmentQuery = pool.query(`
    UPDATE department
    SET
      department = ${updatedDepartment.department},
      staff = ${updatedDepartment.staff}
    WHERE
      id = ${DepartmentId}
  `);

  try {
    await pool.query`${updateDepartmentQuery}`;
  } catch (err) {
    console.error(`Error updating department: ${err.message}`);
  }
};

const updateMaintenance = async (MaintenanceId, updatedMaintenance) => {
  const updateMaintenanceQuery = pool.query(`
    UPDATE maintenance
    SET
      item_name = ${updatedMaintenance.item_name},
      type = ${updatedMaintenance.type},
      maintenance_type = ${updatedMaintenance.maintenance_type}
    WHERE
      id = ${MaintenanceId}
  `);

  try {
    await pool.query`${updateMaintenanceQuery}`;
  } catch (err) {
    console.error(`Error updating maintenance: ${err.message}`);
  }
};

const updateChartData = async () => {
  try {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM components) AS component_count,
        (SELECT COUNT(*) FROM computers) AS computer_count,
        (SELECT COUNT(*) FROM accessories) AS accessory_count,
        (SELECT COUNT(*) FROM personnel) AS personnel_count,
        (SELECT COUNT(*) FROM licenses) AS license_count,
        (SELECT COUNT(*) FROM suppliers) AS supplier_count
    `);

    const { component_count, computer_count, accessory_count, personnel_count,
     license_count, supplier_count } = result.rows[0];

    await pool.query(`
      UPDATE chart_data
      SET component_count = $1,
          computer_count = $2,
          accessory_count = $3,
          personnel_count = $4,
          license_count = $5,
          supplier_count = $6
    `, [component_count, computer_count, accessory_count, personnel_count, license_count, supplier_count]);
  } catch (err) {
    console.error(`Error updating chart data: ${err.message}`);
  }
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