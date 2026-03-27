const Spinner = ({ size = 'md', color = 'ember' }) => {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }
  const colors = {
    ember: 'border-ember-500',
    ice: 'border-ice-500',
    white: 'border-white',
  }

  return (
    <div
      className={`${sizes[size]} rounded-full border-2 border-transparent ${colors[color]} border-t-current animate-spin`}
    />
  )
}

export default Spinner
