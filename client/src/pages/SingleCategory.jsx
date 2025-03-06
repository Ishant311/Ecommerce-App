import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useCategory from '../hooks/useCategory';
import Layout from '../components/Layout/Layout';

function SingleCategory() {
    const params = useParams();
    const [products,setProducts] = useState([]);
    const [category,setCategory] = useState([]);
    const navigate = useNavigate();
    const getCategoryProducts = async()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/category-product/${params.slug}`)
            setProducts(data?.product);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCategoryProducts();
    },[params.slug])
  return (
    <Layout>
        <div className='flex text-[4rem] justify-center items-center'>
            <div>
                {category.name}
            </div>
        </div>
        <div className='text-[1.5rem] justify-center items-center flex'>
            {products.length === 0?"No results":`${products.length} product found`}
        </div>
        <div className='flex flex-wrap flex-row justify-center items-center gap-4 mt-5'>
            {products?.map((product)=>(
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
                            <p className="overflow-hidden w-60 mb-3 font-normal text-gray-700 "> ₹ {product.price}</p>
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
                    // </Link>
                )
            )}
        </div>
    </Layout>
  )
}

export default SingleCategory