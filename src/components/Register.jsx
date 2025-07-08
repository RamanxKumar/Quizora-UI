import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Role logic based on username
        const adjustedData = {
          ...formData,
          role: formData.username.trim().toLowerCase() === 'quizoraa' ? 'ROLE_ADMIN' : 'ROLE_USER'
        };

        await axios.post('https://quizora-server-production-4047.up.railway.app/auth/register', adjustedData);

        console.log('Registration successful!');
        navigate('/login');
      } catch (err) {
        console.error('Registration failed:', err.response?.data || err.message);
        setServerError(err.response?.data || 'Registration failed');
      }
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #74ebd5, #acb6e5)',
        fontFamily: "'Poppins', sans-serif",
        padding: '20px',
      }}
    >
      <header className="text-center mb-4">
        <h1 className="fw-bold text-dark">Fill the Form to Register</h1>
      </header>

      <div className="d-flex justify-content-center">
        <div
          className="card p-5 shadow border-0 w-100"
          style={{
            maxWidth: '400px',
            borderRadius: '1rem',
            backgroundColor: '#ffffffdd',
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group mb-3">
              <label className="form-label text-dark">Username</label>
              <input
                type="text"
                name="username"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-dark">Email</label>
              <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              <div className="invalid-feedback">{errors.email}</div>
            </div>

            <div className="form-group mb-3">
              <label className="form-label text-dark">Phone</label>
              <input
                type="tel"
                name="phone"
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your 10-digit phone number"
                required
              />
              <div className="invalid-feedback">{errors.phone}</div>
            </div>

            <div className="form-group mb-4">
              <label className="form-label text-dark">Password</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <div className="invalid-feedback">{errors.password}</div>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold shadow-sm">
              Register
            </button>

            {serverError && (
              <div className="alert alert-danger mt-3 text-center" role="alert">
                {serverError}
              </div>
            )}
          </form>

          <p className="mt-4 text-center text-dark">
            Already have an account?{' '}
            <a href="/login" className="text-primary fw-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
