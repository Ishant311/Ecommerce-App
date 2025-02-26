import React from 'react'
import Layout from "../components/Layout/Layout"
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

function Categories() {
    const categories = useCategory();
  return (
    <Layout>
        <div className='flex flex-col h-60 justify-center items-center w-[80%] m-auto gap-10 flex-wrap'>
        {categories?.map((category)=>(
            <button key={category._id} className='bg-blue-300 text-white w-40 rounded-xl p-3'>
                <Link to={`/category/${category.slug}`}>
                    {category.name}
                </Link>
            </button>
            ))}
        </div>
    </Layout>
  )
}

export default Categories