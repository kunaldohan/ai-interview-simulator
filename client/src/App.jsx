import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Interview from './pages/Interview'
import Result from './pages/Result'

function App() {
  return (
    <Router>
      <div className="noise-bg min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
