import React, { createContext, useState } from 'react'

export const TodoContext = createContext()

export const TodoProvider = (props) => {
  const getTodo = JSON.parse(localStorage.getItem('todo'))
  const [todo, setTodo] = useState(getTodo ? getTodo : [])

  return (
    <TodoContext.Provider value={[todo, setTodo]}>
      {/* Here we pass provider to all the children component */}
      {props.children}
    </TodoContext.Provider>
  )
}
