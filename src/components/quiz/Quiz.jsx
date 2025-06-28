import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuizForUser } from "../../utils/QuizService";
import AnswerOptions from "../../utils/AnswerOptions";

const Quiz = () => {
	const [quizQuestions, setQuizQuestions] = useState([]);
	const [selectedAnswers, setSelectedAnswers] = useState([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [totalScores, setTotalScores] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();

	const selectedSubject = location?.state?.selectedSubject || "";
	const selectedNumQuestions = location?.state?.selectedNumQuestions || "";

	useEffect(() => {
		if (selectedNumQuestions && selectedSubject) {
			fetchQuizData();
		} else {
			// If no state found — redirect to quiz-stepper
			navigate("/quiz-stepper");
		}
	}, []);

	const fetchQuizData = async () => {
		try {
			const questions = await fetchQuizForUser(selectedNumQuestions, selectedSubject);
			if (questions && Array.isArray(questions)) {
				setQuizQuestions(questions);
			} else {
				console.error("Invalid quiz data", questions);
				setQuizQuestions([]);
			}
		} catch (error) {
			console.error("Error fetching quiz:", error);
			setQuizQuestions([]);
		}
	};

	const handleAnswerChange = (questionId, answer) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.id === questionId);
			const selectedAnswer = Array.isArray(answer)
				? answer.map((a) => a.charAt(0))
				: answer.charAt(0);

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers];
				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: selectedAnswer };
				return updatedAnswers;
			} else {
				return [...prevAnswers, { id: questionId, answer: selectedAnswer }];
			}
		});
	};

	const isChecked = (questionId, choice) => {
		const selectedAnswer = selectedAnswers.find((ans) => ans.id === questionId);
		if (!selectedAnswer) return false;

		if (Array.isArray(selectedAnswer.answer)) {
			return selectedAnswer.answer.includes(choice.charAt(0));
		}
		return selectedAnswer.answer === choice.charAt(0);
	};

	const handleCheckboxChange = (questionId, choice) => {
		setSelectedAnswers((prevAnswers) => {
			const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.id === questionId);
			const selectedOption = choice.charAt(0);

			if (existingAnswerIndex !== -1) {
				const updatedAnswers = [...prevAnswers];
				const existingAnswer = updatedAnswers[existingAnswerIndex].answer;

				let newAnswer;
				if (Array.isArray(existingAnswer)) {
					newAnswer = existingAnswer.includes(selectedOption)
						? existingAnswer.filter((a) => a !== selectedOption)
						: [...existingAnswer, selectedOption];
				} else {
					newAnswer = [existingAnswer, selectedOption];
				}

				updatedAnswers[existingAnswerIndex] = { id: questionId, answer: newAnswer };
				return updatedAnswers;
			} else {
				return [...prevAnswers, { id: questionId, answer: [selectedOption] }];
			}
		});
	};

	const handleSubmit = () => {
		let scores = 0;

		quizQuestions.forEach((question) => {
			const selectedAnswer = selectedAnswers.find((ans) => ans.id === question.id);
			if (selectedAnswer) {
				const selectedOptions = Array.isArray(selectedAnswer.answer)
					? selectedAnswer.answer.map((opt) => opt.charAt(0))
					: [selectedAnswer.answer.charAt(0)];

				const correctOptions = Array.isArray(question.correctAnswers)
					? question.correctAnswers.map((opt) => opt.charAt(0))
					: [question.correctAnswers.charAt(0)];

				const isCorrect =
					selectedOptions.length === correctOptions.length &&
					selectedOptions.every((opt) => correctOptions.includes(opt));

				if (isCorrect) scores++;
			}
		});

		setTotalScores(scores);
		setSelectedAnswers([]);
		setCurrentQuestionIndex(0);
		navigate("/quiz-result", { state: { quizQuestions, totalScores: scores } });
	};

	const handleNextQuestion = () => {
		if (currentQuestionIndex < quizQuestions.length - 1) {
			setCurrentQuestionIndex((prev) => prev + 1);
		} else {
			handleSubmit();
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex((prev) => prev - 1);
		}
	};

	if (!quizQuestions || quizQuestions.length === 0) {
		return (
			<div className="container mt-5 text-center">
				<h5 className="text-muted">Loading quiz... Please wait.</h5>
			</div>
		);
	}

	return (
		<div className="container mt-5 px-3 px-md-5">
			<div className="bg-light rounded-4 shadow p-4">
				<h4 className="text-center text-secondary mb-4">
					📝 Quiz on: <span className="text-primary">{selectedSubject}</span>
				</h4>

				<div className="d-flex justify-content-between align-items-center mb-3">
					<h5 className="text-info mb-0">
						Question {quizQuestions.length > 0 ? currentQuestionIndex + 1 : 0} of {quizQuestions.length}
					</h5>
					<span className="badge bg-warning text-dark px-3 py-2">
						{/* Score: {totalScores}/{quizQuestions.length} */}
					</span>
				</div>

				<div className="card border-0 shadow-sm mb-4">
					<div className="card-body">
						<h5 className="mb-3">
							<pre className="mb-0">{quizQuestions[currentQuestionIndex]?.question}</pre>
						</h5>

						<AnswerOptions
							question={quizQuestions[currentQuestionIndex]}
							isChecked={isChecked}
							handleAnswerChange={handleAnswerChange}
							handleCheckboxChange={handleCheckboxChange}
						/>
					</div>
				</div>

				<div className="d-flex justify-content-between mt-4">
					<button
						className="btn btn-outline-secondary"
						onClick={handlePreviousQuestion}
						disabled={currentQuestionIndex === 0}>
						⬅ Previous
					</button>
					<button
						className={`btn ${
							currentQuestionIndex === quizQuestions.length - 1 ? "btn-warning" : "btn-info"
						}`}
						onClick={handleNextQuestion}
						disabled={
							!selectedAnswers.find(
								(ans) =>
									ans.id === quizQuestions[currentQuestionIndex]?.id && ans.answer.length > 0
							)
						}>
						{currentQuestionIndex === quizQuestions.length - 1 ? "🚀 Submit Quiz" : "Next ➡"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Quiz;
