import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9199/auth/login', {
        username,
        password
      });

      const token = response.data;

      localStorage.setItem('token', token);

      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 500,
      });

      // Delay navigation to allow toast to display
      setTimeout(() => {
        navigate('/take-quiz');
      }, 1000);

    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      setError('Invalid username or password!');
      toast.error('Invalid username or password!', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #56ab2f, #a8e063)',
        fontFamily: "'Poppins', sans-serif",
        paddingTop: '60px',
      }}
    >
      <ToastContainer />

      <header className="text-center mb-5">
        <h1 className="fw-bold text-white">Welcome Back to Quizora</h1>
        <p className="text-white-50 fs-5">Please login to continue</p>
      </header>

      <div className="d-flex justify-content-center">
        <div
          className="card p-5 shadow border-0 w-100"
          style={{
            maxWidth: '400px',
            borderRadius: '1rem',
            backgroundColor: '#ffffffee',
          }}
        >
          <h4 className="text-center mb-4 text-dark">Login to Your Account</h4>

          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label className="form-label text-dark">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>

            <div className="form-group mb-4">
              <label className="form-label text-dark">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 fw-bold shadow-sm"
            >
              Login
            </button>

            {/* Optional inline error message (can be removed if using toast only) */}
            {error && (
              <div className="alert alert-danger mt-3 text-center" role="alert">
                {error}
              </div>
            )}
          </form>

          <p className="mt-4 text-center text-secondary">
            Don't have an account?{' '}
            <a href="/register" className="text-success fw-semibold">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
