import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../components/css/auth.css";
import notifyService from "../services/notify.service";

const Login: React.FC = () => {
  const [email, setEmail] = useState("user@user.com");
  const [password, setPassword] = useState("user");
  const { login } = useContext(AuthContext);
  const { isAuthenticated, checkAuthentication } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
    if (isAuthenticated) navigate("/store");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login({ email, password });
      notifyService.showSuccessNotification("Successful login");
    } catch (error) {
      notifyService.showErrorNotification("Wrong credentials");
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
