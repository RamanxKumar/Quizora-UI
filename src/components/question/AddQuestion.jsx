import React, { useState, useEffect } from "react";
import { createQuestion, getSubjects } from "../../utils/QuizService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Toastify import

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState("single");
  const [choices, setChoices] = useState([""]);
  const [correctAnswers, setCorrectAnswers] = useState([""]);
  const [subject, setSubject] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([""]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectData = await getSubjects();
      setSubjectOptions(subjectData);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const handleAddChoice = () => {
    const lastChoice = choices[choices.length - 1];
    const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A";
    const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1);
    setChoices([...choices, `${newChoiceLetter}.`]);
  };

  const handleRemoveChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleChoiceChange = (index, value) => {
    setChoices(choices.map((choice, i) => (i === index ? value : choice)));
  };

  const handleCorrectAnswerChange = (index, value) => {
    setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
  };

  const handleAddCorrectAnswer = () => {
    setCorrectAnswers([...correctAnswers, ""]);
  };

  const handleRemoveCorrectAnswer = (index) => {
    setCorrectAnswers(correctAnswers.filter((_, i) => i !== index));
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubject(newSubject.trim());
      setSubjectOptions([...subjectOptions, newSubject.trim()]);
      setNewSubject("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = {
        question,
        questionType,
        choices,
        correctAnswers: correctAnswers.map((answer) => {
          const choiceLetter = answer.charAt(0).toUpperCase();
          const choiceIndex = choiceLetter.charCodeAt(0) - 65;
          return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null;
        }),
        subject,
      };

      await createQuestion(result);

      // ✅ Show toast success
      toast.success("Question saved successfully!");

      // Reset form
      setQuestion("");
      setQuestionType("single");
      setChoices([""]);
      setCorrectAnswers([""]);
      setSubject("");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to save question.");
    }
  };

  const bgStyle = darkMode
    ? { backgroundColor: "#121212", minHeight: "100vh", paddingTop: "30px" }
    : {
        background: "linear-gradient(135deg, #e0f7fa 0%, #80deea 50%, #4dd0e1 100%)",
        minHeight: "100vh",
        paddingTop: "30px",
      };

  return (
    <div style={bgStyle}>
      <div className="container">
        <div className="d-flex justify-content-end mb-3">
          <button
            className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className={`card shadow-sm ${darkMode ? "bg-dark text-light" : ""}`}>
              <div className={`card-header ${darkMode ? "bg-secondary text-light" : "bg-info text-white"}`}>
                <h5 className="card-title mb-0 text-center">Add New Question</h5>
              </div>

              <div className="card-body">
                <form onSubmit={handleSubmit} className="p-2">
                  {/* Subject Select */}
                  <div className="mb-3">
                    <label className={`form-label fw-semibold ${darkMode ? "text-info" : "text-primary"}`}>
                      Select a Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`form-select ${darkMode ? "bg-secondary text-light" : ""}`}
                    >
                      <option value={""}>Select a Subject</option>
                      <option value={"New"}>Add New Subject</option>
                      {subjectOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {subject === "New" && (
                    <div className="mb-3">
                      <label className={`form-label fw-semibold ${darkMode ? "text-info" : "text-primary"}`}>
                        Add a New Subject
                      </label>
                      <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className={`form-control ${darkMode ? "bg-secondary text-light" : ""}`}
                      />
                      <button type="button" className="btn btn-outline-primary btn-sm mt-2" onClick={handleAddSubject}>
                        Add Subject
                      </button>
                    </div>
                  )}

                  {/* Question Field */}
                  <div className="mb-2">
                    <label className={`form-label fw-semibold ${darkMode ? "text-info" : "text-primary"}`}>
                      Question
                    </label>
                    <textarea
                      className={`form-control ${darkMode ? "bg-secondary text-light" : ""}`}
                      rows={4}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>

                  {/* Question Type */}
                  <div className="mb-3">
                    <label className={`form-label fw-semibold ${darkMode ? "text-info" : "text-primary"}`}>
                      Question Type
                    </label>
                    <select
                      className={`form-select ${darkMode ? "bg-secondary text-light" : ""}`}
                      value={questionType}
                      onChange={(e) => setQuestionType(e.target.value)}
                    >
                      <option value="single">Single Answer</option>
                      <option value="multiple">Multiple Answers</option>
                    </select>
                  </div>

                  {/* Choices */}
                  <div>
                    <label className={`form-label fw-semibold ${darkMode ? "text-info" : "text-primary"}`}>
                      Choices
                    </label>
                    {choices.map((choice, index) => (
                      <div className="input-group mb-3" key={index}>
                        <input
                          className={`form-control ${darkMode ? "bg-secondary text-light" : ""}`}
                          type="text"
                          value={choice}
                          onChange={(e) => handleChoiceChange(index, e.target.value)}
                        />
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveChoice(index)}>
                          Remove
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleAddChoice}>
                      Add Choice
                    </button>
                  </div>

                  {/* Correct Answers */}
                  {questionType === "single" && (
                    <div className="mb-3">
                      <label className={`form-label fw-semibold ${darkMode ? "text-info" : "text-primary"}`}>
                        Correct Answer
                      </label>
                      <input
                        className={`form-control ${darkMode ? "bg-secondary text-light" : ""}`}
                        type="text"
                        value={correctAnswers[0]}
                        onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                      />
                    </div>
                  )}

                  {questionType === "multiple" && (
                    <div className="mb-3">
                      <label className={`form-label fw-semibold ${darkMode ? "text-info" : "text-primary"}`}>
                        Correct Answer(s)
                      </label>
                      {correctAnswers.map((answer, index) => (
                        <div key={index} className="mb-2 d-flex align-items-center">
                          <input
                            className={`form-control ${darkMode ? "bg-secondary text-light" : ""}`}
                            type="text"
                            value={answer}
                            onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                          />
                          {index > 0 && (
                            <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleRemoveCorrectAnswer(index)}>
                              Remove
                            </button>
                          )}
                        </div>
                      ))}
                      <button type="button" className="btn btn-outline-info" onClick={handleAddCorrectAnswer}>
                        Add Correct Answer
                      </button>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="btn-group">
                    <button type="submit" className="btn btn-outline-success me-2">
                      Save Question
                    </button>
                    <Link to={"/all-quizzes"} className="btn btn-outline-primary ml-2">
                      Back to existing questions
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
