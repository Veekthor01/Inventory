const http = require('http');
const url = require('url');
const sqlite3 = require('sqlite3').verbose();
const setupDatabase = require('./createDatabase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { insertIfTableEmpty } = require('./insertDatabase');
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

const port = 5001; // Port number for the server
const JWT_SECRET = process.env.JWT_SECRET // Secret key for JWT signing

//Set up the database
const db = setupDatabase();

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
            handleRequest(req, res, db, reqUrl, requestData);
          } catch (error) {
            console.error('Invalid JSON data:', error.message);
            sendResponse(res, 400, { error: 'Invalid JSON data' });
          }
        });
      } else {
        // Handle the request with the appropriate handler
        handleRequest(req, res, db, reqUrl, requestData);
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
db.get(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='credentials';",
  (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
      return;
    }
    // If the 'credentials' table already exists, skip table creation check default user existence
    if (row) {
      checkDefaultUserExists();
    } else {
      // If the table doesn't exist, create it
      db.run(`
        CREATE TABLE IF NOT EXISTS credentials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL
        );
      `, (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          insertDefaultUser();
        }
      });
    }
  }
);

//* Function to handle user login by checking the provided username and password against the database
function handleLogin(req, res, db) {
  // Extract the username and password from the request body
  const { username, password } = req.body;

  // Retrieve the hashed password from the database for the given username
  const selectQuery = 'SELECT password FROM credentials WHERE username = ?';
  db.get(selectQuery, [username], (err, row) => {
    if (err) {
      console.error('Error retrieving user credentials:', err.message);
      sendResponse(res, 500, { error: 'Error retrieving user credentials' });
    } else if (row) {
      const hashedPasswordFromDB = row.password;

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
  });
}

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
}



//* Function to change user's password in the database
function changePassword(req, res, db) {
  try {
    const { username, oldPassword, newPassword } = req.body;

    // Retrieve the hashed password from the database for the given username
    const selectQuery = 'SELECT password FROM credentials WHERE username = ?';
    db.get(selectQuery, [username], (err, row) => {
      if (err) {
        console.error('Error retrieving user credentials:', err.message);
        sendResponse(res, 500, { error: 'Error retrieving user credentials' });
      } else if (row) {
        const hashedPasswordFromDB = row.password;

        // Verify the old password
        const passwordMatch = bcrypt.compareSync(oldPassword, hashedPasswordFromDB);
        if (passwordMatch) { 
          // Hash the new password
          const hashedNewPassword = bcrypt.hashSync(newPassword, 10);

          // Update the password in the database
          const updateQuery = 'UPDATE credentials SET password = ? WHERE username = ?';
          db.run(updateQuery, [hashedNewPassword, username], (err) => {
            if (err) {
              console.error('Error updating user password:', err.message);
              sendResponse(res, 500, { error: 'Error updating user password' });
            } else {
              sendResponse(res, 200, { message: 'Password changed successfully' });
            }
          });
        } else {
          sendResponse(res, 401, { error: 'Invalid old password' });
        }
      } else {
        sendResponse(res, 404, { error: 'User not found' });
      }
    });
  } catch (error) {
    console.error('Error changing password:', error);
    sendResponse(res, 400, { error: 'Error changing password' });
  }
}

//* Function to check if the default user exists in the database
function checkDefaultUserExists() {
  const defaultUsername = 'admin';

  // Check if the default user already exists in the credentials table
  const selectQuery = 'SELECT * FROM credentials WHERE username = ?';
  db.get(selectQuery, [defaultUsername], (err, row) => {
    if (err) {
      console.error('Error checking default user existence:', err.message);
    } else if (!row) {
      // If the default user doesn't exist, insert it
      insertDefaultUser();
    }
  });
}

//* Function to insert the default user into the database
function insertDefaultUser() {
  const defaultUsername = 'admin';
  const defaultPassword = 'password';

  // Hash the default password
  const hashedPassword = bcrypt.hashSync(defaultPassword, 10);

  // Insert the default user into the credentials table
  const insertQuery = 'INSERT INTO credentials (username, password) VALUES (?, ?)';
  db.run(insertQuery, [defaultUsername, hashedPassword], (err) => {
    if (err) {
      console.error('Error inserting default user:', err.message);
    }
  });
}

// Function to insert recent activity into the database
const insertActivity = (activity) => {
  const insertActivityQuery = `
    INSERT INTO recentActivity (item, action, user, datetime)
    VALUES (?, ?, ?, ?);
  `;

  db.run(
    insertActivityQuery,
    [activity.item, activity.action, activity.user, activity.datetime],
    (err) => {
      if (err) {
        console.error('Error inserting activity:', err);
      }
    }
  );
};

