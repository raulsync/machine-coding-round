import React, { useContext, useState } from 'react'
import { TodoContext } from '../context/TodoContext'
import { v4 as uuidv4 } from 'uuid'

const AddTodo = () => {
  const [title, setTitle] = useState('')
  const [todo, setTodo] = useContext(TodoContext)

  //function for adding todo

  const addTodoHandler = (e) => {
    //first we prevent the default behaviour of button so that after submitting whole page not refresh
    e.preventDefault()

    //to check whether title is empty or undefined
    if (title === '' || title === undefined) {
      alert('Field Can Not Be Empty')
      return
    }
    //add new todo to the old todo with spreading all the element in old todo and adding extra todo that you add through input;
    const newTodo = [...todo, { id: uuidv4(), title: title, completed: false }]
    //now we push new todo to todo;
    setTodo(newTodo)
    //after adding todo we clear the input field
    setTitle('')
  }

  return (
    <div className="form-input-control">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add todo..."
        className="form-input"
      />
      <button
        className="btn"
        onClick={(e) => addTodoHandler(e)}
      >
        Add
      </button>
    </div>
  )
}

export default AddTodo
