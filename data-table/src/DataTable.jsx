import { useState, useEffect, useRef } from 'react'

const DataTable = () => {
  const [formData, setFormData] = useState({ name: '', gender: '', age: '' })

  const [data, setData] = useState([])
  const [editData, setEditData] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const outsideClick = useRef()
  // console.log(outsideClick)

  const pageItem = 5

  const lastItem = pageItem * currentPage
  const indexOfFirstItem = lastItem - pageItem

  //Handle Search functionality
  let filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase()),
  )

  //Here we slicing our array item from filtered data according to element that display on current page
  //for pagination
  const filteredItems = filteredData.slice(indexOfFirstItem, lastItem)

  console.log(filteredItems)

  //Implement Pagination
  const paginate = (index) => {
    setCurrentPage(index)
  }

  // console.log(editData)

  //when user type something then we want to search it from 1st page not from the current page
  useEffect(() => {
    setCurrentPage(1)
  }, [searchInput])

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

  //code for add item
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

  //code for delete functionality
  const handleDelete = (id) => {
    //if user deleted some item from second page then we send back user from second page to 1st page
    if (filteredItems.length === 1 && currentPage !== 1) {
      setCurrentPage((prev) => prev - 1)
    }
    //here we filter all the item that is not matching with our id
    const updatedList = data.filter((item) => item.id !== id)
    //now we push the filtereddata to data
    setData(updatedList)
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
            {filteredItems.map((item) => (
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
        {/* Pagination */}
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(data.length / pageItem) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                style={{
                  backgroundColor: currentPage === index + 1 && 'lightgreen',
                }}
              >
                {index + 1}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}

export default DataTable
