/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs'

const ImageSlider = ({ url, page = 1, limit = 5 }) => {
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (url !== '') fetchData(url)
  }, [url])

  //fetching data from Image Url
  const fetchData = async (geturl) => {
    try {
      setLoading(true)
      const response = await fetch(`${geturl}?page=${page}&limit=${limit}`)
      const data = await response.json()

      setImages(data)
      setLoading(false)
    } catch (error) {
      setLoading(true)
      setError(error.message)
    }
  }
  console.log(images)
  //handling error and loading state
  if (loading) {
    return <div>Loading data . . . </div>
  }

  if (error !== null) {
    return <div>Error occured !! {error}</div>
  }

  const handlePrev = () => {
    //here we check if user are on first image then we send user to last image otherwise we handle it normal
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }

  const handleNext = () => {
    //here we check if user are on last image then we send user to first image otherwise we handle it normal

    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
  }

  return (
    <div className="container">
      <BsArrowLeftCircle
        className="arrow arrow-left"
        onClick={handlePrev}
      />
      {images?.map((item, index) => {
        return (
          <img
            src={item.download_url}
            alt="img"
            key={item.id}
            className={
              currentSlide === index
                ? 'current-image'
                : 'current-image hide-current-image'
            }
          />
        )
      })}
      <BsArrowRightCircle
        className="arrow arrow-right"
        onClick={handleNext}
      />
      <span className="circle-indicator">
        {images?.map((_, index) => (
          <button
            key={index}
            className={
              currentSlide === index
                ? 'current-indicator'
                : 'current-indicator inactive-indicator'
            }
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </span>
    </div>
  )
}

export default ImageSlider
