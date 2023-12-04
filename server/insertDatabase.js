const { sql } = require('@vercel/postgres');

// Function to check if a table is empty
async function isTableEmpty(tableName) {
  const { rows } = await sql`SELECT EXISTS (SELECT 1 FROM ${tableName} LIMIT 1) AS "isEmpty"`;
  return rows[0].isEmpty === 0;
}

// Function to insert data into a table if it is empty
async function insertIfTableEmpty(tableName, insertQuery, newComputer) {
  const isEmpty = await isTableEmpty(tableName);
  if (isEmpty) {
    await sql`${insertQuery}`;
  }
  return newComputer;
};
  
// Example INSERT statements
const insertComputersQuery = sql`
  INSERT INTO computers (pc_sn, processor, hd_size, ram_size, kyb_name, mouse_name, monitor_name, monitor_sn, os_type, pc_name, room, status)
  VALUES 
    ('SW78901', 'Intel Xeon', '1TB', '32GB', 'Logitech', 'Logitech', 'Dell', 'MN1234', 'Ubuntu 20.04', 'EdulinkPC', 'Room 2.4', 'In Use'),
    ('RC23456', 'Intel i3', '256GB', '4GB', 'HP', 'HP', 'LG', 'MN8901', 'Windows 11', 'OfficePC', 'Room 2.5', 'Available'),
    ('BJ67892', 'Intel i7', '1TB', '16GB', 'Logitech', 'Microsoft', 'Dell', 'MN7890', 'Windows 10', 'OfficePC', 'Library', 'Available'),
    ('KE56709', 'Intel i5', '256GB', '4GB', 'HP', 'HP', 'LG', 'MN8901', 'Windows 11', 'OfficePC', 'Room 2.1', 'Available'),
    ('MP34561', 'AMD Ryzen 9', '2TB', '64GB', 'Logitech', 'Microsoft', 'Dell', 'MN6789', 'Ubuntu 20.04', 'ServerPC', 'Room 2.4', 'In Use'),
    ('RF67890', 'Intel Xeon', '512GB', '8GB', 'HP', 'HP', 'LG', 'MN5678', 'Ubuntu 20.04', 'Arena3DPC', 'Library', 'In Use'),
    ('IT12342', 'Intel i7', '1TB', '16GB', 'Logitech', 'Microsoft', 'Dell', 'MN7890', 'Windows 10', 'AptechPC', 'Room 2.2', 'Available'),
    ('MK78903', 'AMD Ryzen 5', '512GB', '8GB', 'HP', 'HP', 'LG', 'MN5678', 'Ubuntu 20.04', 'EdulinkPC', 'Room 2.5', 'In Use'),
    ('ST67897', 'Intel i7', '1TB', '16GB', 'Logitech', 'Microsoft', 'Dell', 'MN7890', 'Windows 10', 'OfficePC', 'Room 2.2', 'Available'),
    ('NO12341', 'AMD Ryzen 5', '512GB', '8GB', 'HP', 'HP', 'LG', 'MN5678', 'Ubuntu 20.04', 'EdulinkPC', 'Room 2.4', 'In Use'),
    ('OP23456', 'Intel i5 7', '1TB', '32GB', 'Logitech', 'Logitech', 'Dell', 'MN1234', 'Ubuntu 20.04', 'EdulinkPC', 'Room 2.1', 'In Use'),
    ('UI34562', 'AMD Ryzen 9', '2TB', '64GB', 'Logitech', 'Microsoft', 'Dell', 'MN6789', 'Ubuntu 20.04', 'EdulinkPC', 'Room 2.6', 'In Use'),
    ('UX67893', 'AMD Ryzen 5', '512GB', '8GB', 'HP', 'HP', 'LG', 'MN5678', 'Ubuntu 20.04', 'AptechPC', 'Room 2.6', 'In Use'),
    ('ZT12344', 'Intel i7', '1TB', '16GB', 'Logitech', 'Microsoft', 'Dell', 'MN7890', 'Windows 10', 'EdulinkPC', 'Room 2.1', 'Available'),
    ('AZ78906', 'Intel i5', '512GB', '8GB', 'HP', 'HP', 'LG', 'MN5678', 'Ubuntu 20.04', 'AptechPC', 'Library', 'In Use'),
    ('VN67894', 'Intel Xeon', '1TB', '16GB', 'Logitech', 'Microsoft', 'Dell', 'MN7890', 'Windows 10', 'OfficePC', 'Room 2.2', 'Available'),
    ('PI12346', 'Intel i3', '512GB', '8GB', 'HP', 'HP', 'LG', 'MN5678', 'Ubuntu 20.04', 'AptechPC', 'Room 2.5', 'In Use'),
    `;

    const insertTelephoneQuery = sql`
  INSERT INTO accessories (type, S_N, extension_no, name, room)
  VALUES ('Telephone', 'SN1234', 409, 'Cisco', 'Reception'),
        ('Telephone', 'SN2345', 500, 'Cisco', 'Staff Room'),
        ('Telephone', 'SN3456', 405, 'Cisco', 'Registrar Office'),
        ('Telephone', 'SN4567', 100, 'Cisco', 'Account Office'),
        ('Telephone', 'SN5678', 105, 'Cisco', 'HOD Office'),
        ('Telephone', 'SN6789', 110, 'Cisco', 'Admission Office'),
        ('Telephone', 'SN7890', 406, 'Cisco', 'Security Office'),
        ('Telephone', 'SN8901', 400, 'Cisco', 'Library')
        `;

    const insertProjectorQuery = sql`
    INSERT INTO accessories (type, S_N, model, name, room)
    VALUES ('Projector', 'VGWK4901142', 'EB-S18', 'Epson', 'Room 2.1'),
    ('Projector', 'VGWK4901122', 'EB-S19', 'Epson', 'Room 2.2'),
    ('Projector', 'VGWK4901273', 'EB-S22', 'Epson', 'Room 2.3'),
    ('Projector', 'V9WK4901140', 'EB-S09', 'Epson', 'Room 2.4'),
    ('Projector', 'VGWK4900286', 'EB-S14', 'Epson', 'Room 2.5'),
    ('Projector', 'VGWK4901272', 'EB-S08', 'Epson', 'Room 2.6');
    `;
    const insertPrinterQuery = sql`
    INSERT INTO accessories (type, S_N, name, room)
    VALUES  ('Printer', 'VNF8NO8038', 'HP LaserJet PRO', 'Account Office'),
        ('Printer', 'CNB7G5J7LV', 'HP LaserJet P1102', 'Registrar Office'),
        ('Printer', 'VNF3Q57709', 'HP LaserJet 200', 'Reception'),
        ('Printer', 'VNF8NO8038', 'HP LaserJet PRO', 'HOD Office')
        `;
    const insertTelevisionQuery = sql`
    INSERT INTO accessories (type, name, room)
    VALUES  ('Television', 'Samsung', 'Room 2.1'),
        ('Television', 'L.G', 'Room 2.3'),
        ('Television', 'L.G', 'Room 2.4'),
        ('Television', 'Samsung', 'Reception')
`;

