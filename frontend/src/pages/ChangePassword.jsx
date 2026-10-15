import { useState } from "react";
import api from "../services/api";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import Sidebar from "../components/Sidebar";

function ChangePassword() {
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("All password fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      const userId = localStorage.getItem("userId");
      const response = await api.put(`/users/${userId}/change-password`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      alert(response.data.message);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      navigate("/settings");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Password change failed");
    }
  };

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
          <div className="page-header">
            <div className="page-title">
              <div className="page-title-icon">
                <Lock size={30} />
              </div>

              <div>
                <h1>Change Password</h1>
                <p>Update your account password</p>
              </div>
            </div>
          </div>

          <div className="change-password-card">
            <h2>Change Password</h2>

            <p className="settings-description">
              Enter your current password and choose a new password.
            </p>

            <div className="change-password-fields">
              <div className="change-password-field">
                <label>Current Password</label>
                <div className="change-password-input-wrapper">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="change-password-eye"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="change-password-field">
                <label>New Password</label>

                <div className="change-password-input-wrapper">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="change-password-eye"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="change-password-field">
                <label>Confirm Password</label>

                <div className="change-password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    className="change-password-eye"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="change-password-actions">
              <button
                className="cancel-button"
                onClick={() => navigate("/settings")}
              >
                Cancel
              </button>
              <button
                className="settings-save-button"
                onClick={handleChangePassword}
              >
                Update Password
              </button>{" "}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ChangePassword;
