import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import {
  addUser,
  updateUser,
  deleteUser,
  setEditIndex,
  setSearchTerm,
  setCurrentPage,
  setFormData
} from './Redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const {
    users,
    editIndex,
    searchTerm,
    currentPage,
    itemsPerPage,
    formData = { name: '', email: '' }
  } = useSelector(state => state.users);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ ...formData, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      dispatch(updateUser({ index: editIndex, user: formData }));
    } else {
      dispatch(addUser(formData));
    }
    dispatch(setFormData({ name: '', email: '' }));
  };

  const handleEdit = (index) => {
    const globalIndex = (currentPage - 1) * itemsPerPage + index;
    dispatch(setFormData(users[globalIndex]));
    dispatch(setEditIndex(globalIndex));
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const globalIndex = (currentPage - 1) * itemsPerPage + index;
      dispatch(deleteUser(globalIndex));
    }
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const filteredData = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changePage = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else if (direction === 'next' && currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 p-12">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-3xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Add User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800"
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border px-3 py-2 mb-4 rounded-md"
          />
            <table className="min-w-full text-sm text-left border border-gray-300">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Sr. No.</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">No data found.</td>
                </tr>
              ) : (
                paginatedData.map((user, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2 space-x-2">
                      <button onClick={() => handleEdit((currentPage - 1) * itemsPerPage + index)} className="text-blue-600" title='Edit'><FaEdit /></button>
                      <button onClick={() => handleDelete((currentPage - 1) * itemsPerPage + index)} className="text-red-600" title='Delete'><MdDeleteForever /></button>
                    </td>
                  </tr>
                ))
              )}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => changePage('prev')}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => changePage('next')}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
          </div>
        </div>
      </div>
  );
}

export default App;