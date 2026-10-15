import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserList from "./pages/UserList";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

import Roles from "./pages/Roles";
import AddRole from "./pages/AddRole";
import EditRole from "./pages/EditRole";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}

        <Route path="/" element={<Welcome />} />

        <Route path="/login" element={<Login />} />

        {/* Protected Pages */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        />

        <Route
          path="/add-user"
          element={
            <AdminRoute>
              <AddUser />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-user/:id"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />

        <Route
          path="/roles"
          element={
            <ProtectedRoute>
              <Roles />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-role"
          element={
            <AdminRoute>
              <AddRole />
            </AdminRoute>
          }
        />

        <Route
          path="/edit-role/:id"
          element={
            <AdminRoute>
              <EditRole />
            </AdminRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
