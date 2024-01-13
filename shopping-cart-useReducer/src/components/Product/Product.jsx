/* eslint-disable react/prop-types */
import './style.css'
const Product = ({ products, addToCart, cart }) => {
  return (
    <div className="product-container">
      {products?.map((product) => {
        return (
          <div
            key={product.id}
            className="product-wrapper"
          >
            <img
              src={product.thumbnail}
              width="90%"
              height={'300px'}
              alt=""
            />
            <div className="product-detail">
              <div>{product.title}</div>
              <div>{product.price}</div>
            </div>
            <div>
              <button
                className="add-product"
                onClick={() => addToCart(product)}
                disabled={cart.some((item) => item.id === product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Product
