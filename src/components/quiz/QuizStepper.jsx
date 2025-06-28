import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../../utils/QuizService";

const QuizStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedNumQuestions, setSelectedNumQuestions] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        const subjectsData = await getSubjects();
        setSubjects(subjectsData);
      } catch (err) {
        console.error("Error loading subjects:", err);
        setError("Failed to load subjects.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, []);

  const handleNext = () => {
    if (currentStep === 3) {
      if (selectedSubject && selectedNumQuestions) {
        navigate("/take-quiz", {
          state: { selectedNumQuestions, selectedSubject },
        });
      } else {
        alert("Please select a subject and number of questions.");
      }
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleNumQuestionsChange = (event) => {
    setSelectedNumQuestions(event.target.value);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="mb-4">
            <h4 className="text-info mb-3">I want to take a quiz on :</h4>
            <select
              className="form-select form-select-lg"
              value={selectedSubject}
              onChange={handleSubjectChange}
              disabled={loading || error}
            >
              <option value="">Select a subject</option>
              {Array.isArray(subjects) &&
                subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
            </select>
            {loading && <p className="text-muted mt-2">Loading subjects...</p>}
            {error && <p className="text-danger mt-2">{error}</p>}
          </div>
        );

      case 2:
        return (
          <div className="mb-4">
            <h4 className="text-info mb-3">
              How many questions would you like to attempt?
            </h4>
            <input
              type="number"
              className="form-control form-control-lg"
              value={selectedNumQuestions}
              onChange={handleNumQuestionsChange}
              placeholder="Enter number of questions"
            />
          </div>
        );

      case 3:
        return (
          <div className="text-start mb-4">
            <h4 className="text-success">Confirmation</h4>
            <hr />
            <p>
              <strong>Subject:</strong> {selectedSubject}
            </p>
            <p>
              <strong>Number of Questions:</strong> {selectedNumQuestions}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    const progress = currentStep === 3 ? 100 : ((currentStep - 1) / 2) * 100;
    return (
      <div className="progress mb-4">
        <div
          className="progress-bar progress-bar-striped bg-info"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
        >
          Step {currentStep}
        </div>
      </div>
    );
  };

  return (
    <section className="container mt-5 px-3 px-md-5">
      <div className="bg-light rounded-4 p-4 shadow-lg">
        <h2 className="text-center mb-4 text-secondary">
          🎯 Welcome to Quiz Online
        </h2>
        {renderProgressBar()}
        <div className="card border-0 shadow-sm">
          <div className="card-body">{renderStepContent()}</div>
          <div className="card-footer bg-white d-flex justify-content-between">
            {currentStep > 1 && (
              <button
                className="btn btn-outline-secondary"
                onClick={handlePrevious}
              >
                ⬅ Previous
              </button>
            )}
            {currentStep < 3 && (
              <button
                className="btn btn-primary ms-auto"
                onClick={handleNext}
                disabled={
                  (currentStep === 1 && !selectedSubject) ||
                  (currentStep === 2 && !selectedNumQuestions)
                }
              >
                Next ➡
              </button>
            )}
            {currentStep === 3 && (
              <button
                className="btn btn-success ms-auto"
                onClick={handleNext}
              >
                🚀 Start Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizStepper;
