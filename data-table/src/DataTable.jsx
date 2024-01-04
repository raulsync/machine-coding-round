import { useState, useEffect } from 'react'

const DataTable = () => {
  const [formData, setFormData] = useState({ name: '', gender: '', age: '' })

  const [data, setData] = useState([])
  const [editData, setEditData] = useState(false)

  useEffect(() => {
    if (!editData) return

    const selectedItem = document.querySelectorAll([])
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

  console.log(data)

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
          value={''}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td
                  id={item.id}
                  contentEditable={editData}
                >
                  {item.name}
                </td>

                <td
                  id={item.id}
                  contentEditable={editData}
                >
                  {item.gender}
                </td>
                <td
                  id={item.id}
                  contentEditable={editData}
                >
                  {item.age}
                </td>
                <td className="action">
                  <button
                    className="edit"
                    onClick={() => setEditData(true)}
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
