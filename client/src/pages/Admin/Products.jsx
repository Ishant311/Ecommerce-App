import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Products() {
    const [products,setProducts] = useState([]);
    const getAllProducts = async()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product`)
            console.log(data);
            if(data?.success){
                setProducts(data.product);
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllProducts();
    },[])
  return (
    <Layout>
        <div className='py-9'>
            <div className='flex flex-wrap justify-between w-[97%] m-auto'>
                <div className='w-[27rem]'>
                    <AdminMenu/>
                </div>
                <div className='flex-4 w-full'>
                    <h1 className='text-center text-[2.5rem]'>All Products List</h1>
                    <div className='flex flex-wrap flex-row gap-4 mt-5'>
                        {products.map((product)=>{
                            return (
                                <Link key = {product._id}  to={`${product.slug}`}>
                                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-2" >
                                    <a href="#">
                                        <img className="rounded-t-lg" src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`} alt = {product.name} />
                                    </a>
                                    <div className="p-5">
                                        <a href="#">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.name}</h5>
                                        </a>
                                        <p className="mb-3 font-normal text-gray-700 ">{product.description}</p>
                                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                        Update
                                        </a>
                                    </div>
                                </div>
                                </Link>
                            )
                        })}
                    </div>
                    


                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products