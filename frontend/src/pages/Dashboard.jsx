import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, Shield } from "lucide-react";
import api from "../services/api";
import "../App.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
   api
  .get("/users?page=1&limit=100")
  .then((response) => {
    console.log("Users API Response:", response.data);
    console.log("Users Array:", response.data.data.users);
    setUsers(response.data.data.users);
  })

      .catch((error) => {
        console.error(error);
      });

    api
      .get("/roles")
      .then((response) => {
        setRoles(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const activeUsers = users.filter((user) => user.is_active).length;

  const inactiveUsers = users.filter((user) => !user.is_active).length;

  const recentUsers = users.slice(0, 5);

  console.log("Recent Users:", recentUsers);

  return (
    <div className="dashboard">
      <Sidebar activePage="dashboard" />

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
                <h1>Dashboard</h1>
                <p>Overview of your user management system</p>
              </div>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <Users size={24} />
              </div>

              <div>
                <p>Total Users</p>
                <h2>{users.length}</h2>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <UserCheck size={24} />
              </div>

              <div>
                <p>Active Users</p>
                <h2>{activeUsers}</h2>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <UserX size={24} />
              </div>

              <div>
                <p>Inactive Users</p>
                <h2>{inactiveUsers}</h2>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="dashboard-card-icon">
                <Shield size={24} />
              </div>

              <div>
                <p>Total Roles</p>
                <h2>{roles.length}</h2>
              </div>
            </div>
          </div>

          <div className="table-card dashboard-recent">
            <div className="dashboard-section-title">
              <h2>Recent Users</h2>
              <p>Latest users added to the system</p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-users">
                      No users found
                    </td>
                  </tr>
                ) : (
                  recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="name-cell">
                        {user.first_name} {user.last_name}
                      </td>

                      <td>{user.email}</td>

                      <td>{user.role ? user.role.role_name : "No Role"}</td>

                      <td>
                        <span
                          className={
                            user.is_active ? "status active" : "status inactive"
                          }
                        >
                          <span className="status-dot"></span>

                          {user.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
