/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { TodoContext } from '../context/TodoContext'

const Todo = ({ id, title, completed }) => {
  const [todo, setTodo] = useContext(TodoContext)

  const completeTodo = (e) => {
    //  Here we map over all todo item to check whether item is check or not to update the state
    const filterTodo = todo.map((item) => {
      if (item.id === e.target.value) {
        item.completed = false
        if (e.target.checked) {
          item.completed = true
        }
      }
      return item
    })
    setTodo(filterTodo)
  }

  //for deleting the todo item
  const deleteTodo = (e) => {
    e.preventDefault()

    const filteredTodo = todo.map((item) => {
      return item.id !== e.target.id
    })
    setTodo(filteredTodo)
  }

  //persisting the checkbox
  const isCompleted = completed ? 'checked' : ''

  //Now we use localstorage to persist the todo value

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todo))
  }, [todo])

  return (
    <>
      <p className="todo-item">
        <input
          type="checkbox"
          checked={isCompleted}
          value={id}
          id={id}
          onChange={(e) => completeTodo(e)}
        />
        <label htmlFor={id}>{title}</label>
        <button
          className="dlt-btn"
          id={id}
          onClick={(e) => deleteTodo(e)}
        >
          Delete
        </button>
      </p>
    </>
  )
}

export default Todo
