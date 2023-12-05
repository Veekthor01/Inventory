const { pool } = require('./db');

const createComputer = async (newComputer) => {
  const insertComputersQuery = pool.query(`
    INSERT INTO computers (pc_sn, processor, hd_size, ram_size, kyb_name, mouse_name, monitor_name, monitor_sn, os_type, pc_name, room, status)
    VALUES (
      ${newComputer.pc_sn},
      ${newComputer.processor},
      ${newComputer.hd_size},
      ${newComputer.ram_size},
      ${newComputer.kyb_name},
      ${newComputer.mouse_name},
      ${newComputer.monitor_name},
      ${newComputer.monitor_sn},
      ${newComputer.os_type},
      ${newComputer.pc_name},
      ${newComputer.room},
      ${newComputer.status}
    )
  `);

  try {
    await pool.query`${insertComputersQuery}`;
  } catch (err) {
    console.error(`Error inserting data into the computers table: ${err.message}`);
  }
};

const createAccessory = async (newAccessory) => {
  if (newAccessory.type === 'Telephone') {
    const insertTelephoneQuery = pool.query(`
      INSERT INTO accessories (type, S_N, extension_no, name, room)
      VALUES (
        ${newAccessory.type},
        ${newAccessory.S_N},
        ${newAccessory.extension_no},
        ${newAccessory.name},
        ${newAccessory.room}
      )
    `);

    try {
      await pool.query`${insertTelephoneQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the accessories table: ${err.message}`);
    }
  } else if (newAccessory.type === 'Projector') {
    const insertProjectorQuery = pool.query(`
      INSERT INTO accessories (type, S_N, model, name, room)
      VALUES (
        ${newAccessory.type},
        ${newAccessory.S_N},
        ${newAccessory.model},
        ${newAccessory.name},
        ${newAccessory.room}
      )
    `);

    try {
      await pool.query`${insertProjectorQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the accessories table: ${err.message}`);
    }
  
  } else if (newAccessory.type === 'Printer') {
    const insertPrinterQuery = pool.query(`
      INSERT INTO accessories (type, S_N, name, room)
      VALUES (
        ${newAccessory.type},
        ${newAccessory.S_N},
        ${newAccessory.name},
        ${newAccessory.room}
      )
    `);

    try {
      await pool.query`${insertPrinterQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the accessories table: ${err.message}`);
    }
    
  } else if (newAccessory.type === 'Television') {
    const insertTelevisionQuery = pool.query(`
      INSERT INTO accessories (type, name, room)
      VALUES (
        ${newAccessory.type},
        ${newAccessory.name},
        ${newAccessory.room}
      )
    `);

    try {
      await pool.query`${insertTelevisionQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the accessories table: ${err.message}`);
    }
    
  } else {
    console.error('Invalid accessory type.');
  }
};

const createComponent = async (newComponent) => {

  if (newComponent.type === 'Server') {
    const insertServerQuery = pool.query(`
      INSERT INTO components (type, name, MAC_Address, S_N, model, processor, hd_size, ram_size, os_type, room, status)
      VALUES (
        ${newComponent.type},
        ${newComponent.name},
        ${newComponent.MAC_Address},
        ${newComponent.S_N},
        ${newComponent.model},
        ${newComponent.processor},
        ${newComponent.hd_size},
        ${newComponent.ram_size},
        ${newComponent.os_type},
        ${newComponent.room},
        ${newComponent.status}
      )
    `); 

    try {
      await pool.query`${insertServerQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the components table: ${err.message}`);
    }
    
  } else if (newComponent.type === 'Switches') {
    const insertSwitchesQuery = pool.query(`
      INSERT INTO components (type, name, model, room)
      VALUES (
        ${newComponent.type},
        ${newComponent.name},
        ${newComponent.model},
        ${newComponent.room}
      )
    `);

    try {
      await pool.query`${insertSwitchesQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the components table: ${err.message}`);
    }
    
  } else if (newAccessory.type === 'Router') {
    const insertRoutersQuery = pool.query(`
      INSERT INTO components (type, name, model, room)
      VALUES (
        ${newComponent.type},
        ${newComponent.name},
        ${newComponent.model},
        ${newComponent.room}
      )
    `);
    try {
      await pool.query`${insertRoutersQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the components table: ${err.message}`);
    }
    
  } else {
    console.error('Invalid component type.');
    
  }
  };

  const createPersonnel = async (newPersonnel) => {
    const insertPersonnelQuery = pool.query(`
      INSERT INTO personnel (first_name, last_name, department, role, email_address)
      VALUES (
        ${newPersonnel.first_name},
        ${newPersonnel.last_name},
        ${newPersonnel.department},
        ${newPersonnel.role},
        ${newPersonnel.email_address}
      )
    `);
  
    try {
      await pool.query`${insertPersonnelQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the personnel table: ${err.message}`);
    }
  };
  
  const createLicense = async (newLicense) => {
    const insertLicenseQuery = pool.query(`
      INSERT INTO licenses (product_name, license_key, expired)
      VALUES (
        ${newLicense.product_name},
        ${newLicense.license_key},
        ${newLicense.expired}
      )
    `);
  
    try {
      await pool.query`${insertLicenseQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the licenses table: ${err.message}`);
    }
  };

  const createCategory = async (newCategory) => {
    const insertCategoryQuery = pool.query(`
      INSERT INTO categories (name, type, description)
      VALUES (
        ${newCategory.name},
        ${newCategory.type},
        ${newCategory.description}
      )
    `);
  
    try {
      await pool.query`${insertCategoryQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the categories table: ${err.message}`);
    }
  };
  
  const createSupplier = async (newSuppliers) => {
    const insertSupplierQuery = pool.query(`
      INSERT INTO suppliers (name, address, email, phone, items, quantity)
      VALUES (
        ${newSuppliers.name},
        ${newSuppliers.address},
        ${newSuppliers.email},
        ${newSuppliers.phone},
        ${newSuppliers.items},
        ${newSuppliers.quantity}
      )
    `);
  
    try {
      await pool.query`${insertSupplierQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the suppliers table: ${err.message}`);
    }
  };

  const createDepartment = async (newDepartment) => {
    const insertDepartmentQuery = pool.query(`
      INSERT INTO department (department, staff)
      VALUES (
        ${newDepartment.department},
        ${newDepartment.staff}
      )
    `);
  
    try {
      await pool.query`${insertDepartmentQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the department table: ${err.message}`);
    }
  };
  
  const createMaintenance = async (newMaintenance) => {
    const insertMaintenanceQuery = pool.query(`
      INSERT INTO maintenance (item_name, type, maintenance_type)
      VALUES (
        ${newMaintenance.item_name},
        ${newMaintenance.type},
        ${newMaintenance.maintenance_type}
      )
    `);
  
    try {
      await pool.query`${insertMaintenanceQuery}`;
    } catch (err) {
      console.error(`Error inserting data into the maintenance table: ${err.message}`);
    }
  };


module.exports = {
  createComputer,
  createAccessory,
  createComponent,
  createPersonnel,
  createLicense,
  createCategory,
  createSupplier,
  createDepartment,
  createMaintenance,
};