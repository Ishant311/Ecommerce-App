import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className = "bg-gray-900 text-white p-3" >
        <h1 className='text-center text-3xl'> 
            All Right Reserved &copy; Ishant Arora
        </h1>
        <p className="text-center mt-3 p-4">
          <Link to="/about" className="p-4 hover:text-gray-100 hover:font-medium">About</Link>
          |
          <Link to="/contact" className="p-4 hover:text-gray-100 hover:font-medium">Contact</Link>
          |
          <Link to="/policy" className="p-4 hover:text-gray-100 hover:font-medium">Privacy Policy</Link>
        </p>
    </div>
  )
}

export default Footer