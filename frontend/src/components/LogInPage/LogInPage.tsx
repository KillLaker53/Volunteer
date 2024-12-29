import React, { useState } from "react";
import './LogInPage.css'; 
import { loginUser } from "../../api/UserApi";
import { useNavigate } from "react-router-dom";

const LogInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await loginUser(email, password);
      setEmail('');
      setPassword('');
      localStorage.setItem('token', response.token);
      navigate('/');

    } catch (err) {
      console.error("Login failed", err);
      setError('Email or password is incorrect.'); 
      setPassword(''); 
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && 
          <div className="error-bubble">{error}</div>} 
          
          <button className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
          <button
            className="register-button"
            onClick={handleRegisterRedirect}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
