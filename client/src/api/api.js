const API_BASE_URL = process.env.REACT_APP_BACKEND_URL

// Fetch computers
export const fetchComputers = async (searchQuery) => {
    try {
        let url = `${API_BASE_URL}/api/computers`
        if (searchQuery) {
            url += `?search=${encodeURIComponent(searchQuery)}`
        }

        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Failed to fetch computers')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching computers:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Create a computer
export const createComputer = async (computerData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/computers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(computerData),
        })
        if (!response.ok) {
            throw new Error('Failed to create computer')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating computer:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a computer
export const updateComputer = async (computerId, updatedComputerData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/computers?id=${computerId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedComputerData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update computer')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating computer:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a computer
export const deleteComputer = async (computerId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/computers?id=${computerId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete computer')
        }
    } catch (error) {
        console.error('Error deleting computer:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch accessories
export const fetchAccessories = async (searchQuery) => {
    try {
        let url = `${API_BASE_URL}/api/accessories`
        if (searchQuery) {
            url += `?search=${encodeURIComponent(searchQuery)}`
        }
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Failed to fetch accessories')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching accessories:', error)
        return Promise.reject(error)
    }
}

// Create an accessory
export const createAccessory = async (accessoryData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/accessories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accessoryData),
        })
        if (!response.ok) {
            throw new Error('Failed to create accessory')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating accessory:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update an accessory
export const updateAccessory = async (accessoryId, updatedAccessoryData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/accessories?id=${accessoryId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedAccessoryData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update accessory')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating accessory:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete an accessory
export const deleteAccessory = async (accessoryId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/accessories?id=${accessoryId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete accessory')
        }
    } catch (error) {
        console.error('Error deleting accessory:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch components
export const fetchComponents = async (searchQuery) => {
    try {
        let url = `${API_BASE_URL}/api/components?sort=id:desc`
        if (searchQuery) {
            url += `?search=${encodeURIComponent(searchQuery)}`
        }
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Failed to fetch components')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching components:', error)
        return Promise.reject(error)
    }
}
// Create a component
export const createComponent = async (componentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/components`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(componentData),
        })
        if (!response.ok) {
            throw new Error('Failed to create component')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating component:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a component
export const updateComponent = async (componentId, updatedComponentData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/components?id=${componentId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedComponentData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update component')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating component:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a component
export const deleteComponent = async (componentId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/components?id=${componentId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete component')
        }
    } catch (error) {
        console.error('Error deleting component:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch personnel
export const fetchPersonnel = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/personnel`)
        if (!response.ok) {
            throw new Error('Failed to fetch personnel')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching personnel:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Create a personnel
export const createPersonnel = async (personnelData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/personnel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personnelData),
        })
        if (!response.ok) {
            throw new Error('Failed to create personnel')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating personnel:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a personnel
export const updatePersonnel = async (personnelId, updatedPersonnelData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/personnel?id=${personnelId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPersonnelData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update personnel')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating personnel:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a personnel
export const deletePersonnel = async (personnelId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/personnel?id=${personnelId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete personnel')
        }
    } catch (error) {
        console.error('Error deleting personnel:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch licenses
export const fetchLicenses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/licenses`)
        if (!response.ok) {
            throw new Error('Failed to fetch licenses')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching licenses:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Create a license
export const createLicense = async (licenseData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/licenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(licenseData),
        })
        if (!response.ok) {
            throw new Error('Failed to create license')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating license:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a license
export const updateLicense = async (licenseId, updatedLicenseData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/licenses?id=${licenseId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedLicenseData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update license')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating license:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a license
export const deleteLicense = async (licenseId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/licenses?id=${licenseId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete license')
        }
    } catch (error) {
        console.error('Error deleting license:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch categories
export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories`)
        if (!response.ok) {
            throw new Error('Failed to fetch categories')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching categories:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Create a category
export const createCategory = async (categoryData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        })
        if (!response.ok) {
            throw new Error('Failed to create category')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating category:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a category
export const updateCategory = async (categoryId, updatedCategoryData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/categories?id=${categoryId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCategoryData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update category')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating category:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a category
export const deleteCategory = async (categoryId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/categories?id=${categoryId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete category')
        }
    } catch (error) {
        console.error('Error deleting category:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch suppliers
export const fetchSuppliers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/suppliers`)
        if (!response.ok) {
            throw new Error('Failed to fetch suppliers')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching suppliers:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Create a supplier
export const createSupplier = async (supplierData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/suppliers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(supplierData),
        })
        if (!response.ok) {
            throw new Error('Failed to create supplier')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating supplier:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a supplier
export const updateSupplier = async (supplierId, updatedSupplierData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/suppliers?id=${supplierId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSupplierData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update supplier')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating supplier:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a supplier
export const deleteSupplier = async (supplierId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/suppliers?id=${supplierId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete supplier')
        }
    } catch (error) {
        console.error('Error deleting supplier:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch department
export const fetchDepartment = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/department`)
        if (!response.ok) {
            throw new Error('Failed to fetch departments')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching departments:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Create a department
export const createDepartment = async (departmentData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/department`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(departmentData),
        })
        if (!response.ok) {
            throw new Error('Failed to create department')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating department:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a department
export const updateDepartment = async (departmentId, updatedDepartmentData) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/department?id=${departmentId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDepartmentData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update department')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating department:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a department
export const deleteDepartment = async (departmentId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/department?id=${departmentId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete department')
        }
    } catch (error) {
        console.error('Error deleting department:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch maintenance
export const fetchMaintenance = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/maintenance`)
        if (!response.ok) {
            throw new Error('Failed to fetch maintenance')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching maintenance:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Create a maintenance
export const createMaintenance = async (maintenanceData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/maintenance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(maintenanceData),
        })
        if (!response.ok) {
            throw new Error('Failed to create maintenance')
        }
        return await response.json()
    } catch (error) {
        console.error('Error creating maintenance:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Update a maintenance
export const updateMaintenance = async (
    maintenanceId,
    updatedMaintenanceData
) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/maintenance?id=${maintenanceId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMaintenanceData),
            }
        )
        if (!response.ok) {
            throw new Error('Failed to update maintenance')
        }
        return await response.json()
    } catch (error) {
        console.error('Error updating maintenance:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Delete a maintenance
export const deleteMaintenance = async (maintenanceId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/maintenance?id=${maintenanceId}`,
            {
                method: 'DELETE',
            }
        )
        if (!response.ok) {
            throw new Error('Failed to delete maintenance')
        }
    } catch (error) {
        console.error('Error deleting maintenance:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch Recent activity
export const fetchRecentActivity = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/recentActivity`)
        if (!response.ok) {
            throw new Error('Failed to fetch activity')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching activities:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch chart
export const fetchChartActivity = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/chart_data`)
        if (!response.ok) {
            throw new Error('Failed to fetch chart')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching chart:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}

// Fetch room table
export const fetchRoomTable = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/room_data`)
        if (!response.ok) {
            throw new Error('Failed to fetch chart')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching chart:', error)
        return Promise.reject(error) // Propagate the error to the calling function
    }
}
