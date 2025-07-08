import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizQuestions, totalScores } = location.state;

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const numOfQuestions = quizQuestions.length;
  const percentage = Math.round((totalScores / numOfQuestions) * 100);

  const handleRetakeQuiz = () => {
    navigate('/take-quiz');
  };

  useEffect(() => {
    // Optional: watch for theme changes
    const observer = new MutationObserver(() => {
      const theme = localStorage.getItem("theme");
      setIsDark(theme === "dark");
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`container mt-5 px-3 px-md-5 ${isDark ? "text-light" : "text-dark"}`}>
      <div className={`p-5 rounded-4 shadow text-center ${isDark ? "bg-dark" : "bg-light"}`}>
        <h2 className="text-success mb-3">🎉 Quiz Completed!</h2>
        <hr className="w-50 mx-auto" />

        <h5 className="mb-3">
          ✅ You answered <span className="text-primary">{totalScores}</span> out of{" "}
          <span className="text-primary">{numOfQuestions}</span> questions correctly.
        </h5>

        <p className="lead">
          Your total score is:{" "}
          <span className={`fw-bold ${percentage >= 60 ? "text-success" : "text-danger"}`}>
            {percentage}%
          </span>
        </p>

        <div className="mt-4">
          <button className="btn btn-outline-primary px-4 py-2" onClick={handleRetakeQuiz}>
            🔄 Retake This Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
