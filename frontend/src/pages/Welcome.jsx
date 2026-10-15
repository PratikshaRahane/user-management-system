import { useNavigate } from "react-router-dom";
import "../App.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      <div className="welcome-card">
        <div className="welcome-icon">
          👥
        </div>

        <h1>Welcome to User Management</h1>

        <p>
          Manage users, roles and permissions
          easily from one place.
        </p>

        <button
          className="add-button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Welcome;