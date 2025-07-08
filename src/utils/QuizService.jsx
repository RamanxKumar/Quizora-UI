import axios from "axios";

// 📍 Base URL for API
const BASE_URL = "http://quizora-server-production-4047.up.railway.app/api/quizzes";

// 👉 Public API client (no token)
export const api = axios.create({
  baseURL: BASE_URL,
});

// 🔐 Protected API client (with token)
export const apiWithAuth = axios.create({
  baseURL: BASE_URL,
});

// 🎯 Interceptor to add token to every request
apiWithAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Helper to handle API errors gracefully
const handleError = (error, message) => {
  console.error(message, error?.response?.data || error.message);
  return [];
};

// ================================
// ✅ Quiz APIs
// ================================

// 🔐 Create new question
export const createQuestion = async (quizQuestion) => {
  try {
    const response = await apiWithAuth.post("/create-new-question", quizQuestion);
    return response.data;
  } catch (error) {
    handleError(error, "Error creating question:");
  }
};

// 🔐 Get all questions
export const getAllQuestions = async () => {
  try {
    const response = await apiWithAuth.get("/all-questions");
    return response.data;
  } catch (error) {
    return handleError(error, "Error fetching questions:");
  }
};

// 🔐 Fetch quiz for user
export const fetchQuizForUser = async (number, subject) => {
  try {
    const response = await apiWithAuth.get(`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`);
    return response.data;
  } catch (error) {
    return handleError(error, "Error fetching quiz:");
  }
};

// 🔐 Get all subjects
export const getSubjects = async () => {
  try {
    const response = await apiWithAuth.get("/subjects");
    return response.data;
  } catch (error) {
    return handleError(error, "Error fetching subjects:");
  }
};

// 🔐 Update question
export const updateQuestion = async (id, question) => {
  try {
    const response = await apiWithAuth.put(`/question/${id}/update`, question);
    return response.data;
  } catch (error) {
    handleError(error, "Error updating question:");
  }
};

// 🔐 Get question by ID
export const getQuestionById = async (id) => {
  try {
    const response = await apiWithAuth.get(`/question/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, "Error fetching question by ID:");
  }
};

// 🔐 Delete question
export const deleteQuestion = async (id) => {
  try {
    const response = await apiWithAuth.delete(`/question/${id}/delete`);
    return response.data;
  } catch (error) {
    handleError(error, "Error deleting question:");
  }
};
