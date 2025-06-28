import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<div className="container mt-5 px-3 px-md-5">
			<div className="bg-white shadow-lg rounded-4 p-5 text-center">
				<h2 className="text-primary mb-4">👨‍💻 Admin Dashboard</h2>
				<hr className="w-50 mx-auto" />
				<p className="mb-4 text-muted">Manage quizzes and create new ones effortlessly.</p>

				<nav className="d-grid gap-3 col-6 mx-auto">
					<Link to="/create-quiz" className="btn btn-outline-success btn-lg">
						➕ Create a New Quiz
					</Link>
					<Link to="/all-quizzes" className="btn btn-outline-info btn-lg">
						🛠️ Manage Existing Quizzes
					</Link>
				</nav>
			</div>
		</div>
	)
}

export default Admin
