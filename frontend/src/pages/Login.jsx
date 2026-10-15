import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      const response = await api.post("/login", {
        email: email,
        password: password,
      });

      const user = response.data.data;

      localStorage.setItem("userId", user.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", user.role?.role_name);


      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      setLoginError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">👤</div>

        <h1>Login</h1>

        <p>Sign in to your account</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError("");
            setLoginError("");
          }}
        />

        {emailError && <div className="login-error">{emailError}</div>}

        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError("");
              setLoginError("");
            }}
          />

          <button
            type="button"
            className="password-eye"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {passwordError && <div className="login-error">{passwordError}</div>}

        {loginError && (
          <div className="login-error login-main-error">{loginError}</div>
        )}

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
