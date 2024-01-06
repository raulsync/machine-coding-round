import { useState, useEffect, useRef } from 'react'

const DataTable = () => {
  const [formData, setFormData] = useState({ name: '', gender: '', age: '' })

  const [data, setData] = useState([])
  const [editData, setEditData] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const outsideClick = useRef()

  // console.log(outsideClick)
  // console.log(editData)

  //Now after user edit the field and move outside the table then we want to lock the edit area

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        outsideClick.current &&
        !outsideClick.current.contains(event.target)
      ) {
        setEditData(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!editData) return

    const selectedItem = document.querySelectorAll(`[id='${editData}']`)
    //when we click on the edit button we want to focust first element in nodeList
    selectedItem[0].focus()
    // console.log(selectedItem)
    // console.log(selectedItem[0])
  }, [editData])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleAddClick = () => {
    if (formData.name && formData.gender && formData.age) {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
      }
      setData([...data, newItem])
      //for clear the input field
      setFormData({ name: '', gender: '', age: '' })
    }
  }

  const handleDelete = (id) => {
    //here we filter all the item that is not matching with our id
    const filteredData = data.filter((item) => item.id !== id)
    //now we push the filtereddata to data
    setData(filteredData)
  }

  const handleEdit = (id, updatedValue) => {
    if (!editData || editData !== id) {
      return
    }
    //we want to update specific element that is click so we map over all the data and then return if id==item.id so we update otherwise return element
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ...updatedValue } : item,
    )
    // console.log(updatedData)
    setData(updatedData)
  }

  /***
   * Handle Search functionality
   */

  const filteredItem = data.filter((item) => {
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  })

  console.log(filteredItem)

  const handleSearch = (e) => {
    setSearchInput(e.target.value)
  }
  // console.log(data)

  // console.log(formData)
  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          />
          <input
            onChange={handleInputChange}
            type="text"
            value={formData.age}
            name="age"
            placeholder="Age"
          />
        </div>
        <button
          className="add"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
      <div className="search-table-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name"
          value={searchInput}
          onChange={handleSearch}
        />
        <table ref={outsideClick}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItem.map((item) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editData === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { name: e.target.innerText })
                  }
                >
                  {item.name}
                </td>

                <td
                  id={item.id}
                  contentEditable={editData === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { gender: e.target.innerText })
                  }
                >
                  {item.gender}
                </td>
                <td
                  id={item.id}
                  contentEditable={editData === item.id}
                  onBlur={(e) =>
                    handleEdit(item.id, { age: e.target.innerText })
                  }
                >
                  {item.age}
                </td>
                <td className="action">
                  <button
                    className="edit"
                    onClick={() => setEditData(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    </div>
  )
}

export default DataTable