const insertServerQuery = sql`
  INSERT INTO components (type, name, MAC_Address, S_N, model, processor, hd_size, ram_size, os_type, room, status)
  VALUES ('Server', 'EDULINK-APTECH', 'EC-B1-D7-F3-3F-49', 'CZ3452L118', 'HP RPOLIANT ML310e Gen8', 
  'INTEL XEON@3.10ghz 4 cores', '1TB', '24GB', 'WINDOWS SERVER 2012 R2 DATACENTER', 'Server Room', 'OK'),
        ('Server', 'EXAMSERVER', '40-A8-F0-27-F9-B8', 'CZ24410Z1X', 'HP PRO 3500 MT',
        'INTEL XEON@3.10ghz 4 cores', '500GB', '4GB', 'WINDOWS MULTIPONT SERVER 2012 ', 'Server Room', 'OK')
  `;      
        const insertSwitchesQuery = sql`
  INSERT INTO components (type, name, model, room)
  VALUES ('Switches', 'Cisco', 'CATALYST 2960 -24 port', 'Server Room'),
  ('Switches', 'CYBERROAM', 'CR200ING', 'Server Room'),
  ('Switches', 'Cisco', 'CATALYST 3850 -24 port', 'Server Room'),
  ('Switches', 'D-LINK', 'DWS-3160-24TC Gigabit Ethernet Switch', 'Server Room')
    `;
  const insertRoutersQuery = sql`
    INSERT INTO components (type, name, model, room)    
    VALUES ('Router', 'D-LINK', 'DWL-8600AP', 'Server Room'),
    ('Router', 'T-P LINK', 'TL-WA80LND', 'Server Room')
`;
const insertPersonnelQuery = sql`
    INSERT INTO personnel (first_name, last_name, department, role, email_address)    
    VALUES ('Benson', 'Gichamba', 'IT', 'IT Manager', 'b.gichamba@edulink.ac.ke'),
    ('Cynthia', 'Mongare', 'Public Relations', 'Social Media Manager', 'c.mongare@edulink.ac.ke'),
    ('Lucy', 'Ngotwa', 'Admissions Department', 'Admissions Counselor', 'l.ngotwa@edulink.ac.ke'),
    ('Natalie', 'Njuguna', 'Student Affairs Department', 'Counselor', 'n.njuguna@edulink.ac.ke'),
    ('Eunice', 'Khiya', 'Student Affairs Department', 'Administrative Assistant', 'e.khiya@edulink.ac.ke'),
    ('Timothy', 'Gatheru', 'Finance Department', 'Accountant', 't.gatheru@edulink.ac.ke'),
    ('Reney', 'Maramba', 'Library Department', 'Library Manager', 'r.maramba@edulink.ac.ke'),
    ('Kenneth', 'Mathiu', 'Software Engineering/Data Science', 'Lecturer', 'k.mathiu@edulink.ac.ke'),
    ('Nyanjui', 'Arthur', 'Software Engineering', 'Lecturer', 'n.arthur@edulink.ac.ke'),
    ('Dennis', 'Kuria', 'ICDL/Graphic Design/Animation', 'Lecturer', 'd.kuria@edulink.ac.ke'),
    ('Brian', 'Obuya', 'ICDL/Graphic Design/Animation', 'Lecturer', 'b.obuya@edulink.ac.ke'),
    ('Austin', 'Paul', 'Digital Marketing/Data Science', 'Lecturer', 'a.paul@edulink.ac.ke'),
    ('Lilian', 'Nzaka', 'Maintenance', 'Caretaker', 'l.nzaka@edulink.ac.ke'),
    ('Francis', 'Wenani', 'Transport Department', 'Driver', 'f.wenani@edulink.ac.ke')
`;

