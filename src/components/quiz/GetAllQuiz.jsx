import React, { useEffect, useState } from "react"
import { deleteQuestion, getAllQuestions } from "../../utils/QuizService"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

const GetAllQuiz = () => {
	const [questions, setQuestions] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isQuestionDeleted, setIsQuestionDeleted] = useState(false)
	const [deleteSuccess, setDeleteSuccess] = useState("")

	useEffect(() => {
		fetchQuestions()
	}, [])

	const fetchQuestions = async () => {
		try {
			const data = await getAllQuestions()
			setQuestions(data)
			setIsLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const handleDeleteQuestion = async (id) => {
		try {
			await deleteQuestion(id)
			setQuestions(questions.filter((question) => question.id !== id))
			setIsQuestionDeleted(true)
			setDeleteSuccess("Question deleted successfully.")
		} catch (error) {
			console.error(error)
		}
		setTimeout(() => {
			setDeleteSuccess("")
		}, 4000)
	}

	if (isLoading) {
		return <div className="container mt-5 text-center"><div className="spinner-border text-primary" /></div>
	}

	return (
		<section className="container mt-5 px-3 px-md-5">
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h4 className="text-secondary">📋 All Quiz Questions</h4>
				<Link to="/create-quiz" className="btn btn-outline-primary btn-sm">
					<FaPlus className="me-1" /> Add Question
				</Link>
			</div>

			{isQuestionDeleted && (
				<div className="alert alert-success">{deleteSuccess}</div>
			)}

			{questions.length === 0 && <p className="text-muted">No questions available.</p>}

			{questions.map((question, index) => (
				<div key={question.id} className="card shadow-sm rounded-3 mb-4">
					<div className="card-body">
						<h5 className="card-title text-dark">
							{index + 1}. {question.question}
						</h5>
						<ul className="list-group list-group-flush mb-3">
							{question.choices.map((choice, i) => (
								<li key={i} className="list-group-item">{choice}</li>
							))}
						</ul>
						<p className="text-success mb-2">✅ Correct Answer: {question.correctAnswers}</p>
						<div className="d-flex gap-2">
							<Link to={`/update-quiz/${question.id}`} className="btn btn-outline-warning btn-sm">
								✏️ Edit
							</Link>
							<button
								className="btn btn-outline-danger btn-sm"
								onClick={() => handleDeleteQuestion(question.id)}>
								🗑️ Delete
							</button>
						</div>
					</div>
				</div>
			))}
		</section>
	)
}

export default GetAllQuiz
