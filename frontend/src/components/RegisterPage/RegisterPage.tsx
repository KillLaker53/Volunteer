import React, { useState } from "react";
import "./RegisterPage.css"
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/UserApi";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        phone: "",

    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
          setError("Username and Password are required!");
          return;
        }
        setError("");
        try{
            const response = await registerUser(formData.username, formData.password, formData.email, formData.firstName, formData.lastName, formData.phone);
            localStorage.setItem('token', response.token);
            const userData = JSON.stringify(response.data);
            localStorage.setItem('userData', userData);
            navigate('/');
        }catch(err){
            setError(`${err}`);
        }
      };

    return (
      <div className="register-page">
        <div className="register-box">
          <h2>Register</h2>
          {error && <div className="error-bubble">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="register-button">
              Register
            </button>
          </form>
        </div>
      </div>
    );
};

export default RegisterPage;    