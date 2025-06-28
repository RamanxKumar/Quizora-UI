import React, { useEffect, useState } from "react";
import { getQuestionById, updateQuestion } from "../../utils/QuizService";
import { useParams, Link } from "react-router-dom";

const UpdateQuestion = () => {
	const [question, setQuestion] = useState("");
	const [choices, setChoices] = useState([""]);
	const [correctAnswers, setCorrectAnswers] = useState([""]);
	const [isLoading, setIsLoading] = useState(true);

	const { id } = useParams();

	useEffect(() => {
		fetchQuestion();
	}, []);

	const fetchQuestion = async () => {
		try {
			const questionToUpdate = await getQuestionById(id);
			if (questionToUpdate) {
				setQuestion(questionToUpdate.question);
				setChoices(questionToUpdate.choices);
				setCorrectAnswers(questionToUpdate.correctAnswers);
			}
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleQuestionChange = (e) => setQuestion(e.target.value);

	const handleChoiceChange = (index, e) => {
		const updatedChoices = [...choices];
		updatedChoices[index] = e.target.value;
		setChoices(updatedChoices);
	};

	const handleCorrectAnswerChange = (e) => setCorrectAnswers(e.target.value);

	const handleQuestionUpdate = async (e) => {
		e.preventDefault();
		try {
			const updatedQuestion = {
				question,
				choices,
				correctAnswers: correctAnswers
					.toString()
					.split(",")
					.map((answer) => answer.trim()),
			};
			await updateQuestion(id, updatedQuestion);
			// todo: navigate back if needed
		} catch (error) {
			console.error(error);
		}
	};

	if (isLoading) {
		return (
			<div className="container mt-5 text-center">
				<div className="spinner-border text-primary" />
			</div>
		);
	}

	return (
		<div className="container mt-5 px-3 px-md-5">
			<div className="bg-light shadow p-4 rounded-4">
				<h4 className="text-secondary mb-4">✏️ Update Quiz Question</h4>
				<form onSubmit={handleQuestionUpdate}>
					<div className="mb-3">
						<label className="form-label text-info">Question:</label>
						<textarea
							className="form-control"
							rows={3}
							value={question}
							onChange={handleQuestionChange}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label text-info">Choices:</label>
						{choices.map((choice, index) => (
							<input
								key={index}
								className="form-control mb-2"
								type="text"
								value={choice}
								onChange={(e) => handleChoiceChange(index, e)}
							/>
						))}
					</div>

					<div className="mb-4">
						<label className="form-label text-info">Correct Answer(s):</label>
						<input
							className="form-control"
							type="text"
							value={correctAnswers}
							onChange={handleCorrectAnswerChange}
						/>
						<small className="text-muted">Comma-separated for multiple answers</small>
					</div>

					<div className="d-flex gap-3">
						<button type="submit" className="btn btn-warning btn-sm text-dark">
							Update Question
						</button>
						<Link to="/all-quizzes" className="btn btn-outline-primary btn-sm">
							Back to All Questions
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateQuestion;
