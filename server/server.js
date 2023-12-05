const http = require('http');
const url = require('url');
const { pool } = require('./db');
const setupDatabase = require('./createDatabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { createComputer } = require('./post');
const { createAccessory } = require('./post');
const { createComponent } = require('./post');
const { createPersonnel } = require('./post');
const { createLicense } = require('./post');
const { createCategory } = require('./post');
const { createSupplier } = require('./post');
const { createDepartment } = require('./post');
const { createMaintenance } = require('./post');
const { updateComputer } = require('./put');
const { updateAccessory } = require('./put');
const { updateComponent } = require('./put');
const { updatePersonnel } = require('./put');
const { updateLicense } = require('./put');
const { updateCategory } = require('./put');
const { updateSupplier } = require('./put');
const { updateDepartment } = require('./put');
const { updateMaintenance } = require('./put');
const { updateChartData } = require('./put');
const { deleteComputer } = require('./delete');
const { deleteAccessory } = require('./delete');
const { deleteComponent } = require('./delete');
const { deletePersonnel } = require('./delete');
const { deleteLicense } = require('./delete');
const { deleteCategory } = require('./delete');
const { deleteSupplier } = require('./delete');
const { deleteDepartment } = require('./delete');
const { deleteMaintenance } = require('./delete');
const { deleteActivity } = require('./delete');
require('dotenv').config();

const PORT = process.env.PORT || 5001; // Port to listen on
const JWT_SECRET = process.env.JWT_SECRET // Secret key for JWT signing

//Set up the database
setupDatabase();

//* Create an HTTP server and handle incoming requests
const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    // Handle preflight request for CORS
    handleCorsHeaders(req, res);
    res.statusCode = 200;
    res.end();
  } else {
    // Set CORS headers for the request
    handleCorsHeaders(req, res);

    try {
      const reqUrl = url.parse(req.url, true);
      // Middleware to parse JSON data in incoming requests
      let requestData = '';
      if (req.method === 'POST' || req.method === 'PUT') {
        req.on('data', (chunk) => {
          requestData += chunk;
        });
        req.on('end', () => {
          try {
            req.body = JSON.parse(requestData);
             // Handle the request with the appropriate handler
            handleRequest(req, res, reqUrl, requestData);
          } catch (error) {
            console.error('Invalid JSON data:', error.message);
            sendResponse(res, 400, { error: 'Invalid JSON data' });
          }
        });
      } else {
        // Handle the request with the appropriate handler
        handleRequest(req, res, reqUrl, requestData);
      }
    } catch (error) {
      sendResponse(res, 500, { error: 'Internal Server Error' });
    }
  }
});

//* Function to handle CORS headers for the request using cors middleware
function handleCorsHeaders(req, res) {
  // Use the cors middleware
  cors()(req, res, () => {});
}

//* Check if the table 'credentials' exists in the database
async function setupCredentialsTable() {
  try {
    const result = await pool.query(`
      SELECT 
        EXISTS (
          SELECT FROM information_schema.tables 
          WHERE  table_schema = 'public'
          AND    table_name   = 'credentials'
        )
    `);
    if (result.rows[0].exists) {
      checkDefaultUserExists();
    } else {
      await pool.query(`
        CREATE TABLE credentials (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        )
      `);
      insertDefaultUser();
    }
  } catch (err) {
    console.error('Error checking table existence:', err.message);
  }
};

setupCredentialsTable();

//* Function to handle user login by checking the provided username and password against the database
async function handleLogin(req, res) {
  // Extract the username and password from the request body
  const { username, password } = req.body;
  try {
    // Retrieve the hashed password from the database for the given username
    const result = await pool.query(`SELECT password FROM credentials WHERE username = $1`, [username]);
    if (result.rows.length > 0) {
      const hashedPasswordFromDB = result.rows[0].password;
      // Compare the provided password with the hashed password from the database
      const passwordMatch = bcrypt.compareSync(password, hashedPasswordFromDB);
      if (passwordMatch) {
        // Successful login, generate a JWT token
        const token = generateToken(username, res);
        // Send the token in the response
        sendResponse(res, 200, { token: token });
      } else {
        // Invalid password
        sendResponse(res, 401, { error: 'Invalid password' });
      }
    } else {
      // User not found
      sendResponse(res, 404, { error: 'User not found' });
    }
  } catch (err) {
    console.error('Error retrieving user credentials:', err.message);
    sendResponse(res, 500, { error: 'Error retrieving user credentials' });
  }
};

