const { sql } = require('@vercel/postgres');

async function setupDatabase() {
  // Check if the 'computers' table already exists
  const { rows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'computers'
      )
  `;
  if (rows[0].exists) {
    console.log('Table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE computers (
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
    `;
    console.log('Table created');
  }

    // Check if the 'accessories' table already exists
    const { rows: accessoriesRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'accessories'
      )
  `;
  if (accessoriesRows[0].exists) {
    console.log('Accessories table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE accessories (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        s_n TEXT,
        model TEXT,
        extension_no INTEGER,
        name TEXT
      )
    `;
    console.log('Accessories table created');
  }

// Check if the 'components' table already exists
const { rows: componentsRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'components'
      )
  `;

  if (componentsRows[0].exists) {
    console.log('Components table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE components (
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
    `;
    console.log('Components table created');
  }

// Check if the 'personnel' table already exists
const { rows: personnelRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'personnel'
      )
  `;

  if (personnelRows[0].exists) {
    console.log('Personnel table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE personnel (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      department TEXT,
      role TEXT,
      email_address TEXT
    )
    `;
    console.log('Personnel table created');
  }

// Check if the 'licenses' table already exists
const { rows: licensesRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'licenses'
      )
  `;

  if (licensesRows[0].exists) {
    console.log('Licenses table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE licenses (
        id SERIAL PRIMARY KEY,
        product_name TEXT NOT NULL,
        license_key TEXT NOT NULL,
        expired TEXT NOT NULL
      )
    `;
    console.log('Licenses table created');
  }

// Check if the 'categories' table already exists
const { rows: categoriesRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'categories'
      )
  `;

  if (categoriesRows[0].exists) {
    console.log('Categories table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT
  );  
  `;
    console.log('Categories table created');
  }

// Check if the 'suppliers' table already exists
const { rows: suppliersRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'suppliers'
      )
  `;

  if (suppliersRows[0].exists) {
    console.log('Suppliers table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE suppliers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        email TEXT,
        phone TEXT,
        items TEXT,
        quantity INTEGER
      )
    `;
    console.log('Suppliers table created');
  }

// Check if the 'department' table already exists
const { rows: departmentRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'department'
      )
  `;

  if (departmentRows[0].exists) {
    console.log('Department table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE department (
        id SERIAL PRIMARY KEY,
        department TEXT NOT NULL,
        staff INTEGER NOT NULL DEFAULT 0
      )
    `;
    console.log('Department table created');
  }

// Check if the 'maintenance' table already exists
const { rows: maintenanceRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'maintenance'
      )
  `;

  if (maintenanceRows[0].exists) {
    console.log('Maintenance table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE maintenance (
    id INTEGER PRIMARY KEY,
    item_name TEXT NOT NULL,
    type TEXT NOT NULL,
    maintenance_type TEXT NOT NULL
  );
  `;
  console.log('Maintenance table created');
}

const { rows: recentActivityRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'recentActivity'
      )
  `;

  if (recentActivityRows[0].exists) {
    console.log('RecentActivity table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE recentActivity (
        id SERIAL PRIMARY KEY,
        item TEXT,
        action TEXT,
        user TEXT,
        datetime TEXT
      )
    `;
    console.log('RecentActivity table created');
  }

  const { rows: chartDataRows } = await sql`
  SELECT 
    EXISTS (
      SELECT FROM information_schema.tables 
      WHERE  table_schema = 'public'
      AND    table_name   = 'chart_data'
    )
`;

if (chartDataRows[0].exists) {
  console.log('Chart_data table already exists');
} else {
  // If the table doesn't exist, create it
  await sql`
    CREATE TABLE chart_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    component_count INTEGER,
    computer_count INTEGER,
    accessory_count INTEGER,
    personnel_count INTEGER,
    license_count INTEGER,
    supplier_count INTEGER
  );
  `;
  console.log('Chart_data table created');
}

const { rows: roomDataRows } = await sql`
    SELECT 
      EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name   = 'room_data'
      )
  `;

  if (roomDataRows[0].exists) {
    console.log('Room_data table already exists');
  } else {
    // If the table doesn't exist, create it
    await sql`
      CREATE TABLE room_data (
        id SERIAL PRIMARY KEY,
        room TEXT NOT NULL,
        computer TEXT,
        accessory TEXT,
        component TEXT
      )
    `;
    console.log('Room_data table created');
  }
};

  sql.on('error', (err) => {
    console.error('Database error:', err.message);
  });

module.exports = setupDatabase;