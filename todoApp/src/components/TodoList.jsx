import React, { useContext } from 'react'
import Todo from './Todo'
import { TodoContext } from '../context/TodoContext'

const TodoList = () => {
  const [todo, setTodo] = useContext(TodoContext)

  console.log(todo)
  return todo.length >= 1 ? (
    todo.map((item) => {
      return (
        <Todo
          key={item.id}
          id={item.id}
          title={item.title}
          completed={item.completed}
        />
      )
    })
  ) : (
    <h4>No todo found. Please add some...</h4>
  )
}

export default TodoList
