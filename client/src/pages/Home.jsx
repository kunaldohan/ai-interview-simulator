import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ROLES = ['Software Engineer', 'Data Analyst', 'HR']

const ROLE_META = {
  'Software Engineer': {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    desc: 'DSA, system design, coding, best practices',
    color: 'ice',
  },
  'Data Analyst': {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    desc: 'SQL, statistics, visualization, BI tools',
    color: 'jade',
  },
  'HR': {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    desc: 'Recruitment, policies, employee relations',
    color: 'amber',
  },
}

const colorMap = {
  ice: { text: 'text-ice-400', border: 'border-ice-500/30', bg: 'bg-ice-500/10', glow: 'rgba(78,184,255,0.15)' },
  jade: { text: 'text-jade-400', border: 'border-jade-500/30', bg: 'bg-jade-500/10', glow: 'rgba(74,222,128,0.15)' },
  amber: { text: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/10', glow: 'rgba(251,191,36,0.15)' },
}

export default function Home() {
  const [selectedRole, setSelectedRole] = useState('')
  const [questionCount, setQuestionCount] = useState(5)
  const navigate = useNavigate()

  const handleStart = () => {
    if (!selectedRole) return
    navigate('/interview', { state: { role: selectedRole, totalQuestions: questionCount } })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ember-500/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-ice-500/4 blur-3xl animate-pulse-slow delay-300" />
      </div>

      <div className="relative z-10 w-full max-w-2xl">

        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ember-500/10 border border-ember-500/20 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-ember-400 animate-pulse" />
            <span className="font-mono text-xs text-ember-400 tracking-widest">
              AI-POWERED (LLM)
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl text-white mb-4">
            Smart Interview
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ember-400 to-amber-400">
              Simulator
            </span>
          </h1>

          <p className="text-white/40 text-lg max-w-md mx-auto">
            Practice real interview questions with AI-powered evaluation and feedback.
          </p>
        </div>

        {/* CARD */}
        <div className="glass-card rounded-3xl p-8">

          {/* ROLE */}
          <div className="mb-8">
            <label className="block text-xs text-white/40 mb-4">SELECT YOUR ROLE</label>

            <div className="grid gap-3">
              {ROLES.map((role) => {
                const meta = ROLE_META[role]
                const c = colorMap[meta.color]
                const selected = selectedRole === role

                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                      ${selected
                        ? `${c.border} ${c.bg}`
                        : 'border-white/5 bg-obsidian-900/60 hover:border-white/10'
                      }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg
                      ${selected ? `${c.bg} ${c.text}` : 'bg-obsidian-700 text-white/30'}`}>
                      {meta.icon}
                    </div>

                    <div>
                      <p className="text-white font-semibold">{role}</p>
                      <p className="text-white/30 text-xs">{meta.desc}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* QUESTIONS */}
          <div className="mb-8">
            <label className="block text-xs text-white/40 mb-4">NUMBER OF QUESTIONS</label>

            <div className="flex gap-2">
              {[3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => setQuestionCount(n)}
                  className={`flex-1 py-3 rounded-xl
                    ${questionCount === n
                      ? 'bg-ember-500/20 text-ember-400'
                      : 'bg-obsidian-900/60 text-white/40'
                    }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* START */}
          <button
            onClick={handleStart}
            disabled={!selectedRole}
            className={`w-full py-4 rounded-xl font-bold
              ${selectedRole
                ? 'bg-ember-500 text-white'
                : 'bg-gray-700 text-gray-400'
              }`}
          >
            {selectedRole ? `Start Interview → ${selectedRole}` : 'Select a role to begin'}
          </button>

          {/* 🔥 UPDATED STATS */}
          <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-ember-400 font-bold">{questionCount}</p>
              <p className="text-xs text-white/40">Questions</p>
            </div>

            <div className="text-center">
              <p className="text-ember-400 font-bold">Groq LLaMA 3.3</p>
              <p className="text-xs text-white/40">AI Model</p>
            </div>

            <div className="text-center">
              <p className="text-ember-400 font-bold">Real-time</p>
              <p className="text-xs text-white/40">Feedback</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}