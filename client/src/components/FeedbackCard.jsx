import ScoreRing from './ScoreRing'

const FeedbackCard = ({ item, index }) => {
  const { question, answer, evaluation } = item

  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-fade-up" style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}>
      {/* Header */}
      <div className="flex items-start gap-4 p-6 border-b border-white/5">
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-obsidian-600 flex items-center justify-center">
          <span className="font-mono text-xs text-ember-400 font-bold">Q{index + 1}</span>
        </div>
        <p className="font-display text-white/90 font-medium leading-relaxed">{question}</p>
      </div>

      {/* Answer */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-ice-500" />
          <span className="font-mono text-xs text-white/40 tracking-wider">YOUR ANSWER</span>
        </div>
        <p className="text-white/60 text-sm leading-relaxed font-body italic">
          {answer || <span className="text-white/30">No answer provided</span>}
        </p>
      </div>

      {/* Evaluation */}
      <div className="p-6">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <ScoreRing score={evaluation.score} size={100} />
          </div>

          <div className="flex-1 space-y-4 min-w-0">
            {/* Strengths */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-jade-500" />
                <span className="font-mono text-xs text-jade-400 tracking-wider">STRENGTHS</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{evaluation.strengths}</p>
            </div>

            {/* Weaknesses */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-crimson-500" />
                <span className="font-mono text-xs text-crimson-400 tracking-wider">AREAS TO IMPROVE</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{evaluation.weaknesses}</p>
            </div>
          </div>
        </div>

        {/* Improved Answer */}
        <div className="mt-5 p-4 rounded-xl bg-obsidian-900 border border-ember-500/10">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-3.5 h-3.5 text-ember-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="font-mono text-xs text-ember-400 tracking-wider">IDEAL ANSWER</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">{evaluation.improved_answer}</p>
        </div>
      </div>
    </div>
  )
}

export default FeedbackCard
