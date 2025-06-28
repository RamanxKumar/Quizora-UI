import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // manually toggle or connect to real auth

  const handleAuth = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top left, #1a1a2e, #16213e)',
        color: '#f1f1f1',
        fontFamily: "'Poppins', sans-serif",
        paddingTop: '100px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div className="container text-center">
        <h1 className="mb-4 fw-bold display-4 text-white shadow-sm">
          Welcome to <span style={{ color: '#00adb5' }}>Quizora</span>
        </h1>

        <h2
          className="mb-3"
          style={{
            fontWeight: '600',
            letterSpacing: '0.8px',
            color: '#f8f9fa',
            textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
          }}
        >
          Quiz for Everyone
        </h2>

        <div className="mt-5">
          {isLoggedIn ? (
            <>
              <p className="lead text-success">
                You're logged in. Enjoy the quiz experience!
              </p>
              <button
                className="btn btn-outline-warning px-4 py-2 mt-3 shadow-sm"
                onClick={handleAuth}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <p className="lead text-info">You are not logged in yet.</p>
              <Link
                to="/login"
                className="btn btn-info px-4 py-2 me-3 shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline-light px-4 py-2 shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
