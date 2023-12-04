const { sql } = require('@vercel/postgres');

async function setupDatabase() {
  // Create the 'computers' table
  await sql`
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
`;
console.log('Table created or already exists');

// Create the 'accessories' table
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

    // Create the 'components' table
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

// Create the 'personnel' table
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

// Create the 'licenses' table
await sql`
      CREATE TABLE licenses (
        id SERIAL PRIMARY KEY,
        product_name TEXT NOT NULL,
        license_key TEXT NOT NULL,
        expired TEXT NOT NULL
      )
    `;
    console.log('Licenses table created');

    // Create the 'categories' table
await sql`
      CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT
  );  
  `;
    console.log('Categories table created');

    // Create the 'suppliers' table
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
  
// Create the 'department' table
    await sql`
      CREATE TABLE department (
        id SERIAL PRIMARY KEY,
        department TEXT NOT NULL,
        staff INTEGER NOT NULL DEFAULT 0
      )
    `;
    console.log('Department table created');
  }

// Create the 'maintenance' table
    await sql`
      CREATE TABLE maintenance (
    id INTEGER PRIMARY KEY,
    item_name TEXT NOT NULL,
    type TEXT NOT NULL,
    maintenance_type TEXT NOT NULL
  );
  `;
  console.log('Maintenance table created');

  // Create the 'recentActivity' table
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

// Create the 'chart_data' table
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

  // Create the 'room_data' table
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

  sql.on('error', (err) => {
    console.error('Database error:', err.message);
  });

module.exports = setupDatabase;