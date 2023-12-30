import './App.css'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import { TodoProvider } from './context/TodoContext'

function App() {
  return (
    //Here we wrap up our children component to provide the context throughout all the component
    <TodoProvider>
      <div className="container">
        <h1 className="title">Todo Application</h1>
        <AddTodo />
        <TodoList />
      </div>
    </TodoProvider>
  )
}

export default App
