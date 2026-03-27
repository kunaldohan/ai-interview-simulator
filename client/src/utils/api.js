import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

export const generateQuestion = async (role, questionNumber, previousQuestions = []) => {
  const res = await api.post('/generate-question', { role, questionNumber, previousQuestions })
  return res.data
}

export const evaluateAnswer = async (role, question, answer) => {
  const res = await api.post('/evaluate-answer', { role, question, answer })
  return res.data
}

export default api
