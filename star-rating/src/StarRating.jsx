/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = ({ noOfStars = 5 }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const handleClick = (currentIndex) => {
    console.log(currentIndex)
    setRating(currentIndex)
  }

  const handleMouseEnter = (currentIndex) => {
    console.log(currentIndex)
    setHover(currentIndex)
  }

  const handleMouseLeave = () => {
    console.log(rating)
    setHover(rating)
  }

  return (
    <div className="star-rating">
      {[...Array(noOfStars)].map((_, index) => {
        index += 1
        return (
          <FaStar
            key={index}
            className={index <= (hover || rating) ? 'active' : 'inactive'}
            onClick={() => handleClick(index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseLeave={() => handleMouseLeave()}
          />
        )
      })}
    </div>
  )
}

export default StarRating
