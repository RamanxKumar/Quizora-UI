import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import QuizStepper from "./components/quiz/QuizStepper";
import Quiz from "./components/quiz/Quiz";
import QuizResult from "./components/quiz/QuizResult";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import AddQuestion from "./components/question/AddQuestion";
import UpdateQuestion from "./components/question/UpdateQuestion";
import NavBar from "./components/layout/NavBar";
import Admin from "./components/Admin";
import Login from "./components/Login"; // ✅ Corrected import
import Register from "./components/Register"; // ✅ Corrected import


function App() {
  return (
    <main className="container-fluid p-0 m-0">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz-stepper" element={<QuizStepper />} />
          <Route path="/take-quiz" element={<Quiz />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/create-quiz" element={<AddQuestion />} />
          <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
          <Route path="/all-quizzes" element={<GetAllQuiz />} />
          <Route path="/quiz-result" element={<QuizResult />} />
          <Route path="/login" element={<Login />} /> {/* ✅ Added route */}
          {/* New Register Route */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