//* Function to handle incoming HTTP requests and provide appropriate responses
function handleRequest(req, res, db, reqUrl, requestData) {
    if (req.method === 'GET') {
        switch (reqUrl.pathname) {
          case '/api/credentials':
            // Fetch and return actual information about credentials
            const selectCredentialsQuery = 'SELECT * FROM credentials;';
            db.all(selectCredentialsQuery, (err, rows) => {
              if (err) {
                sendResponse(res, 500, { error: 'Database error' });
              } else if (rows.length === 0) {
                sendResponse(res, 404, { error: 'No credentials found' });
              } else {
                sendResponse(res, 200, { credentials: rows });
              }
            });
            break;
            case '/api/recentActivity':
            // Fetch and return actual information about recent_activity
            const selectRecentActivityQuery = 'SELECT * FROM recentActivity ORDER BY datetime DESC;';
            db.all(selectRecentActivityQuery, (err, rows) => {
              if (err) {
                sendResponse(res, 500, { error: 'Database error' });
              } else if (rows.length === 0) {
                sendResponse(res, 404, { error: 'No activity found' });
              } else {
                sendResponse(res, 200, rows);
              }
            });
            break;
            case '/api/chart_data':
            // Fetch and return actual information about charts
            const selectchartDataQuery = `SELECT component_count, computer_count, 
            accessory_count, personnel_count, license_count, supplier_count FROM chart_data LIMIT 1;`;
            db.all(selectchartDataQuery, (err, rows) => {
              if (err) {
                sendResponse(res, 500, { error: 'Database error' });
              } else if (rows.length === 0) {
                sendResponse(res, 404, { error: 'No chart Data found' });
              } else {
                updateChartData(); // Update the chart data
                sendResponse(res, 200, rows);
              }
            });
            break;
            case '/api/room_data':
              // Fetch and return actual information about computers
              const selectRoomItemsQuery = 'SELECT * FROM room_data;';
              db.all(selectRoomItemsQuery, (err, rows) => {
                if (err) {
                  sendResponse(res, 500, { error: 'Database error' });
                } else if (rows.length === 0) {
                  sendResponse(res, 404, { error: 'No computers found' });
                } else {
                  sendResponse(res, 200, rows);
                }
              });
              break;
            case '/api/computers':
              // Fetch and return actual information about computers
              const selectComputerQuery = 'SELECT * FROM computers;';
              db.all(selectComputerQuery, (err, rows) => {
                if (err) {
                  sendResponse(res, 500, { error: 'Database error' });
                } else if (rows.length === 0) {
                  sendResponse(res, 404, { error: 'No computers found' });
                } else {
                  sendResponse(res, 200, rows);
                }
              });
              break;
      case '/api/accessories':
        // Fetch and return actual information about accessories
        const selectAccessoryQuery = 'SELECT * FROM accessories;';
        db.all(selectAccessoryQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No accessories found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        
        break;
        case '/api/components':
        // Fetch and return actual information about components
        const selectComponentQuery = 'SELECT * FROM components ORDER BY id DESC;';
        db.all(selectComponentQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No components found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        break;
        case '/api/personnel':
        
        // Fetch and return actual information about personnel
        const selectPersonnelQuery = 'SELECT * FROM personnel;';
        db.all(selectPersonnelQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No personnel found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        break;
        case '/api/licenses':
        // Fetch and return actual information about licenses
        const selectLicenseQuery = 'SELECT * FROM licenses;';
        db.all(selectLicenseQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No licenses found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        break;
        case '/api/categories':
        // Fetch and return actual information about categories
        const selectCategoryQuery = 'SELECT * FROM categories;';
        db.all(selectCategoryQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No categories found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        break;
        case '/api/suppliers':
        // Fetch and return actual information about suppliers
        const selectSupplierQuery = 'SELECT * FROM suppliers;';
        db.all(selectSupplierQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No suppliers found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        break;
        case '/api/department':
        // Fetch and return actual information about departments
        const selectDepartmentQuery = 'SELECT * FROM department;';
        db.all(selectDepartmentQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No departments found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        break;
        case '/api/maintenance':
        // Fetch and return actual information about maintenance
        const selectMaintenanceQuery = 'SELECT * FROM maintenance;';
        db.all(selectMaintenanceQuery, (err, rows) => {
          if (err) {
            sendResponse(res, 500, { error: 'Database error' });
          } else if (rows.length === 0) {
            sendResponse(res, 404, { error: 'No maintenance found' });
          } else {
            sendResponse(res, 200, rows);
          }
        });
        break;
      default:
        sendResponse(res, 404, { message: 'Endpoint not found' });
    } 
        // If the incoming request method is POST
      } else if (req.method === 'POST') {
        switch (reqUrl.pathname) {
          case '/api/login':
             // Handle the login request and response
              handleLogin(req, res, db);
              // log the activity details for the login action
              const activity = {
                item: 'Victor',
                action: 'login',
                user: 'admin',
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
                user: 'admin',
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
                user: 'admin',
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
                user: 'admin',
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
                user: 'admin',
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
             changePassword(req, res, db);
              // log the activity details for the change password action
             const activity = {
              item: 'Victor',
              action: 'change password',
              user: 'admin',
              datetime: new Date().toISOString(),
            };
            insertActivity(activity);
                break;
          case '/api/computers':
            try {
              const updatedComputer = req.body;
              const computerId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateComputer(computerId, updatedComputer, db, (err) => {
                if (err) {
                  console.error('Error updating computer:', err);
                  sendResponse(res, 400, { error: 'Error updating computer' });
                } else {
                  sendResponse(res, 200, { message: 'Computer updated successfully' });
                  const activity = {
                    item: 'computer',
                    action: 'update',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/accessories':
            try {
              const updatedAccessory = req.body;
              const accessoryId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateAccessory(accessoryId, updatedAccessory, db, (err) => {
                if (err) {
                  console.error('Error updating accessory:', err);
                  sendResponse(res, 400, { error: 'Error updating accessory' });
                } else {
                  sendResponse(res, 200, { message: 'Accessory updated successfully' });
                  const activity = {
                    item: 'accessory',
                    action: 'update',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/components':
            try {
              const updatedComponent = req.body;
              const componentId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateComponent(componentId, updatedComponent, db, (err) => {
                if (err) {
                  console.error('Error updating component:', err);
                  sendResponse(res, 400, { error: 'Error updating component' });
                } else {
                  sendResponse(res, 200, { message: 'Component updated successfully' });
                  const activity = {
                    item: 'component',
                    action: 'update',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/personnel':
            try {
              const updatedPersonnel = req.body;
              const personnelId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updatePersonnel(personnelId, updatedPersonnel, db, (err) => {
                if (err) {
                  console.error('Error updating personnel:', err);
                  sendResponse(res, 400, { error: 'Error updating personnel' });
                } else {
                  sendResponse(res, 200, { message: 'Personnel updated successfully' });
                  // Insert recent activity entry
                  const activity = {
                    item: 'personnel',
                    action: 'update',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/licenses':
            try {
              const updatedLicense = req.body;
              const licenseId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateLicense(licenseId, updatedLicense, db, (err) => {
                if (err) {

                  console.error('Error updating license:', err);
                  sendResponse(res, 400, { error: 'Error updating license' });
                } else {
                  sendResponse(res, 200, { message: 'License updated successfully' });
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/categories':
            try {
              const updatedCategory = req.body;
              const categoryId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateCategory(categoryId, updatedCategory, db, (err) => {
                if (err) {
                  console.error('Error updating category:', err);
                  sendResponse(res, 400, { error: 'Error updating category' });
                } else {
                  sendResponse(res, 200, { message: 'Category updated successfully' });
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/suppliers':
            try {
              const updatedSupplier = req.body;
              const supplierId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateSupplier(supplierId, updatedSupplier, db, (err) => {
                if (err) {
                  console.error('Error updating supplier:', err);
                  sendResponse(res, 400, { error: 'Error updating supplier' });
                } else {
                  sendResponse(res, 200, { message: 'Supplier updated successfully' });
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/department':
            try {
              const updatedDepartment = req.body;
              const departmentId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateDepartment(departmentId, updatedDepartment, db, (err) => {
                if (err) {
                  console.error('Error updating department:', err);
                  sendResponse(res, 400, { error: 'Error updating department' });
                } else {
                  sendResponse(res, 200, { message: 'Department updated successfully' });
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
            case '/api/maintenance':
            try {
              const updatedMaintenance = req.body;
              const maintenanceId = reqUrl.query.id; // Extract the id parameter from reqUrl.query
              updateMaintenance(maintenanceId, updatedMaintenance, db, (err) => {
                if (err) {
                  console.error('Error updating maintenance:', err);
                  sendResponse(res, 400, { error: 'Error updating maintenance' });
                } else {
                  sendResponse(res, 200, { message: 'Maintenance updated successfully' });
                }
              });
            } catch (error) {
              console.error('Invalid JSON data:', error);
              sendResponse(res, 400, { error: 'Invalid JSON data' });
            }
            break;
          default:
            sendResponse(res, 404, { message: 'Endpoint not found' });
        }
        // If the incoming request method is DELETE
      } else if (req.method === 'DELETE') {
        switch (reqUrl.pathname) {
          case '/api/computers':
        const computerId = reqUrl.query.id;
        deleteComputer(computerId, db, (err) => {
          if (err) {
            console.error('Error deleting computer:', err);
            sendResponse(res, 500, { error: 'Error deleting computer' });
          } else {
            sendResponse(res, 200, { message: 'Computer deleted successfully' });
           // Insert recent activity entry
                  const activity = {
                    item: 'computer',
                    action: 'delete',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                }
              });
              break;
            case '/api/accessories':
              const accessoryId = reqUrl.query.id;
              deleteAccessory(accessoryId, db, (err) => {
                if (err) {
                  console.error('Error deleting accessory:', err);
                  sendResponse(res, 500, { error: 'Error deleting accessory' });
                } else {
                  sendResponse(res, 200, { message: 'Accessory deleted successfully' });
                  // Insert recent activity entry
                  const activity = {
                    item: 'accessory',
                    action: 'delete',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                }
              });
              break;
              case '/api/components':
                const componentId = reqUrl.query.id;
                deleteComponent(componentId, db, (err) => {
                  if (err) {
                    console.error('Error deleting component:', err);
                    sendResponse(res, 500, { error: 'Error deleting component' });
                  } else {
                    sendResponse(res, 200, { message: 'Component deleted successfully' });
                    // Insert recent activity entry
                  const activity = {
                    item: 'component',
                    action: 'delete',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                  }
                });
                break;
            case '/api/personnel':
              const personnelId = reqUrl.query.id;
              deletePersonnel(personnelId, db, (err) => {
                if (err) {
                  console.error('Error deleting personnel:', err);
                  sendResponse(res, 500, { error: 'Error deleting personnel' });
                } else {
                  sendResponse(res, 200, { message: 'Personnel deleted successfully' });
                  // Insert recent activity entry
                  const activity = {
                    item: 'personnel',
                    action: 'delete',
                    user: 'admin',
                    datetime: new Date().toISOString(),
                  };
                  insertActivity(activity);
                }
              });
              break;
            case '/api/licenses':
              const licenseId = reqUrl.query.id;
              deleteLicense(licenseId, db, (err) => {
                if (err) {
                  console.error('Error deleting license:', err);
                  sendResponse(res, 500, { error: 'Error deleting license' });
                } else {
                  sendResponse(res, 200, { message: 'License deleted successfully' });
                }
              });
              break;
            case '/api/categories':
              const categoryId = reqUrl.query.id;
              deleteCategory(categoryId, db, (err) => {
                if (err) {
                  console.error('Error deleting category:', err);
                  sendResponse(res, 500, { error: 'Error deleting category' });
                } else {
                  sendResponse(res, 200, { message: 'Category deleted successfully' });
                }
              });
              break;
            case '/api/suppliers':
              const supplierId = reqUrl.query.id;
              deleteSupplier(supplierId, db, (err) => {
                if (err) {
                  console.error('Error deleting supplier:', err);
                  sendResponse(res, 500, { error: 'Error deleting supplier' });
                } else {
                  sendResponse(res, 200, { message: 'Supplier deleted successfully' });
                }
              });
              break;
            case '/api/department':
              const departmentId = reqUrl.query.id;
              deleteDepartment(departmentId, db, (err) => {
                if (err) {
                  console.error('Error deleting department:', err);
                  sendResponse(res, 500, { error: 'Error deleting department' });
                } else {
                  sendResponse(res, 200, { message: 'Department deleted successfully' });
                }
              });
              break;
            case '/api/maintenance':
              const maintenanceId = reqUrl.query.id;
              deleteMaintenance(maintenanceId, db, (err) => {
                if (err) {
                  console.error('Error deleting maintenance:', err);
                  sendResponse(res, 500, { error: 'Error deleting maintenance' });
                } else {
                  sendResponse(res, 200, { message: 'Maintenance deleted successfully' });
                }
              });
              break;
              case '/api/recentActivity':
                const recentActivityId = reqUrl.query.id;
                deleteActivity(recentActivityId, db, (err) => {
                  if (err) {
                    console.error('Error deleting activity:', err);
                    sendResponse(res, 500, { error: 'Error deleting activity' });
                  } else {
                    sendResponse(res, 200, { message: 'Activity deleted successfully' });
                  }
                });
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
    
    // Close the database connection when the server is closed
    server.on('close', () => {
      db.close((err) => {
        if (err) {
          console.error('Error closing the database connection:', err.message);
        } else {
          console.log('Database connection closed.');
        }
      });
    });
    
    // Start the server and listen for incoming connections on the specified port
    server.listen(port, () => {
      console.log(`Server is running on localhost:${port}`);
    });
    