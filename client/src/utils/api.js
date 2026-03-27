import axios from 'axios'

// 🔥 PRODUCTION + LOCAL SUPPORT
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://ai-interview-simulator-x93i.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------------- GENERATE QUESTION ----------------
export const generateQuestion = async (role, questionNumber, previousQuestions = []) => {
  try {
    const res = await api.post('/generate-question', {
      role,
      questionNumber,
      previousQuestions,
    });
    return res.data;
  } catch (err) {
    console.error("Generate Question Error:", err);
    throw err;
  }
};

// ---------------- EVALUATE ANSWER ----------------
export const evaluateAnswer = async (role, question, answer) => {
  try {
    const res = await api.post('/evaluate-answer', {
      role,
      question,
      answer,
    });
    return res.data;
  } catch (err) {
    console.error("Evaluate Answer Error:", err);
    throw err;
  }
};

export default api;