import { useEffect, useState } from "react";
import { User, Lock, Bell, Moon, LogOut, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "../components/Sidebar";

function Settings() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );
const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  navigate("/login");
};

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="dashboard">
      <Sidebar activePage="settings" />

      {/* Main Area */}
      <div className="main-area">
        <header className="top-header">
          <div className="profile">
            <div className="profile-circle">PR</div>
            <span>Pratiksha Rahane</span>
          </div>
        </header>

        <main className="page-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="page-title">
              <div className="page-title-icon">
                <User size={30} />
              </div>

              <div>
                <h1>Settings</h1>
                <p>Manage your account and application preferences</p>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="settings-card">
            <h2>Account Settings</h2>

            <p className="settings-description">
              Manage your account preferences and application settings.
            </p>

            {/* Change Password */}
            <div className="settings-option">
              <div className="settings-option-icon">
                <Lock size={20} />
              </div>

              <div className="settings-option-content">
                <h3>Change Password</h3>
                <p>Update your account password for better security.</p>
              </div>
              <button
                className="settings-action-button"
                onClick={() => navigate("/change-password")}
              >
                Change
              </button>
            </div>

            {/* Notifications */}
            <div className="settings-option">
              <div className="settings-option-icon">
                <Bell size={20} />
              </div>

              <div className="settings-option-content">
                <h3>Notifications</h3>
                <p>Receive notifications about your account.</p>
              </div>

              <label className="settings-toggle">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                />
                <span className="settings-slider"></span>
              </label>
            </div>

            {/* Theme */}
            <div className="settings-option">
              <div className="settings-option-icon">
                {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </div>

              <div className="settings-option-content">
                <h3>Theme</h3>
                <p>Choose your preferred application theme.</p>
              </div>

              <select
                className="theme-select"
                value={darkMode ? "dark" : "light"}
                onChange={(e) => setDarkMode(e.target.value === "dark")}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Logout */}
            <div className="settings-option">
              <div className="settings-option-icon logout-icon">
                <LogOut size={20} />
              </div>

              <div className="settings-option-content">
                <h3>Logout</h3>
                <p>Sign out from your account.</p>
              </div>

              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Settings;
