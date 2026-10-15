import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../App.css";
import Sidebar from "../components/Sidebar";

function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    api
      .get("/roles")
      .then((response) => {
        const roles = response.data.data;

        const role = roles.find((item) => item.id === id);

        if (role) {
          setRoleName(role.role_name);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleUpdateRole = async () => {
    if (!roleName.trim()) {
      alert("Role name is required");
      return;
    }

    try {
      await api.put(`/roles/${id}`, {
        role_name: roleName,
      });

      alert("Role updated successfully");

      navigate("/roles");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Failed to update role"
      );
    }
  };

  return (
    <div className="dashboard">

    <Sidebar activePage="roles" />
      <div className="main-area">
        <header className="top-header">
          <div className="profile">
            <div className="profile-circle">
              PR
            </div>

            <span>Pratiksha Rahane</span>
          </div>
        </header>

        <main className="page-content">
          <div className="page-header">
            <div className="page-title">
              <div>
                <h1>Edit Role</h1>
                <p>Update role details</p>
              </div>
            </div>
          </div>

          <div className="user-form">
            <input
              type="text"
              placeholder="Role Name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />

            <button
              className="save-button"
              onClick={handleUpdateRole}
            >
              Update Role
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

export default EditRole;