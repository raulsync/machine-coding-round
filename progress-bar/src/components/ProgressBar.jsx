import { useEffect, useState } from 'react'
import { MAX, MIN } from '../constants'

/* eslint-disable react/prop-types */
const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value)

  useEffect(() => {
    //so here we provide validation that value is between 0 too 100
    setPercent(Math.min(MAX, Math.max(value, MIN)))

    if (value >= MAX) {
      onComplete()
    }
  }, [value])

  return (
    <div className="progressbar">
      <span style={{ color: percent > 49 ? 'white' : 'black' }}>
        {percent.toFixed()}%
      </span>
      {/* Here we setup the accessibility in our progressbar */}
      <div
        style={{ width: `${percent}%` }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      ></div>
    </div>
  )
}

export default ProgressBar