//* Generate a JWT token for the given username and role
function generateToken(username, res) {
  // Create the payload with the user's information
  const payload = {
    username: 'admin',
    role: 'admin'
  };
  // Generate the token with the payload and the secret key
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  res.setHeader('Authorization', `Bearer ${token}`);
  return token;
};

//* Function to change user's password in the database
async function changePassword(req, res) {
  try {
    const { username, oldPassword, newPassword } = req.body;
    // Retrieve the hashed password from the database for the given username
    const result = await pool.query(`SELECT password FROM credentials WHERE username = $1`, [username]);
    if (result.rows.length > 0) {
      const hashedPasswordFromDB = result.rows[0].password;
      // Verify the old password
      const passwordMatch = bcrypt.compareSync(oldPassword, hashedPasswordFromDB);
      if (passwordMatch) { 
        // Hash the new password
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        // Update the password in the database
        await pool.query(`UPDATE credentials SET password = $1 WHERE username = $2`, [hashedNewPassword, username]);
        sendResponse(res, 200, { message: 'Password changed successfully' });
      } else {
        sendResponse(res, 401, { error: 'Invalid old password' });
      }
    } else {
      sendResponse(res, 404, { error: 'User not found' });
    }
  } catch (error) {
    console.error('Error changing password:', error);
    sendResponse(res, 400, { error: 'Error changing password' });
  }
};

//* Function to check if the default user exists in the database
async function checkDefaultUserExists() {
  const defaultUsername = 'admin';
  try {
    // Check if the default user already exists in the credentials table
    const result = await pool.query(`SELECT * FROM credentials WHERE username = $1`, [defaultUsername]);
    if (result.rows.length === 0) {
      // If the default user doesn't exist, insert it
      insertDefaultUser();
    }
  } catch (err) {
    console.error('Error checking default user existence:', err.message);
  }
};

//* Function to insert the default user into the database
async function insertDefaultUser() {
  const defaultUsername = 'admin';
  const defaultPassword = 'password';
  // Hash the default password
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10);
  try {
    // Insert the default user into the credentials table
    await pool.query(`INSERT INTO credentials (username, password) VALUES ($1, $2)`, [defaultUsername, hashedPassword]);
  } catch (err) {
    console.error('Error inserting default user:', err.message);
  }
}

// Function to insert recent activity into the database
const insertActivity = async (activity) => {
  try {
    // Insert the activity into the recentActivity table
    await pool.query(`
      INSERT INTO recentActivity (item, action, account, datetime)
      VALUES ($1, $2, $3, $4)
    `, [activity.item, activity.action, activity.account, activity.datetime]);
  } catch (err) {
    console.error('Error inserting activity:', err);
  }
};

