import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './pages/About'
import Blog from './pages/Blog'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ThemeProvider } from './context/theme-context'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Navbar */}
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/blog"
            element={<Blog />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
