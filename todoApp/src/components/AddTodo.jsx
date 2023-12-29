import React from 'react'

const AddTodo = () => {
  return (
    <div className="form-input-control">
      <input
        type="text"
        value=""
        placeholder="Add todo..."
      />
      <button className="btn">Add</button>
    </div>
  )
}

export default AddTodo
