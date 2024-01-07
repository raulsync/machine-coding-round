import './App.css'
import StarRating from './StarRating'

function App() {
  return (
    <div className="app">
      <h1>No. of Star Rating</h1>
      <StarRating noOfStars={10} />
    </div>
  )
}

export default App
