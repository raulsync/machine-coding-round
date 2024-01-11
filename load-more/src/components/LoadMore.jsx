/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useState } from 'react'

const LoadMore = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [error, setError] = useState(null)

  const [disabledbutton, setDisabledbutton] = useState(false)

  //to fetch the data when count changes
  useEffect(() => {
    fetchProducts()
  }, [count])

  //to disable button
  useEffect(() => {
    if (products && products.length === 100) setDisabledbutton(true)
  }, [products])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      //when we first time load the data we show the 20 item and then user click load more then we skip the previous data and show next 20 data
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`,
      )
      const data = await response.json()

      //we set peoducts here on the basis of page load
      setProducts((prevData) => [...prevData, ...data.products])
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(error.message)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading Please Wait. . .</div>
  }

  if (error) {
    return <div className="error-msg">Error. . . {error}</div>
  }

  console.log(products)

  return (
    <>
      <h1 style={{ textAlign: 'center', margin: '5px 0' }}>
        Load More Products
      </h1>
      <div className="container">
        {products?.map((item, index) => {
          return (
            <div
              key={index}
              className="product"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
              />
              <p>{item.title}</p>
            </div>
          )
        })}
      </div>
      <div className="button-container">
        <button
          disabled={disabledbutton}
          onClick={() => setCount(count + 1)}
        >
          Load More..
        </button>
        {disabledbutton ? (
          <p style={{ textAlign: 'center' }}>
            You have reached to 100 products
          </p>
        ) : null}
      </div>
    </>
  )
}

export default LoadMore
