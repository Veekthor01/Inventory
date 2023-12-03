import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import NavigationMenu from './components/NavigationMenu';
import Sidebar from './components/Sidebar';
import ComputerPage from './pages/Computer/ComputerPage';
import ComponentPage from './pages/Component/ComponentPage';
import AccessoryPage from './pages/Accessory/AccessoryPage';
import PersonnelPage from './pages/Personnel/PersonnelPage';
import SuppliersPage from './pages/Supplier/SupplierPage';
import DepartmentsPage from './pages/Department/DepartmentPage';
import LicensesPage from './pages/License/LicensePage';
import CategoriesPage from './pages/Category/CategoryPage';
import ActivityHistoryPage from './pages/Reports/ActivityHistoryPage';
import MaintenancePage from './pages/Reports/Maintenance/MaintenancePage';
import AddComputer from './pages/Computer/addComputer'; 
import UpdateComputer from './pages/Computer/updateComputer';
import AddAccessory from './pages/Accessory/addAccessory';
import UpdateAccessory from './pages/Accessory/updateAccessory';
import AddComponent from './pages/Component/addComponent';
import UpdateComponent from './pages/Component/updateComponent';
import AddPersonnel from './pages/Personnel/addPersonnel';
import UpdatePersonnel from './pages/Personnel/updatePersonnel';
import AddSupplier from './pages/Supplier/addSupplier';
import UpdateSupplier from './pages/Supplier/updateSupplier';
import AddDepartment from './pages/Department/addDepartment';
import UpdateDepartment from './pages/Department/updateDepartment';
import AddLicense from './pages/License/addLicense';
import UpdateLicense from './pages/License/updateLicense';
import AddCategory from './pages/Category/addCategory';
import UpdateCategory from './pages/Category/updateCategory';
import AddMaintenance from './pages/Reports/Maintenance/addMaintenance';
import UpdateMaintenance from './pages/Reports/Maintenance/updateMaintenance';
import NotFoundPage from './components/Not-FoundPage';
import LoginPage from './components/Admin/LoginPage';
import ChangePassword from './components/Admin/ChangePassword';
import Logout from './components/Admin/Logout';
import ProfilePage  from './components/Admin/ProfilePage';
import Footer from './components/Footer';
import styles from './pages/login.module.css';

//* Main App component responsible for handling routing and rendering the app content.
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

//* AppContent component responsible for rendering the app layout based on the current route.
  function AppContent() {
    // Get the current location from the router.
  const location = useLocation();
  // Check if the current page is the login page or not found page.
  const isLoginPage = location.pathname === '/login';
  const isNotFoundPage = location.pathname === '/not-found';
  const isComputerPage = location.pathname === '/computers';

  // Render the following style if the current page is the login page.
  if (isLoginPage) {
    return (
          <div className={styles.loginPage}>
            <LoginPage />
          </div>
    );
  }
  // Render the main layout with navigation menu, sidebar, and content.
  return (
    <>
    {(!isLoginPage && !isComputerPage) ? <NavigationMenu /> : null}

      <div className="container">
      {!isLoginPage && !isNotFoundPage && <Sidebar />}

        <div className="content">
          <Routes>
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/computers" element={<ComputerPage />} />
            <Route path="/computers/add" element={<AddComputer />} />
            <Route path="/computers/update" element={<UpdateComputer />} />
            <Route path="/components" element={<ComponentPage />} />
            <Route path="/components/add" element={<AddComponent />} /> 
            <Route path="/components/update" element={<UpdateComponent />} />
            <Route path="/accessories" element={<AccessoryPage />} />
            <Route path="/accessories/add" element={<AddAccessory />} />
            <Route path="/accessories/update" element={<UpdateAccessory />} />
            <Route path="/personnel" element={<PersonnelPage />} />
            <Route path="/personnel/add" element={<AddPersonnel />} />
            <Route path="/personnel/update" element={<UpdatePersonnel />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/suppliers/add" element={<AddSupplier />} />
            <Route path="/suppliers/update" element={<UpdateSupplier />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/departments/add" element={<AddDepartment />} />
            <Route path="/departments/update" element={<UpdateDepartment />} />
            <Route path="/licenses" element={<LicensesPage />} />
            <Route path="/licenses/add" element={<AddLicense />} />
            <Route path="/licenses/update" element={<UpdateLicense />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/add" element={<AddCategory />} />
            <Route path="/categories/update" element={<UpdateCategory />} />
            <Route path="/reports/activity-history" element={<ActivityHistoryPage />} />
            <Route path="/reports/maintenance" element={<MaintenancePage />} />
            <Route path="/reports/maintenance/add" element={<AddMaintenance />} />
            <Route path="/reports/maintenance/update" element={<UpdateMaintenance />} />
            <Route path="/not-found" element={<NotFoundPage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </div>
      {!isLoginPage && !isNotFoundPage && <Footer />}
      </>
  );
}



export default App;
