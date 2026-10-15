import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Menu,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import "../App.css";

function UserList() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const isAdmin = role === "Admin";

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");

  useEffect(() => {
    let url = `/users?page=${page}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}`;

    if (search && status) {
      url = `/users?search=${search}&is_active=${status}&page=${page}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    } else if (search) {
      url = `/users?search=${search}&page=${page}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    } else if (status) {
      url = `/users?is_active=${status}&page=${page}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}`;
    }

    setLoading(true);

    api
      .get(url)
      .then((response) => {
        setUsers(response.data.data.users);
        setTotalPages(response.data.data.totalPages);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, status, page, sortBy, sortOrder]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await api.delete(`/users/${id}`);

      console.log(response.data);

      alert("User deleted successfully");

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="dashboard">
      <Sidebar activePage="users" />

      {/* Main Area */}
      <div className="main-area">
        {/* Top Header */}
        <header className="top-header">
          <button className="menu-button">
            <Menu size={24} />
          </button>

          <div className="profile">
            <div className="profile-circle">PR</div>

            <span>Pratiksha Rahane</span>

            <UserCircle size={18} />
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {/* Page Heading */}
          <div className="page-header">
            <div className="page-title">
              <div className="page-title-icon">
                <Users size={30} />
              </div>

              <div>
                <h1>User Management</h1>
                <p>Manage your users and their roles</p>
              </div>
            </div>

            {isAdmin && (
              <button
                className="add-button"
                onClick={() => navigate("/add-user")}
              >
                <UserPlus size={18} />
                <span>Add User</span>
              </button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="filter-card">
            <div className="search-input-wrapper">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="created_at">Latest</option>
              <option value="first_name">Name</option>
              <option value="last_name">Last Name</option>
              <option value="email">Email</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>

          {/* Table */}
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="no-users">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-users">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="name-cell">
                        {user.first_name} {user.last_name}
                      </td>

                      <td>{user.email}</td>

                      <td>{user.phone}</td>

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

                      <td>
                        <button
                          className="edit-button"
                          title="Edit User"
                          onClick={() => navigate(`/edit-user/${user.id}`)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="delete-button"
                          title="Delete User"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Table Footer */}
            <div className="table-footer">
              <span>Showing {users.length} users</span>

              <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                  <ChevronLeft size={17} />
                  Previous
                </button>

                <span className="page-number">{page}</span>

                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserList;