//* Function to handle incoming HTTP requests and provide appropriate responses
async function handleRequest(req, res, reqUrl, requestData) {
  if (req.method === 'GET') {
    switch (reqUrl.pathname) {
      case '/api/credentials':
        try {
          // Fetch and return actual information about credentials
          const result = await pool.query(`SELECT * FROM credentials`);
          if (result.rows.length === 0) {
            sendResponse(res, 404, { error: 'No credentials found' });
          } else {
            sendResponse(res, 200, { credentials: result.rows });
          }
        } catch (err) {
          sendResponse(res, 500, { error: 'Database error' });
        }
        break;
        case '/api/recentActivity':
          try {
            // Fetch and return actual information about recent_activity
            const result = await pool.query(`SELECT * FROM recentActivity ORDER BY id DESC`);
            if (result.rows.length === 0) {
              sendResponse(res, 404, { error: 'No activity found' });
            } else {
              sendResponse(res, 200, result.rows);
            }
          } catch (err) {
            sendResponse(res, 500, { error: 'Database error' });
          }
          break;
          case '/api/chart_data':
            try {
              // Fetch and return actual information about charts
              const result = await pool.query(`SELECT component_count, computer_count, 
              accessory_count, personnel_count, license_count, supplier_count FROM chart_data LIMIT 1`);
              if (result.rows.length === 0) {
                sendResponse(res, 404, { error: 'No chart Data found' });
              } else {
                updateChartData(); // Update the chart data
                sendResponse(res, 200, result.rows);
              }
            } catch (err) {
              sendResponse(res, 500, { error: 'Database error' });
            }
            break;
          case '/api/room_data':
            try {
              // Fetch and return actual information about room_data
              const result = await pool.query(`SELECT * FROM room_data`);
              if (result.rows.length === 0) {
                sendResponse(res, 404, { error: 'No room data found' });
              } else {
                sendResponse(res, 200, result.rows);
              }
            } catch (err) {
              sendResponse(res, 500, { error: 'Database error' });
            }
            break;
          case '/api/computers':
            try {
              // Fetch and return actual information about computers
              const result = await pool.query(`SELECT * FROM computers`);
              if (result.rows.length === 0) {
                sendResponse(res, 404, { error: 'No computers found' });
              } else {
                sendResponse(res, 200, result.rows);
              }
            } catch (err) {
              sendResponse(res, 500, { error: 'Database error' });
            }
            break;
            case '/api/accessories':
              try {
                // Fetch and return actual information about accessories
                const result = await pool.query(`SELECT * FROM accessories`);
                if (result.rows.length === 0) {
                  sendResponse(res, 404, { error: 'No accessories found' });
                } else {
                  sendResponse(res, 200, result.rows);
                }
              } catch (err) {
                sendResponse(res, 500, { error: 'Database error' });
              }
              break;
            case '/api/components':
              try {
                // Fetch and return actual information about components
                const result = await pool.query(`SELECT * FROM components`);
                if (result.rows.length === 0) {
                  sendResponse(res, 404, { error: 'No components found' });
                } else {
                  sendResponse(res, 200, result.rows);
                }
              } catch (err) {
                sendResponse(res, 500, { error: 'Database error' });
              }
              break;
            case '/api/personnel':
              try {
                // Fetch and return actual information about personnel
                const result = await pool.query(`SELECT * FROM personnel`);
                if (result.rows.length === 0) {
                  sendResponse(res, 404, { error: 'No personnel found' });
                } else {
                  sendResponse(res, 200, result.rows);
                }
              } catch (err) {
                sendResponse(res, 500, { error: 'Database error' });
              }
              break;
              case '/api/licenses':
                try {
                  // Fetch and return actual information about licenses
                  const result = await pool.query(`SELECT * FROM licenses`);
                  if (result.rows.length === 0) {
                    sendResponse(res, 404, { error: 'No licenses found' });
                  } else {
                    sendResponse(res, 200, result.rows);
                  }
                } catch (err) {
                  sendResponse(res, 500, { error: 'Database error' });
                }
                break;
              case '/api/categories':
                try {
                  // Fetch and return actual information about categories
                  const result = await pool.query(`SELECT * FROM categories`);
                  if (result.rows.length === 0) {
                    sendResponse(res, 404, { error: 'No categories found' });
                  } else {
                    sendResponse(res, 200, result.rows);
                  }
                } catch (err) {
                  sendResponse(res, 500, { error: 'Database error' });
                }
                break;
              case '/api/suppliers':
                try {
                  // Fetch and return actual information about suppliers
                  const result = await pool.query(`SELECT * FROM suppliers`);
                  if (result.rows.length === 0) {
                    sendResponse(res, 404, { error: 'No suppliers found' });
                  } else {
                    sendResponse(res, 200, result.rows);
                  }
                } catch (err) {
                  sendResponse(res, 500, { error: 'Database error' });
                }
                break;
                case '/api/department':
                  try {
                    // Fetch and return actual information about departments
                    const result = await pool.query(`SELECT * FROM department`);
                    if (result.rows.length === 0) {
                      sendResponse(res, 404, { error: 'No departments found' });
                    } else {
                      sendResponse(res, 200, result.rows);
                    }
                  } catch (err) {
                    sendResponse(res, 500, { error: 'Database error' });
                  }
                  break;
                case '/api/maintenance':
                  try {
                    // Fetch and return actual information about maintenance
                    const result = await pool.query(`SELECT * FROM maintenance`);
                    if (result.rows.length === 0) {
                      sendResponse(res, 404, { error: 'No maintenance found' });
                    } else {
                      sendResponse(res, 200, result.rows);
                    }
                  } catch (err) {
                    sendResponse(res, 500, { error: 'Database error' });
                  }
                  break;
                  default:
                  sendResponse(res, 404, { message: 'Endpoint not found' });
                } 
        // If the incoming request method is POST
      } else if (req.method === 'POST') {
        switch (reqUrl.pathname) {
          case '/api/login':
             // Handle the login request and response
              handleLogin(req, res);
              // log the activity details for the login action
              const activity = {
                item: 'Victor',
                action: 'login',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
              break;
          case '/api/computers':
            try {
              const newComputer = req.body;
              createComputer(newComputer); // Call the createComputer function
              sendResponse(res, 201, { message: 'Computer creation initiated' });
              const activity = {
                item: 'computer',
                action: 'create new',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating computer' });
            }
            break;
          case '/api/accessories':
            try {
              const newAccessory = req.body;
              createAccessory(newAccessory); // Call the createSccessory function
              sendResponse(res, 201, { message: 'Accessory creation initiated' });
              const activity = {
                item: 'accessory',
                action: 'create new',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating accessory' });
            }
            break;
            case '/api/components':
            try {
              const newComponent = req.body;
              createComponent(newComponent); // Call the createComponent function
              sendResponse(res, 201, { message: 'Component creation initiated' });
              const activity = {
                item: 'component',
                action: 'create new',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating component' });
            }
            break;
            case '/api/personnel':
            try {
              const newPersonnel = req.body;
              createPersonnel(newPersonnel); // Call the createPersonnel function
              sendResponse(res, 201, { message: 'Personnel creation initiated' });
              const activity = {
                item: 'personnel',
                action: 'create new',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating personnel' });
            }
            break;
            case '/api/licenses':
            try {
              const newLicense = req.body;
              createLicense(newLicense); // Call the createLicense function
              sendResponse(res, 201, { message: 'License creation initiated' });
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating license' });
            }
            break;
            case '/api/categories':
            try {
              const newCategory = req.body;
              createCategory(newCategory); // Call the createCategory function
              sendResponse(res, 201, { message: 'Category creation initiated' });
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating category' });
            }
            break;
            case '/api/suppliers':
            try {
              const newSupplier = req.body;
              createSupplier(newSupplier); // Call the createSupplier function
              sendResponse(res, 201, { message: 'Supplier creation initiated' });
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating supplier' }); 
            }
            break;
            case '/api/department':
            try {
              const newDepartment = req.body;
              createDepartment(newDepartment); // Call the createDepartment function
              sendResponse(res, 201, { message: 'Department creation initiated' });
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating department' });
            }
            break;
            case '/api/maintenance':
            try {
              const newMaintenance = req.body;
              createMaintenance(newMaintenance); // Call the createMaintenance function
              sendResponse(res, 201, { message: 'Maintenance creation initiated' });
            } catch (error) {
              sendResponse(res, 400, { error: 'Error creating maintenance' });
            }
            break;
          default:
            sendResponse(res, 404, { message: 'Endpoint not found' });
        }
        // If the incoming request method is PUT
      } else if (req.method === 'PUT') {
        switch (reqUrl.pathname) {
          case '/api/change-password':
            // Handle the change password request and response
             changePassword(req, res);
              // log the activity details for the change password action
             const activity = {
              item: 'Victor',
              action: 'change password',
              account: 'admin',
              datetime: new Date().toISOString(),
            };
            insertActivity(activity);
                break;
          case '/api/computers':
            try {
              const updatedComputer = req.body;
              const computerId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateComputer(computerId, updatedComputer);
              sendResponse(res, 200, { message: 'Computer updated successfully' });
              const activity = {
                item: 'computer',
                action: 'update',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
            } catch (error) {
              sendResponse(res, 400, { error: 'Error updating computer' });
            }
            break;
            case '/api/accessories':
              try {
                const updatedAccessory = req.body;
                const accessoryId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                updateAccessory(accessoryId, updatedAccessory);
                sendResponse(res, 200, { message: 'Accessory updated successfully' });
                const activity = {
                  item: 'accessory',
                  action: 'update',
                  account: 'admin',
                  datetime: new Date().toISOString(),
                };
                insertActivity(activity);
              } catch (error) {
                console.error('Invalid JSON data:', error);
                sendResponse(res, 400, { error: 'Invalid JSON data' });
              }
              break;
            case '/api/components':
              try {
                const updatedComponent = req.body;
                const componentId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                updateComponent(componentId, updatedComponent);
                sendResponse(res, 200, { message: 'Component updated successfully' });
                const activity = {
                  item: 'component',
                  action: 'update',
                  account: 'admin',
                  datetime: new Date().toISOString(),
                };
                insertActivity(activity);
              } catch (error) {
                sendResponse(res, 400, { error: 'Error updating component' });
              }
              break;
            case '/api/personnel':
              try {
                const updatedPersonnel = req.body;
                const personnelId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                updatePersonnel(personnelId, updatedPersonnel);
                sendResponse(res, 200, { message: 'Personnel updated successfully' });
                const activity = {
                  item: 'personnel',
                  action: 'update',
                  account: 'admin',
                  datetime: new Date().toISOString(),
                };
                insertActivity(activity);
              } catch (error) {
                sendResponse(res, 400, { error: 'Error updating personnel' });
              }
              break;
              case '/api/licenses':
                try {
                  const updatedLicense = req.body;
                  const licenseId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                  updateLicense(licenseId, updatedLicense);
                  sendResponse(res, 200, { message: 'License updated successfully' });
                  const activity = {
                    item: 'license',
                    action: 'update',
                    account: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                } catch (error) {
                  sendResponse(res, 400, { error: 'Error updating license' });
                }
                break;
              case '/api/categories':
                try {
                  const updatedCategory = req.body;
                  const categoryId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                  updateCategory(categoryId, updatedCategory);
                  sendResponse(res, 200, { message: 'Category updated successfully' });
                  const activity = {
                    item: 'category',
                    action: 'update',
                    account: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                } catch (error) {
                  sendResponse(res, 400, { error: 'Error updating category' });
                }
                break;
            case '/api/suppliers':
              try {
                const updatedSupplier = req.body;
                const supplierId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                updateSupplier(supplierId, updatedSupplier);
                sendResponse(res, 200, { message: 'Supplier updated successfully' });
                const activity = {
                  item: 'supplier',
                  action: 'update',
                  account: 'admin',
                  datetime: new Date().toISOString(),
                };
                insertActivity(activity);
              } catch (error) {
                sendResponse(res, 400, { error: 'Error updating supplier' });
              }
              break;
            case '/api/department':
              try {
                const updatedDepartment = req.body;
                const departmentId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                updateDepartment(departmentId, updatedDepartment);
                sendResponse(res, 200, { message: 'Department updated successfully' });
                const activity = {
                  item: 'department',
                  action: 'update',
                  account: 'admin',
                  datetime: new Date().toISOString(),
                };
                insertActivity(activity);
              } catch (error) {
                sendResponse(res, 400, { error: 'Error updating department' });
              }
              break;
              case '/api/maintenance':
                try {
                  const updatedMaintenance = req.body;
                  const maintenanceId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
                  updateMaintenance(maintenanceId, updatedMaintenance);
                  sendResponse(res, 200, { message: 'Maintenance updated successfully' });
                  const activity = {
                    item: 'maintenance',
                    action: 'update',
                    account: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                } catch (error) {
                  sendResponse(res, 400, { error: 'Error updating maintenance' });
                }
                break;
              default:
              sendResponse(res, 404, { message: 'Endpoint not found' });
            }
        // If the incoming request method is DELETE
      } else if (req.method === 'DELETE') {
        switch (reqUrl.pathname) {
          case '/api/computers':
            try {
              const computerId = reqUrl.query.id;
              deleteComputer(computerId);
              sendResponse(res, 200, { message: 'Computer deleted successfully' });
              const activity = {
                item: 'computer',
                action: 'delete',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
            } catch (error) {
              console.error('Error deleting computer:', error);
              sendResponse(res, 500, { error: 'Error deleting computer' });
            }
            break;
          case '/api/accessories':
            try {
              const accessoryId = reqUrl.query.id;
              deleteAccessory(accessoryId);
              sendResponse(res, 200, { message: 'Accessory deleted successfully' });
              const activity = {
                item: 'accessory',
                action: 'delete',
                account: 'admin',
                datetime: new Date().toISOString(),
              };
              insertActivity(activity);
            } catch (error) {
              console.error('Error deleting accessory:', error);
              sendResponse(res, 500, { error: 'Error deleting accessory' });
            }
            break;
            case '/api/components':
              try {
                const componentId = reqUrl.query.id;
                deleteComponent(componentId);
                sendResponse(res, 200, { message: 'Component deleted successfully' });
                const activity = {
                  item: 'component',
                  action: 'delete',
                  account: 'admin',
                  datetime: new Date().toISOString(),
                };
                insertActivity(activity);
              } catch (error) {
                console.error('Error deleting component:', error);
                sendResponse(res, 500, { error: 'Error deleting component' });
              }
              break;
            case '/api/personnel':
              try {
                const personnelId = reqUrl.query.id;
                deletePersonnel(personnelId);
                sendResponse(res, 200, { message: 'Personnel deleted successfully' });
                const activity = {
                  item: 'personnel',
                  action: 'delete',
                  account: 'admin',
                  datetime: new Date().toISOString(),
                };
                insertActivity(activity);
              } catch (error) {
                console.error('Error deleting personnel:', error);
                sendResponse(res, 500, { error: 'Error deleting personnel' });
              }
              break;
              case '/api/licenses':
                try {
                  const licenseId = reqUrl.query.id;
                  deleteLicense(licenseId);
                  sendResponse(res, 200, { message: 'License deleted successfully' });
                  const activity = {
                    item: 'license',
                    action: 'delete',
                    account: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                } catch (error) {
                  console.error('Error deleting license:', error);
                  sendResponse(res, 500, { error: 'Error deleting license' });
                }
                break;
              case '/api/categories':
                try {
                  const categoryId = reqUrl.query.id;
                  deleteCategory(categoryId);
                  sendResponse(res, 200, { message: 'Category deleted successfully' });
                  const activity = {
                    item: 'category',
                    action: 'delete',
                    account: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                } catch (error) {
                  console.error('Error deleting category:', error);
                  sendResponse(res, 500, { error: 'Error deleting category' });
                }
                break;
              case '/api/suppliers':
                try {
                  const supplierId = reqUrl.query.id;
                  deleteSupplier(supplierId);
                  sendResponse(res, 200, { message: 'Supplier deleted successfully' });
                  const activity = {
                    item: 'supplier',
                    action: 'delete',
                    account: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                } catch (error) {
                  console.error('Error deleting supplier:', error);
                  sendResponse(res, 500, { error: 'Error deleting supplier' });
                }
                break;
                case '/api/department':
                  try {
                    const departmentId = reqUrl.query.id;
                    deleteDepartment(departmentId);
                    sendResponse(res, 200, { message: 'Department deleted successfully' });
                    const activity = {
                      item: 'department',
                      action: 'delete',
                      account: 'admin',
                      datetime: new Date().toISOString(),
                    };
                    insertActivity(activity);
                  } catch (error) {
                    console.error('Error deleting department:', error);
                    sendResponse(res, 500, { error: 'Error deleting department' });
                  }
                  break;
                case '/api/maintenance':
                  try {
                    const maintenanceId = reqUrl.query.id;
                    deleteMaintenance(maintenanceId);
                    sendResponse(res, 200, { message: 'Maintenance deleted successfully' });
                    const activity = {
                      item: 'maintenance',
                      action: 'delete',
                      account: 'admin',
                      datetime: new Date().toISOString(),
                    };
                    insertActivity(activity);
                  } catch (error) {
                    console.error('Error deleting maintenance:', error);
                    sendResponse(res, 500, { error: 'Error deleting maintenance' });
                  }
                  break;
                  case '/api/recentActivity':
                    try {
                      const recentActivityId = reqUrl.query.id;
                      deleteActivity(recentActivityId);
                      sendResponse(res, 200, { message: 'Activity deleted successfully' });
                    } catch (error) {
                      console.error('Error deleting activity:', error);
                      sendResponse(res, 500, { error: 'Error deleting activity' });
                    }
                    break;
                    default:
                      sendResponse(res, 404, { message: 'Endpoint not found' });
                  }
                } else {
                  sendResponse(res, 405, { message: 'Method not allowed' });
                }
              }
    
    // Function to send a JSON response with the specified status code and data
    function sendResponse(res, statusCode, data) {
      res.writeHead(statusCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }

    // Display message when the server is running
    server.on('request', (req, res) => {
      const { method, url } = req;
    
      if (method === 'GET' && url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hey this is my API running 🥳');
      }
    });
    
    // Start the server and listen for incoming connections on the specified port
    server.listen(PORT, () => {
      console.log(`Server is running on localhost:${PORT}`);
    });