/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeContext = createContext()

export const useThemeContext = () => {
  return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    //here we changing state on the basis of previous state
    setIsDarkMode((prevState) => !prevState)
  }

  const theme = isDarkMode ? 'dark' : 'light'

  //here we know what exactly theme apply on user screen
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [isDarkMode])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* passing data to all children component */}
      {children}
    </ThemeContext.Provider>
  )
}
