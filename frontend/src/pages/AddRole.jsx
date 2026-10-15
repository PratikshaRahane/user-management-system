import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";
import Sidebar from "../components/Sidebar";

function AddRole() {
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");

  const handleCreateRole = async () => {
    if (!roleName.trim()) {
      alert("Role name is required");
      return;
    }

    try {
      await api.post("/roles", {
        role_name: roleName,
      });

      alert("Role created successfully");

      navigate("/roles");
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to create role");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activePage="roles" />

      {/* Main Area */}
      <div className="main-area">
        {/* Header */}
        <header className="top-header">
          <div className="profile">
            <div className="profile-circle">PR</div>

            <span>Pratiksha Rahane</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <div className="page-header">
            <div className="page-title">
              <div>
                <h1>Add Role</h1>

                <p>Create a new user role</p>
              </div>
            </div>
          </div>

          {/* Role Form */}
          <div className="user-form">
            <input
              type="text"
              placeholder="Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />

            <button className="save-button" onClick={handleCreateRole}>
              Create Role
            </button>

            <button
              className="cancel-button"
              onClick={() => navigate("/roles")}
            >
              Cancel
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddRole;