const insertLicenseQuery = sql`
INSERT INTO licenses (product_name, license_key, expired)
VALUES ('Microsoft Windows', 'E34DK-EI843-393J3-MSEU4-1USHU', 'No'),
    ('SmartOffice Professional', 'QWER-ASDF-ZXCV-1234', 'No'),
    ('MegaTool Deluxe Suite', 'PLMN-9876-UIOP-ASDF', 'No')
`;

const insertCategoryQuery = sql`
INSERT INTO categories (name, type, description)
SELECT name, type, 'Accessories' AS description FROM accessories
UNION ALL
SELECT name, type, 'Components' AS description FROM components;
`;

const insertSupplierQuery = sql`
INSERT INTO suppliers (name, address, email, phone, items, quantity)
VALUES
  ('ABC Electronics', '123 Main Street, Cityville', 'abc@example.com', '+1234567890', 'Computers',30),
  ('XYZ Tech Solutions', '456 Park Avenue, Townsville', 'info@xyztech.com', '+9876543210', 'Projectors', 6),
  ('Globe Gadgets Inc.', '789 Market Road, Villageland', 'sales@globegadgets.com', '+1112223334', 'Telephones', 8),
  ('TechMaster Accessories', '555 Tech Street, Techville', 'support@techmaster.com', '+4445556667', 'Printers', 4),
  ('Mega Supplies Co.', '999 Business Boulevard, Citytown', 'contact@megaco.com', '+7778889990', 'Televisions', 4);
`;

