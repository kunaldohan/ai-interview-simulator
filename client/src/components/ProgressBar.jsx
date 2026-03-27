const ProgressBar = ({ current, total }) => {
  const pct = (current / total) * 100

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="font-mono text-xs text-white/40 tracking-wider">
          QUESTION {current} / {total}
        </span>
        <span className="font-mono text-xs text-ember-400">{Math.round(pct)}%</span>
      </div>
      <div className="h-1 bg-obsidian-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-ember-600 to-ember-400 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
