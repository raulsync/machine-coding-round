import React from 'react'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../context/theme-context'

const Navbar = () => {
  const { theme, toggleTheme } = useThemeContext()

  const toggleMode = () => {
    toggleTheme()
  }

  return (
    <nav className="navbar">
      <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/About'}>About</Link>
        <Link to={'/blog'}>Blog</Link>
      </div>
      <div className="mode-switch">
        <label>
          <input
            type="checkbox"
            onChange={toggleMode}
            checked={theme === 'dark'}
          />
        </label>
      </div>
    </nav>
  )
}

export default Navbar
