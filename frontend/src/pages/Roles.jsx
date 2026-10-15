import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Pencil, Trash2 } from "lucide-react";
import api from "../services/api";
import "../App.css";
import Sidebar from "../components/Sidebar";

function Roles() {
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role === "Admin";

  const getRoles = () => {
    api
      .get("/roles")
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this role?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/roles/${id}`);

      alert("Role deleted successfully");

      getRoles();
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to delete role");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activePage="roles" />

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
                <Users size={30} />
              </div>

              <div>
                <h1>Roles</h1>
                <p>Manage user roles</p>
              </div>
            </div>
            {isAdmin && (
              <button
                className="save-button"
                onClick={() => navigate("/add-role")}
              >
                Add Role
              </button>
            )}
          </div>

          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Role Name</th>
                  {isAdmin && <th>Actions</th>}
                </tr>
              </thead>

              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td className="name-cell">{role.role_name}</td>
                    {isAdmin && (
                      <td>
                        <button
                          className="edit-button"
                          title="Edit Role"
                          onClick={() => navigate(`/edit-role/${role.id}`)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="delete-button"
                          title="Delete Role"
                          onClick={() => handleDelete(role.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Roles;
