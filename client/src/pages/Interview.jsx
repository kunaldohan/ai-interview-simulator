import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { generateQuestion, evaluateAnswer } from '../utils/api'
import ProgressBar from '../components/ProgressBar'
import Spinner from '../components/Spinner'

export default function Interview() {
  const navigate = useNavigate()
  const location = useLocation()
  const { role, totalQuestions = 5 } = location.state || {}

  const [phase, setPhase] = useState('loading')
  const [currentQ, setCurrentQ] = useState(1)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [previousQuestions, setPreviousQuestions] = useState([])
  const [isListening, setIsListening] = useState(false)

  // ⏱️ TIMER STATE
  const [timeLeft, setTimeLeft] = useState(30)

  const textareaRef = useRef(null)

  useEffect(() => {
    if (!role) { navigate('/'); return }
    fetchQuestion()
  }, [])

  useEffect(() => {
    if (phase === 'question' && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [phase])

  // 🎤 VOICE FUNCTION
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Speech Recognition not supported")
      return
    }

    const recognition = new window.webkitSpeechRecognition()
    recognition.lang = "en-US"

    setIsListening(true)

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript)
    }

    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)

    recognition.start()
  }

  // ⏱️ TIMER LOGIC
  useEffect(() => {
    if (phase !== 'question') return

    setTimeLeft(30)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit() // auto submit
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [question])

  const fetchQuestion = async () => {
    setPhase('loading')
    setError(null)
    setAnswer('')

    try {
      const data = await generateQuestion(role, currentQ, previousQuestions)
      setQuestion(data.question)
      setPhase('question')
    } catch {
      setError('Failed to generate question.')
      setPhase('question')
    }
  }

  const handleSubmit = async () => {
    if (!answer.trim()) {
      // allow auto-submit even if empty
      setAnswer("No answer provided")
    }

    setPhase('evaluating')
    setError(null)

    try {
      const evaluation = await evaluateAnswer(role, question, answer)

      const newResult = { question, answer, evaluation }
      const updatedResults = [...results, newResult]

      setResults(updatedResults)
      setPreviousQuestions([...previousQuestions, question])

      if (currentQ >= totalQuestions) {
        navigate('/result', { state: { role, results: updatedResults } })
      } else {
        setCurrentQ((n) => n + 1)
        setPhase('loading')
        setTimeout(() => fetchQuestion(), 100)
      }

    } catch {
      setError('Evaluation failed.')
      setPhase('question')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit()
    }
  }

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0

  if (!role) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">

        <div className="mb-6">
          <ProgressBar current={currentQ} total={totalQuestions} />
        </div>

        <div className="glass-card rounded-3xl overflow-hidden">

          {phase === 'loading' && (
            <div className="flex flex-col items-center py-20">
              <Spinner />
              <p className="text-white mt-4">Generating question...</p>
            </div>
          )}

          {(phase === 'question' || phase === 'evaluating') && question && (
            <div>

              {/* Question + Timer */}
              <div className="p-6 border-b border-white/10">
                <p className="text-red-400 text-sm mb-2">
                  ⏱️ Time Left: {timeLeft}s
                </p>
                <p className="text-white text-lg font-semibold">{question}</p>
              </div>

              {/* Answer */}
              <div className="p-6">

                <textarea
                  ref={textareaRef}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={phase === 'evaluating'}
                  placeholder="Type or speak your answer..."
                  className="w-full p-4 rounded-lg bg-black text-white"
                  rows={5}
                />

                {/* 🎤 VOICE */}
                <button
                  onClick={startListening}
                  className="mt-3 bg-orange-500 px-4 py-2 rounded text-white"
                >
                  {isListening ? "🎤 Listening..." : "🎤 Speak Answer"}
                </button>

                <p className="text-xs text-gray-400 mt-2">
                  Words: {wordCount}
                </p>

                {error && (
                  <p className="text-red-400 mt-2">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={phase === 'evaluating'}
                  className="w-full mt-5 bg-green-500 py-3 rounded text-white"
                >
                  {phase === 'evaluating'
                    ? "Evaluating..."
                    : currentQ >= totalQuestions
                    ? "Submit & Finish"
                    : "Next"}
                </button>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}