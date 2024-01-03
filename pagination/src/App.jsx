import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [page])

  const fetchProducts = async () => {
    const result = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`,
    )
    const data = await result.json()
    console.log(data)
    if (data && data.products) {
      setProducts(data.products)
      setTotalPages(data.total / 10)
    }
    // console.log(products)
  }

  const selectPageHandler = (selectedPage) => {
    if (page >= 1 && page <= totalPages && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  // const handlePrev = () => {
  //   if (page > 1) {
  //     setPage(page - 1)
  //   }
  // }

  return (
    <div className="app">
      {products.length > 0 && (
        <div className="products">
          {/* Here we slice page to show the value of 10 */}
          {products.map((product) => {
            console.log(product)
            return (
              <span
                key={product.id}
                className="products__single"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                />
                <span>{product.title}</span>
              </span>
            )
          })}
          {products.length > 0 && (
            <div className="pagination">
              <span
                className={page > 1 ? '' : 'pagination_disable'}
                onClick={() => selectPageHandler(page - 1)}
              >
                ◀
              </span>
              {[...Array(totalPages)].map((_, i) => {
                return (
                  <span
                    className={page === i + 1 ? 'pagination_selected' : ''}
                    onClick={() => selectPageHandler(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </span>
                )
              })}
              <span
                className={page < totalPages ? '' : 'pagination_disable'}
                onClick={() => selectPageHandler(page + 1)}
              >
                ▶
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