const insertDepartmentQuery = sql`
INSERT INTO department (department, staff)
SELECT department, COUNT(*) AS staff
FROM personnel
GROUP BY department;
`;

const insertMaintenanceQuery = sql`
INSERT INTO maintenance (item_name, type, maintenance_type)
VALUES
  ('Cisco Router', 'Component', 'Repair'),
  ('HP Printer', 'Accessory', 'Update'),
  ('Dell Computer', 'Computer', 'Repair'),
  ('Epson Projector', 'Accessory', 'Maintenance'),
  ('Server Rack', 'Component', 'Update');
`;

const insertActivity = sql`
    INSERT INTO recent_activity (item, action, user, datetime) 
    VALUES (?, ?, ?, ?);
    `;
    

    const insertChart = sql`
  INSERT INTO chart_data (component_count, computer_count, accessory_count, 
    personnel_count, license_count, supplier_count)
  SELECT
    (SELECT COUNT(*) FROM components) AS component_count,
    (SELECT COUNT(*) FROM computers) AS computer_count,
    (SELECT COUNT(*) FROM accessories) AS accessory_count,
    (SELECT COUNT(*) FROM personnel) AS personnel_count,
    (SELECT COUNT(*) FROM licenses) AS license_count,
    (SELECT COUNT(*) FROM suppliers) AS supplier_count;
`;

const insertComputerRoomQuery = sql`
  INSERT INTO room_data (room, computer)
  SELECT DISTINCT room, 'computer' FROM computers
`;

const insertAccessoryRoomQuery = sql`
  INSERT INTO room_data (room, accessory)
  SELECT DISTINCT room, type FROM accessories
`;

const insertComponentRoomQuery = sql`
  INSERT INTO room_data (room, component)
  SELECT DISTINCT room, type FROM components
`;


// Insert data into the tables if they are empty
insertIfTableEmpty('computers', insertComputersQuery);
insertIfTableEmpty('accessories', insertTelephoneQuery);
insertIfTableEmpty('accessories', insertProjectorQuery);
insertIfTableEmpty('accessories', insertPrinterQuery);
insertIfTableEmpty('accessories', insertTelevisionQuery);
insertIfTableEmpty('components', insertServerQuery);
insertIfTableEmpty('components', insertSwitchesQuery);
insertIfTableEmpty('components', insertRoutersQuery);
insertIfTableEmpty('personnel', insertPersonnelQuery);
insertIfTableEmpty('licenses', insertLicenseQuery);
insertIfTableEmpty('categories', insertCategoryQuery);
insertIfTableEmpty('suppliers', insertSupplierQuery);
insertIfTableEmpty('department', insertDepartmentQuery);
insertIfTableEmpty('maintenance', insertMaintenanceQuery);
insertIfTableEmpty('recentActivity', insertActivity);
insertIfTableEmpty('chart_data', insertChart);
insertIfTableEmpty('room_data', insertComputerRoomQuery);
insertIfTableEmpty('room_data', insertAccessoryRoomQuery);
insertIfTableEmpty('room_data', insertComponentRoomQuery);

  module.exports = {
    insertIfTableEmpty,
  };