import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

function Pagenotfound() {
  return (
    <Layout title={"Page not found!"}>
        <div className="flex justify-center items-center h-[73vh] flex-col">
          <div className='text-[4.4rem] font-bold'>
            404
          </div>
          <div>
            <h1 className = 'text-3xl pb-3 text-gray-700'> Oops! Page Not Found </h1>
          </div>
          <div className = 'p-4'>
            <Link to="/">
              <button className='border-2 border-black cursor-pointer p-2 text-gray-500 hover:text-black'>
                Go Back
              </button>
            </Link>
          </div>
        </div>
    </Layout>
  )
}

export default Pagenotfound