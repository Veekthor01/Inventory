const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const createComputer = (newComputer) => {
  const insertComputersQuery = `
    INSERT INTO computers (pc_sn, processor, hd_size, ram_size, kyb_name, mouse_name, monitor_name, monitor_sn, os_type, pc_name, room, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
 
  db.run(
    insertComputersQuery,
    [
      newComputer.pc_sn,
      newComputer.processor,
      newComputer.hd_size,
      newComputer.ram_size,
      newComputer.kyb_name,
      newComputer.mouse_name,
      newComputer.monitor_name,
      newComputer.monitor_sn,
      newComputer.os_type,
      newComputer.pc_name,
      newComputer.room,
      newComputer.status,
    ],
    function (err) {
      if (err) {
        console.error(`Error inserting data into the computers table: ${err.message}`);
      } 
    }
  );

};


const createAccessory = (newAccessory) => {
  if (newAccessory.type === 'Telephone') {
    const insertTelephoneQuery = `
      INSERT INTO accessories (type, S_N, extension_no, name, room)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      insertTelephoneQuery,
      [
        newAccessory.type,
        newAccessory.S_N,
        newAccessory.extension_no,
        newAccessory.name,
        newAccessory.room,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the accessories table: ${err.message}`);
        } 
      }
    );
    
  } else if (newAccessory.type === 'Projector') {
    const insertProjectorQuery = `
      INSERT INTO accessories (type, S_N, model, name, room)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
      insertProjectorQuery,
      [
        newAccessory.type,
        newAccessory.S_N,
        newAccessory.model,
        newAccessory.name,
        newAccessory.room,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the accessories table: ${err.message}`);
        } 
      }
    );
  
  } else if (newAccessory.type === 'Printer') {
    const insertPrinterQuery = `
      INSERT INTO accessories (type, S_N, name, room)
      VALUES (?, ?, ?, ?)
    `;

    db.run(
      insertPrinterQuery,
      [
        newAccessory.type,
        newAccessory.S_N,
        newAccessory.name,
        newAccessory.room,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the accessories table: ${err.message}`);
        } 
      }
    );
    
  } else if (newAccessory.type === 'Television') {
    const insertTelevisionQuery = `
      INSERT INTO accessories (type, name, room)
      VALUES (?, ?, ?)
    `;

    db.run(
      insertTelevisionQuery,
      [
        newAccessory.type,
        newAccessory.name,
        newAccessory.room,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the accessories table: ${err.message}`);
        } 
      }
    );
    
  } else {
    console.error('Invalid accessory type.');
  }
};

const createComponent = (newComponent) => {

  if (newComponent.type === 'Server') {
    const insertServerQuery = `
      INSERT INTO components (type, name, MAC_Address, S_N, model, processor, hd_size, ram_size, os_type, room, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      insertServerQuery,
      [
        newComponent.type,
        newComponent.name,
        newComponent.MAC_Address,
        newComponent.S_N,
        newComponent.model,
        newComponent.processor,
        newComponent.hd_size,
        newComponent.ram_size,
        newComponent.os_type,
        newComponent.room,
        newComponent.status,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the components table: ${err.message}`);
        } 
      }
    );
    
  } else if (newComponent.type === 'Switches') {
    const insertSwitchesQuery = `
      INSERT INTO components (type, name, model, room)
      VALUES (?, ?, ?, ?)
    `;

    db.run(
      insertSwitchesQuery,
      [
        newComponent.type,
        newComponent.name,
        newComponent.model,
        newComponent.room,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the components table: ${err.message}`);
        }
      }
    );
    
  } else if (newAccessory.type === 'Router') {
    const insertRoutersQuery = `
      INSERT INTO components (type, name, model, room)
      VALUES (?, ?, ?, ?)
    `;

    db.run(
      insertRoutersQuery,
      [
        newComponent.type,
        newComponent.name,
        newComponent.model,
        newComponent.room,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the components table: ${err.message}`);
        }
      }
    );
    
  } 
  else {
    console.error('Invalid component type.');
    
  }
  };

  const createPersonnel = (newpersonnel) => {

    const insertPersonnelQuery = `
      INSERT INTO personnel (first_name, last_name, department, role, email_address)
      VALUES (?, ?, ?, ?, ?)
    `;
  
    db.run(
      insertPersonnelQuery,
      [
        newpersonnel.first_name,
        newpersonnel.last_name,
        newpersonnel.department,
        newpersonnel.role,
        newpersonnel.email_address,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the personnel table: ${err.message}`);
        }
      }
    );
    
  };

  const createLicense = (newLicense) => {

    const insertLicenseQuery = `
      INSERT INTO licenses (product_name, license_key, expired)
      VALUES (?, ?, ?)
    `;
  
    db.run(
      insertLicenseQuery,
      [
        newLicense.product_name,
        newLicense.license_key,
        newLicense.expired,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the license table: ${err.message}`);
        }
      }
    );
    
  };


  const createCategory = (newCategory) => {

    const insertCategoryQuery = `
      INSERT INTO categories (name, type, description)
      VALUES (?, ?, ?)
    `;
  
    db.run(
      insertCategoryQuery,
      [
        newCategory.name,
        newCategory.type,
        newCategory.description,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the category table: ${err.message}`);
        }
      }
    );
    
  };

  const createSupplier = (newSuppliers) => {

    const insertSupplierQuery = `
      INSERT INTO suppliers (name, address, email, phone, items, quantity)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    db.run(
      insertSupplierQuery,
      [
        newSuppliers.name,
        newSuppliers.address,
        newSuppliers.email,
        newSuppliers.phone,
        newSuppliers.items,
        newSuppliers.quantity,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the suppliers table: ${err.message}`);
        }
      }
    );
    
  };

  const createDepartment = (newDepartment) => {

    const insertDepartmentQuery = `
      INSERT INTO department (department, staff)
      VALUES (?, ?)
    `;
  
    db.run(
      insertDepartmentQuery,
      [
        newDepartment.department,
        newDepartment.staff,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the department table: ${err.message}`);
        }
      }
    );
    
  };

  const createMaintenance = (newMaintenance) => {

    const insertMaintenanceQuery = `
      INSERT INTO maintenance (item_name, type, maintenance_type)
      VALUES (?, ?, ?)
    `;
  
    db.run(
      insertMaintenanceQuery,
      [
        newMaintenance.item_name,
        newMaintenance.type,
        newMaintenance.maintenance_type,
      ],
      function (err) {
        if (err) {
          console.error(`Error inserting data into the maintenance table: ${err.message}`);
        }
      }
    );
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
