const { sql } = require('@vercel/postgres');

const updateComputer = async (computerId, updatedComputer) => {
  const updateComputerQuery = sql`
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
  `;

  try {
    await sql`${updateComputerQuery}`;
  } catch (err) {
    console.error(`Error updating computer in the computers table: ${err.message}`);
  }
};

const updateAccessory = async (AccessoryId, updatedAccessory) => {
  const updateAccessoryQuery = sql`
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
  `;

  try {
    await sql`${updateAccessoryQuery}`;
  } catch (err) {
    console.error(`Error updating accessory in the accessories table: ${err.message}`);
  }
};
  
const updateComponent = async (ComponentId, updatedComponent) => {
  const updateComponentQuery = sql`
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
  `;

  try {
    await sql`${updateComponentQuery}`;
  } catch (err) {
    console.error(`Error updating component in the components table: ${err.message}`);
  }
};
  
const updatePersonnel = async (PersonnelId, updatedPersonnel) => {
  const updatePersonnelQuery = sql`
    UPDATE personnel
    SET
      first_name = ${updatedPersonnel.first_name},
      last_name = ${updatedPersonnel.last_name},
      department = ${updatedPersonnel.department},
      role = ${updatedPersonnel.role},
      email_address = ${updatedPersonnel.email_address}
    WHERE
      id = ${PersonnelId}
  `;

  try {
    await sql`${updatePersonnelQuery}`;
  } catch (err) {
    console.error(`Error updating personnel: ${err.message}`);
  }
};

const updateLicense = async (LicenseId, updatedLicense) => {
  const updateLicenseQuery = sql`
    UPDATE licenses
    SET
      product_name = ${updatedLicense.product_name},
      license_key = ${updatedLicense.license_key},
      expired = ${updatedLicense.expired}
    WHERE
      id = ${LicenseId}
  `;

  try {
    await sql`${updateLicenseQuery}`;
  } catch (err) {
    console.error(`Error updating license: ${err.message}`);
  }
};

const updateCategory = async (CategoryId, updatedCategory) => {
  const updateCategoryQuery = sql`
    UPDATE categories
    SET
      name = ${updatedCategory.name},
      type = ${updatedCategory.type},
      description = ${updatedCategory.description}
    WHERE
      id = ${CategoryId}
  `;

  try {
    await sql`${updateCategoryQuery}`;
  } catch (err) {
    console.error(`Error updating category: ${err.message}`);
  }
};

const updateSupplier = async (SuppliersId, updatedSuppliers) => {
  const updateSuppliersQuery = sql`
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
  `;

  try {
    await sql`${updateSuppliersQuery}`;
  } catch (err) {
    console.error(`Error updating supplier: ${err.message}`);
  }
};

const updateDepartment = async (DepartmentId, updatedDepartment) => {
  const updateDepartmentQuery = sql`
    UPDATE department
    SET
      department = ${updatedDepartment.department},
      staff = ${updatedDepartment.staff}
    WHERE
      id = ${DepartmentId}
  `;

  try {
    await sql`${updateDepartmentQuery}`;
  } catch (err) {
    console.error(`Error updating department: ${err.message}`);
  }
};

const updateMaintenance = async (MaintenanceId, updatedMaintenance) => {
  const updateMaintenanceQuery = sql`
    UPDATE maintenance
    SET
      item_name = ${updatedMaintenance.item_name},
      type = ${updatedMaintenance.type},
      maintenance_type = ${updatedMaintenance.maintenance_type}
    WHERE
      id = ${MaintenanceId}
  `;

  try {
    await sql`${updateMaintenanceQuery}`;
  } catch (err) {
    console.error(`Error updating maintenance: ${err.message}`);
  }
};

const updateChartData = async () => {
  const selectCountsQuery = sql`
    SELECT
      (SELECT COUNT(*) FROM components) AS component_count,
      (SELECT COUNT(*) FROM computers) AS computer_count,
      (SELECT COUNT(*) FROM accessories) AS accessory_count,
      (SELECT COUNT(*) FROM personnel) AS personnel_count,
      (SELECT COUNT(*) FROM licenses) AS license_count,
      (SELECT COUNT(*) FROM suppliers) AS supplier_count;
  `;

  try {
    const result = await sql`${selectCountsQuery}`;
    const { component_count, computer_count, accessory_count, personnel_count,
     license_count, supplier_count } = result.rows[0];

    const updateQuery = sql`
      UPDATE chart_data
      SET component_count = ${component_count},
          computer_count = ${computer_count},
          accessory_count = ${accessory_count},
          personnel_count = ${personnel_count},
          license_count = ${license_count},
          supplier_count = ${supplier_count};
    `;

    await sql`${updateQuery}`;
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