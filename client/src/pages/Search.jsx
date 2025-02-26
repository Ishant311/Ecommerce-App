import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

function Search() {
    const [values,setValues] = useSearch();
  return (
    <Layout title="Search results">
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <div className='w-[100%] '>
                {values?.results.length < 1 ? "No Products Found":`Found ${values.results.length} products`
                }
                {values?.results.length >= 1 ?

                <div className='flex flex-wrap flex-row justify-center items-center gap-4 mt-5'>
                     {values.results.map((product)=>(
                        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-2 h-120 flex flex-col justify-evenly" key = {product._id}>
                        <div className="">
                            <a href="#">
                                <img className="rounded-t-lg" src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`} alt = {product.name} />
                            </a>
                            <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.name}</h5>
                            </a>
                            <div>
   
                            <p className="overflow-hidden  w-60 mb-3 font-normal text-gray-700 ">{product?.description?.substring(0,30)}...</p>
                            <p className="overflow-hidden w-60 mb-3 font-normal text-gray-700 ">{product.price}$</p>
                            </div>
                            
                        </div>
                        <div className='flex justify-between items-center w-[100%] m-auto'>
   
                        <button  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 w-auto ">
                        Add to Cart 
                        </button>
                        <button  
                        onClick = {()=>{
                            navigate(`/product/${product.slug}`)
                          }}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-auto ">
                        More Details 
                        </button>
                        </div>
                    </div>
                
                ))}
                </div>:null}
                </div>
            </div> 

        </div>
    </Layout>
  )
}

export default Search