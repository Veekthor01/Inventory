const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'database.db');

// Check if the database file exists
if (!fs.existsSync(dbPath)) {
  console.error('Database file does not exist:', dbPath);
  return;
}

const db = new sqlite3.Database(dbPath);

function setupDatabase() {
  const db = new sqlite3.Database(dbPath);
  db.serialize(() => {
    // Check if the 'computers' table already exists
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='computers';",
      (err, row) => {
        if (err) {
          console.error('Error checking table existence:', err.message);
          return;
        }

        if (row) {
        } else {
          // If the table doesn't exist, create it
          db.run(`
            CREATE TABLE IF NOT EXISTS computers (
              id INTEGER PRIMARY KEY,
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
          `, (createErr) => {
            if (createErr) {
              console.error('Error creating "computers" table:', createErr.message);
            }
          });
        }
      }
    );

    // Check if the 'accessories' table already exists
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='accessories';",
      (err, row) => {
        if (err) {
          console.error('Error checking table existence:', err.message);
          return;
        }

        if (row) {
        } else {
          // If the table doesn't exist, create it

    db.run(`
      CREATE TABLE IF NOT EXISTS accessories (
        id INTEGER PRIMARY KEY,
        type TEXT NOT NULL,
        S_N TEXT,
        model TEXT,
        extension_no INTEGER,
        name TEXT,
        room TEXT
      )
    ` , (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      }
    });
  }
}
);

// Check if the 'components' table already exists
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='components';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it

    db.run(`
    CREATE TABLE IF NOT EXISTS components (
      id INTEGER PRIMARY KEY,
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
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);  

// Check if the 'personnel' table already exists
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='personnel';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it
  db.run(`
    CREATE TABLE IF NOT EXISTS personnel (
      id INTEGER PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      department TEXT,
      role TEXT,
      email_address TEXT
    )
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);

// Check if the 'licenses' table already exists
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='licenses';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it
  db.run(`
  CREATE TABLE IF NOT EXISTS licenses (
    id INTEGER PRIMARY KEY,
    product_name TEXT NOT NULL,
    license_key TEXT NOT NULL,
    expired TEXT NOT NULL
  );
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);

// Check if the 'categories' table already exists
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='categories';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it
  db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT
  );  
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);

// Check if the 'suppliers' table already exists
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='suppliers';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it

  db.run(`
  CREATE TABLE IF NOT EXISTS suppliers (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    email TEXT,
    phone TEXT,
    items TEXT,
    quantity INTEGER
  );
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
});


// Check if the 'department' table already exists
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='department';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it

  db.run(`
  CREATE TABLE IF NOT EXISTS department (
    id INTEGER PRIMARY KEY,
    department TEXT NOT NULL,
    staff INTEGER NOT NULL DEFAULT 0
  );
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);

// Check if the 'maintenance' table already exists
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='maintenance';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it

  db.run(`
  CREATE TABLE IF NOT EXISTS maintenance (
    id INTEGER PRIMARY KEY,
    item_name TEXT NOT NULL,
    type TEXT NOT NULL,
    maintenance_type TEXT NOT NULL
  );
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);

db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='recentActivity';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it

  db.run(`
  CREATE TABLE IF NOT EXISTS recentActivity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT,
    action TEXT,
    user TEXT,
    datetime TEXT
  );
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);

db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='chart_data';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it

  db.run(`
  CREATE TABLE IF NOT EXISTS chart_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    component_count INTEGER,
    computer_count INTEGER,
    accessory_count INTEGER,
    personnel_count INTEGER,
    license_count INTEGER,
    supplier_count INTEGER
  );
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);


db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='room_data';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }

    if (row) {
    } else {
      // If the table doesn't exist, create it

  db.run(`
  CREATE TABLE IF NOT EXISTS room_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room TEXT NOT NULL,
    computer TEXT,
    accessory TEXT,
    component TEXT
  );
  
  );
  ` , (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    }
  });
}
}
);

  });
  db.on('error', (err) => {
    console.error('Database error:', err.message);
  });

  return db;

}

db.close((err) => {
 if (err) {
    console.error('Error closing the database connection:', err.message);
 } else {
    console.log('Database connection closed.');
  }
});

module.exports = setupDatabase;
