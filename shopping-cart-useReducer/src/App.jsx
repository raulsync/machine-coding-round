import { useEffect, useReducer } from 'react'
import './App.css'
import Cart from './components/Cart/Cart'
import Product from './components/Product/Product'

//initial state
const initialState = {
  products: [],
  cart: [],
}

//create reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'Add_Products': {
      return { ...state, products: action.payload }
    }

    case 'Add_to_cart': {
      const product = action.payload
      product.quantity = 1
      product.totalPrice = product.price

      const updatedCarts = [...state.cart, product]

      return { ...state, cart: updatedCarts }
    }
    case 'Remove_from_cart': {
      return {
        // returning those element that doesn't equal to index of item that coming from payload

        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      }
    }
    case 'Increment_Quantity': {
      //here we retreive index from cart state matching to payload id
      const index = state.cart.findIndex(
        (product) => product.id === action.payload.id,
      )
      const item = state.cart[index]
      const newQuantity = item.quantity + 1
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, index),
          {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price,
          },
          ...state.cart.slice(index + 1),
        ],
      }
    }
    case 'Decrement_Quantity': {
      //here we retreive index from cart state matching to payload id
      const index = state.cart.findIndex(
        (product) => product.id === action.payload.id,
      )
      const item = state.cart[index]

      if (item.quantity === 1) {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        }
      }
      const newQuantity = item.quantity - 1
      return {
        ...state,
        cart: [
          ...state.cart.slice(0, index),
          {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price,
          },
          ...state.cart.slice(index + 1),
        ],
      }
    }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const resonse = await fetch('https://dummyjson.com/products')
    const data = await resonse.json()
    //here we send products through dispatch;
    dispatch({ type: 'Add_Products', payload: data.products })
    console.log(data)
  }

  const addToCart = (product) => {
    dispatch({ type: 'Add_to_cart', payload: product })
  }

  const removeFromCart = (item) => {
    dispatch({ type: 'Remove_from_cart', payload: item })
  }

  console.log('state', state)

  const incrementQuantity = (item) => {
    dispatch({ type: 'Increment_Quantity', payload: item })
  }

  const decrementQuantity = (item) => {
    dispatch({ type: 'Decrement_Quantity', payload: item })
  }

  return (
    <div className="product-cart-container">
      <Product
        products={state.products}
        addToCart={addToCart}
        cart={state.cart}
      />
      <Cart
        cart={state.cart}
        removeFromCart={removeFromCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    </div>
  )
}

export default App
