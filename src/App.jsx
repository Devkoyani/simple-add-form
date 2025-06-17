import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setFormData({ name: '', email: '' });
  }
  return (
    <div className="min-h-screen bg-gray-500 p-28">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-3xl p-6">
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
            Add
          </button>
        </form>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Submitted Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border border-gray-300">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Sr. No.</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {submittedData.map((user, index) => (
                <tr>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                </tr>
                ))}
                {submittedData.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-500">No users added yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;