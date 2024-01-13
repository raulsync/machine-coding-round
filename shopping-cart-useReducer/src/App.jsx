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

  console.log('state', state)

  return (
    <div className="product-cart-container">
      <Product
        products={state.products}
        addToCart={addToCart}
      />
      <Cart cart={state.cart} />
    </div>
  )
}

export default App
