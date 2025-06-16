import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-500 p-28">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-3xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Add User</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
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
          <h2 className="text-lg font-semibold">Submitted Users:</h2>
        </div>
      </div>
    </div>
  );
}

export default App;