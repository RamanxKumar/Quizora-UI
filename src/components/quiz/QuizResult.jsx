import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const QuizResult = () => {
	const location = useLocation()
	const navigate = useNavigate() 
	const { quizQuestions, totalScores } = location.state

	const numOfQuestions = quizQuestions.length
	const percentage = Math.round((totalScores / numOfQuestions) * 100)

	const handleRetakeQuiz = () => {
		navigate('/take-quiz')
	}

	return (
		<div className="container mt-5 px-3 px-md-5">
			<div className="bg-light p-5 rounded-4 shadow text-center">
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
	)
}

export default QuizResult
