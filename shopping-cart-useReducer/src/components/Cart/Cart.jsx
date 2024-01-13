/* eslint-disable react/prop-types */
import './style.css'
const Cart = ({
  cart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
}) => {
  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cart.length === 0 && <p>Cart is empty..</p>}
      {cart.map((item, index) => {
        return (
          <div
            key={index}
            className="cart-wrapper"
          >
            <img
              src={item.thumbnail}
              alt=""
            />
            <div className="cart-info">{item.title}</div>
            <div className="right">
              <div
                className="cart-action"
                onClick={() => incrementQuantity(item)}
              >
                +
              </div>
              <div>{item.quantity}</div>
              <div
                className="cart-action"
                onClick={() => decrementQuantity(item)}
              >
                -
              </div>
              <div className="cart-price">{item.price}</div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Cart
