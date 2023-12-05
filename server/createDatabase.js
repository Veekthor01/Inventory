const { pool } = require('./db');

async function setupDatabase() {
  // check if the 'computers' table exists
  const computerResult = await pool.query(`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_name = 'computers'
    )
  `);
  // if the 'computers' table doesn't exist, create it
  if (!computerResult.rows[0].exists) {
  await pool.query(`
  CREATE TABLE IF NOT EXISTS computers (
    id SERIAL PRIMARY KEY,
    pc_sn TEXT NOT NULL,
    processor TEXT,
    hd_size TEXT,
    ram_size TEXT,
    kyb_name TEXT,
    mouse_name TEXT,
    monitor_name TEXT,
    monitor_sn TEXT,
    os_type TEXT,
    pc_name TEXT,
    room TEXT,
    status TEXT
  )
`);
console.log('Computer Table created');
} else {
  console.log('Computer Table already exists');
}


// Check if the 'accessories' table exists
const accessoryResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'accessories'
  )
`);

// If the 'accessories' table doesn't exist, create it
if (!accessoryResult.rows[0].exists) {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS accessories (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        s_n TEXT,
        model TEXT,
        extension_no INTEGER,
        name TEXT,
        room TEXT
      )
    `);
    console.log('Accessories table created');
}else {
  console.log('Accessories table already exists');
}
  
// Check if the 'components' table exists
const componentResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'components'
  )
`);
  
// If the 'components' table doesn't exist, create it
if (!componentResult.rows[0].exists) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS components (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        name TEXT,
        MAC_Address TEXT,
        S_N TEXT,
        model TEXT,
        processor TEXT,
        hd_size TEXT,
        ram_size TEXT,
        os_type TEXT,
        room TEXT,
        status TEXT
      )
    `);
    console.log('Components table created');
}else {
  console.log('Components table already exists');
}

// Check if the 'personnel' table exists
const personnelResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'personnel'
  )
`);
// If the 'personnel' table doesn't exist, create it
if (!personnelResult.rows[0].exists) {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS personnel (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      department TEXT,
      role TEXT,
      email_address TEXT
    )
    `);
    console.log('Personnel table created');
}else {
  console.log('Personnel table already exists');
}

// Check if the 'licenses' table exists
const licenseResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'licenses'
  )
`);
// If the 'licenses' table doesn't exist, create it
if (!licenseResult.rows[0].exists) {
await pool.query(`
      CREATE TABLE IF NOT EXISTS licenses (
        id SERIAL PRIMARY KEY,
        product_name TEXT NOT NULL,
        license_key TEXT NOT NULL,
        expired TEXT NOT NULL
      )
    `);
    console.log('Licenses table created');
  }else {
        console.log('Licenses table already exists');
      }

// Check if the 'categories' table exists
const categoryResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'categories'
  )
`);
// If the 'categories' table doesn't exist, create it
if (!categoryResult.rows[0].exists) {
await pool.query(`
  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT
  );  
  `);
    console.log('Categories table created'); 
  }else {
    console.log('Categories table already exists');
  }

// Check if the 'suppliers' table exists
const supplierResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'suppliers'
  )
`);
// If the 'suppliers' table doesn't exist, create it
if (!supplierResult.rows[0].exists) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS suppliers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        email TEXT,
        phone TEXT,
        items TEXT,
        quantity INTEGER
      )
    `);
    console.log('Suppliers table created');
  }
  else {
    console.log('Suppliers table already exists');
  }
  
// Check if the 'department' table exists
const departmentResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'department'
  )
`);
// If the 'department' table doesn't exist, create it
if (!departmentResult.rows[0].exists) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS department (
        id SERIAL PRIMARY KEY,
        department TEXT NOT NULL,
        staff INTEGER NOT NULL DEFAULT 0
      )
    `);
    console.log('Department table created');
  }
  else {
    console.log('Department table already exists');
  }
  
// Check if the 'maintenance' table exists
const maintenanceResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'maintenance'
  )
`);
// If the 'maintenance' table doesn't exist, create it
if (!maintenanceResult.rows[0].exists) {
  await pool.query(`
  CREATE TABLE IF NOT EXISTS maintenance (
    id SERIAL PRIMARY KEY,
    item_name TEXT NOT NULL,
    type TEXT NOT NULL,
    maintenance_type TEXT NOT NULL
  );
  `);
  console.log('Maintenance table created'); 
}
else {
  console.log('Maintenance table already exists');
}

// Check if the 'recentActivity' table exists
const recentActivityResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'recentActivity'
  )
`);
// If the 'recentActivity' table doesn't exist, create it
if (!recentActivityResult.rows[0].exists) {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recentActivity (
        id SERIAL PRIMARY KEY,
        item TEXT,
        action TEXT,
        account TEXT,
        datetime TEXT
      )
    `);
    console.log('RecentActivity table created');
  }
  else {
    console.log('RecentActivity table already exists');
  }

// Check if the 'chart_data' table exists
const chartDataResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'chart_data'
  )
`);
// If the 'chart_data' table doesn't exist, create it
if (!chartDataResult.rows[0].exists) {
await pool.query(`
CREATE TABLE IF NOT EXISTS chart_data (
id SERIAL PRIMARY KEY,
component_count INTEGER,
computer_count INTEGER,
accessory_count INTEGER,
personnel_count INTEGER,
license_count INTEGER,
supplier_count INTEGER
);
`);
console.log('Chart_data table created');
} else {
console.log('Chart_data table already exists');
}

// Check if the 'room_data' table exists
const roomDataResult = await pool.query(`
  SELECT EXISTS (
    SELECT FROM information_schema.tables
    WHERE table_name = 'room_data'
  )
`);
// If the 'room_data' table doesn't exist, create it
if (!roomDataResult.rows[0].exists) {
await pool.query(`
      CREATE TABLE IF NOT EXISTS room_data (
        id SERIAL PRIMARY KEY,
        room TEXT NOT NULL,
        computer TEXT,
        accessory TEXT,
        component TEXT
      )
    `);
    console.log('Room_data table created');
  }
  else {
    console.log('Room_data table already exists');
  }

 };

module.exports = setupDatabase;