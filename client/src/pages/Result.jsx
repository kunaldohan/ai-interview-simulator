import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import FeedbackCard from '../components/FeedbackCard'
import ScoreRing from '../components/ScoreRing'

const getGrade = (avg) => {
  if (avg >= 9) return { label: 'Exceptional', color: 'text-jade-400', desc: 'Outstanding performance. You are interview-ready!' }
  if (avg >= 7) return { label: 'Strong', color: 'text-ice-400', desc: 'Great answers with minor areas to refine.' }
  if (avg >= 5) return { label: 'Developing', color: 'text-amber-400', desc: 'Solid foundation, but needs more depth and clarity.' }
  return { label: 'Needs Work', color: 'text-crimson-400', desc: 'Focus on fundamentals and practice more.' }
}

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const { role, results } = location.state || {}
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!role || !results) { navigate('/'); return }
    setTimeout(() => setVisible(true), 100)
  }, [])

  if (!role || !results) return null

  const totalScore = results.reduce((sum, r) => sum + r.evaluation.score, 0)
  const avgScore = results.length ? Math.round((totalScore / results.length) * 10) / 10 : 0
  const grade = getGrade(avgScore)

  // 🔥 NEW ANALYTICS
  const best = results.reduce((a, b) =>
    a.evaluation.score > b.evaluation.score ? a : b
  )

  const worst = results.reduce((a, b) =>
    a.evaluation.score < b.evaluation.score ? a : b
  )

  const scoreDistribution = results.map((r, i) => ({
    label: `Q${i + 1}`,
    score: r.evaluation.score,
  }))

  return (
    <div className="min-h-screen px-4 py-12 relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-jade-500/3 blur-3xl rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ember-500/4 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-display font-bold text-4xl text-white mb-2">
            Interview Results
          </h1>
          <p className="text-white/40">
            {role} · {results.length} questions
          </p>
        </div>

        {/* MAIN SCORE CARD */}
        <div className="glass-card rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">

            <ScoreRing score={avgScore} size={140} />

            <div className="flex-1 text-center md:text-left">
              <div className={`text-3xl font-bold mb-2 ${grade.color}`}>
                {grade.label}
              </div>
              <p className="text-white/50 mb-4">{grade.desc}</p>

              <div className="flex gap-4 flex-wrap">
                <div className="bg-obsidian-700 p-3 rounded-lg">
                  <p className="text-xs text-white/30">Average</p>
                  <p className="text-white font-bold">{avgScore}/10</p>
                </div>

                <div className="bg-obsidian-700 p-3 rounded-lg">
                  <p className="text-xs text-white/30">Total</p>
                  <p className="text-white font-bold">{totalScore}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 NEW DASHBOARD CARDS */}
        <div className="grid grid-cols-1 gap-4 mb-8">

          {/* Best */}
          <div className="bg-black/60 p-4 rounded-xl border border-green-500/20">
            <p className="text-green-400 font-semibold mb-2">🏆 Best Answer</p>
            <p className="text-white text-sm">{best.question}</p>
            <p className="text-gray-400 text-xs mt-1">
              Score: {best.evaluation.score}
            </p>
          </div>

          {/* Worst */}
          <div className="bg-black/60 p-4 rounded-xl border border-red-500/20">
            <p className="text-red-400 font-semibold mb-2">⚠️ Needs Improvement</p>
            <p className="text-white text-sm">{worst.question}</p>
            <p className="text-gray-400 text-xs mt-1">
              Score: {worst.evaluation.score}
            </p>
          </div>

        </div>

        {/* SCORE GRAPH */}
        <div className="mb-8">
          <p className="text-white/30 text-xs mb-3">Performance per Question</p>
          <div className="flex gap-2 h-20 items-end">
            {scoreDistribution.map(({ score }, i) => (
              <div
                key={i}
                className="w-6 bg-green-400 rounded"
                style={{ height: `${score * 10}%` }}
              />
            ))}
          </div>
        </div>

        {/* FEEDBACK */}
        <div className="space-y-5">
          {results.map((item, i) => (
            <FeedbackCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 bg-gray-800 text-white rounded-lg"
          >
            Home
          </button>

          <button
            onClick={() => navigate('/interview', { state: { role } })}
            className="flex-1 py-3 bg-green-500 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )
}