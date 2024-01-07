/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import data from '../utils'

const Accordion = () => {
  const [toggleAnswer, setToggleAnswer] = useState(null)
  const [multipleSelection, setMultipleSelection] = useState(false)
  const outSideClick = useRef()

  //handle outside click of container
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        outSideClick.current &&
        !outSideClick.current.contains(event.target)
      ) {
        setToggleAnswer(null)
      }
    }

    document.addEventListener('click', handleClickOutSide)
    //cleanup function
    return () => {
      document.removeEventListener('click', handleClickOutSide)
    }
  }, [outSideClick])

  const handleToggleClick = (id) => {
    setToggleAnswer(id === toggleAnswer ? null : id)
  }

  const handleMultiSelection = () => {
    setMultipleSelection(!multipleSelection)
  }

  return (
    <div
      className="container"
      ref={outSideClick}
    >
      <div
        className="multiple-selection"
        onClick={handleMultiSelection}
      >
        <h2>Multiple Selection</h2>
      </div>

      {data?.map((item) => (
        <div
          key={item.id}
          className="data-container"
        >
          <p
            className="question"
            onClick={() => handleToggleClick(item.id)}
          >
            {item.question} +
          </p>
          {toggleAnswer === item.id && <p className="answer">{item.answer}</p>}
        </div>
      ))}
    </div>
  )
}

export default Accordion
