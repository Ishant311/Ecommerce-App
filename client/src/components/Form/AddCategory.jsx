import React from 'react'

function AddCategory({handleSubmit,category,setCategory}) {
  return (
    <div>
        <form onSubmit = {handleSubmit} className='flex gap-5'>
        <input
            className="w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition duration-300"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category..."
        />
        <button  type="submit" className="bg-blue-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer">
            Add
        </button>
        </form>
    </div>
  )
}

export default AddCategory