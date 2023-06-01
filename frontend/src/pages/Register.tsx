import React, { useContext, useEffect, useState } from "react";
import { AuthContext, useAuthContext } from "../context/AuthContext";
import "../components/css/auth.css";
import notifyService from "../services/notify.service";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const { register } = useAuthContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/store");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ username, email, password });
      notifyService.showSuccessNotification(
        `${username} created successfully `
      );
    } catch (error) {
      notifyService.showErrorNotification(`${username} not created `);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form className="auth-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label className="label">Username:</label>
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Email:</label>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="label">Password:</label>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
