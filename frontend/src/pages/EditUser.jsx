import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../App.css";
import Sidebar from "../components/Sidebar";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    role_id: "",
  });

  const [roles, setRoles] = useState([]);

  // Get user details
  useEffect(() => {
    api
      .get(`/users/${id}`)
      .then((response) => {
        const user = response.data.data;

        setFormData({
          first_name: user.first_name || "",
          middle_name: user.middle_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          phone: user.phone || "",
          password: "",
          role_id: user.role_id || "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // Get roles
  useEffect(() => {
    api
      .get("/roles")
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdateUser = async () => {
    try {
      const response = await api.put(`/users/${id}`, formData);

      console.log(response.data);

      alert("User updated successfully");

      navigate("/users");
    } catch (error) {
      console.error(error);

      console.log("Backend error:", error.response?.data);

      alert(error.response?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="dashboard">

      <Sidebar activePage="users" />

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
                <h1>Edit User</h1>
                <p>Update user details</p>
              </div>

            </div>
          </div>

          <div className="user-form">

            <input
              type="text"
              placeholder="First Name"
              value={formData.first_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  first_name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Middle Name"
              value={formData.middle_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  middle_name: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  last_name: e.target.value,
                })
              }
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password (optional)"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            <select
              value={formData.role_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role_id: e.target.value,
                })
              }
            >
              <option value="">Select Role</option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.role_name}
                </option>
              ))}
            </select>

            <button
              className="save-button"
              onClick={handleUpdateUser}
            >
              Update User
            </button>

            <button
              className="cancel-button"
              onClick={() => navigate("/users")}
            >
              Cancel
            </button>

          </div>

        </main>

      </div>

    </div>
  );
}

export default EditUser;