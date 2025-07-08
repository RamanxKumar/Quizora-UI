import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public Components
import Home from "./components/Home";
import QuizStepper from "./components/quiz/QuizStepper";
import Quiz from "./components/quiz/Quiz";
import QuizResult from "./components/quiz/QuizResult";
import Login from "./components/Login";
import Register from "./components/Register";

// Admin Components
import Admin from "./components/Admin";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import AddQuestion from "./components/question/AddQuestion";
import UpdateQuestion from "./components/question/UpdateQuestion";

// Layout
import NavBar from "./components/layout/NavBar";
import PrivateRoute from "./components/layout/ProtectedRoute";

function App() {
  return (
    <main className="container-fluid p-0 m-0">
      <Router>
        <NavBar />

        {/* ✅ Global Toast Container */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Routes>
          {/* ✅ Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/take-quiz" element={<Quiz />} />
          <Route path="/quiz-stepper" element={<QuizStepper />} />
          <Route path="/quiz-result" element={<QuizResult />} />

          {/* 🔒 Admin-only routes */}
          <Route
            path="/admin"
            element={<PrivateRoute element={Admin} allowedRoles={["ROLE_ADMIN"]} />}
          />
          <Route
            path="/create-quiz"
            element={<PrivateRoute element={AddQuestion} allowedRoles={["ROLE_ADMIN"]} />}
          />
          <Route
            path="/update-quiz/:id"
            element={<PrivateRoute element={UpdateQuestion} allowedRoles={["ROLE_ADMIN"]} />}
          />
          <Route
            path="/all-quizzes"
            element={<PrivateRoute element={GetAllQuiz} allowedRoles={["ROLE_ADMIN"]} />}
          />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
