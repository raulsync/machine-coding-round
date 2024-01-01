import { useState } from 'react'
import ProgressBar from './components/ProgressBar'
import './index.css'
import { useEffect } from 'react'

function App() {
  const [value, setValue] = useState(0)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => prevValue + 1)
    }, 100)
    //cleanup function for this
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="App">
      <span>Progress Bar</span>
      {/* When the progressbar is complete we want to do something so here we pass onComplete method to do something */}
      <ProgressBar
        value={value}
        onComplete={() => {
          setSuccess(true)
        }}
      />
      <span>{success ? 'Completed !' : 'Loading...'}</span>
    </div>
  )
}

export default App
