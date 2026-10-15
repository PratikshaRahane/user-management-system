import { LayoutDashboard, Users, Shield, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ activePage }) {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role === "Admin";

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <User size={22} />
        <span>User Management</span>
      </div>

      <nav className="sidebar-menu">
        <div
          className={`menu-item ${
            activePage === "dashboard" ? "active-menu" : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>

        {isAdmin && (
          <div
            className={`menu-item ${
              activePage === "users" ? "active-menu" : ""
            }`}
            onClick={() => navigate("/users")}
          >
            <Users size={18} />
            <span>Users</span>
          </div>
        )}

        <div
          className={`menu-item ${activePage === "roles" ? "active-menu" : ""}`}
          onClick={() => navigate("/roles")}
        >
          <Shield size={18} />
          <span>Roles</span>
        </div>

        <div
          className={`menu-item ${
            activePage === "settings" ? "active-menu" : ""
          }`}
          onClick={() => navigate("/settings")}
        >
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
