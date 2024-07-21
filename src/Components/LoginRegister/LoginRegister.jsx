import React, { useState } from 'react';
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const LoginRegister = () => {
  const [action, setAction] = useState('');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [formVisible, setFormVisible] = useState(true); 

  const registerLink = () => {
    setAction('active');
    setSuccessMessage('');
    setFormVisible(true);
  };

  const loginLink = () => {
    setAction('');
    setSuccessMessage('');
    setFormVisible(true);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!loginData.username) {
      errors.username = 'Username is required';
    }
    if (!loginData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(loginData.password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Login successful!');
      setFormVisible(false);
    } else {
      setSuccessMessage('');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!registerData.username) {
      errors.username = 'Username is required';
    }
    if (!registerData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(registerData.email)) {
      errors.email = 'Email is not valid';
    }
    if (!registerData.password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(registerData.password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Registration successful!');
      setFormVisible(false); 
    } else {
      setSuccessMessage('');
    }
  };

  return (
    <div className={`wrapper ${action}`}>
      {successMessage && !formVisible && <div className="success-message">{successMessage}</div>}
      {formVisible && (
        <>
          <div className={`form-box login ${!action ? 'active' : ''}`}>
            <form onSubmit={handleLoginSubmit}>
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                />
                <FaUser className='icon' />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                />
                <FaLock className='icon' />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="remember-forgot">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot Password</a>
              </div>
              <button type="submit">Login</button>

              <div className="register-link">
                <p>Don't have an account? <a href="#" onClick={registerLink}>Register</a></p>
              </div>
            </form>
          </div>

          <div className={`form-box register ${action ? 'active' : ''}`}>
            <form onSubmit={handleRegisterSubmit}>
              <h1>Register</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={registerData.username}
                  onChange={handleRegisterChange}
                />
                <FaUser className='icon' />
                {errors.username && <span className="error">{errors.username}</span>}
              </div>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                />
                <FaEnvelope className='icon' />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                />
                <FaLock className='icon' />
                {errors.password && <span className="error">{errors.password}</span>}
              </div>

              <div className="remember-forgot">
                <label><input type="checkbox" />I agree to the terms & conditions</label>
              </div>
              <button type="submit">Register</button>

              <div className="register-link">
                <p>Already have an account? <a href="#" onClick={loginLink}>Login</a></p>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginRegister;
