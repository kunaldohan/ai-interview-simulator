const ScoreRing = ({ score, size = 120 }) => {
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 10) * circumference

  const getColor = (s) => {
    if (s >= 8) return '#4ade80'
    if (s >= 5) return '#fbbf24'
    return '#f87171'
  }

  const color = getColor(score)

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />
        <circle
          cx="50" cy="50" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display font-bold text-2xl" style={{ color }}>
          {score}
        </span>
        <span className="font-mono text-xs text-white/30">/10</span>
      </div>
    </div>
  )
}

export default ScoreRing
