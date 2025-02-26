import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

function ProductDetails() {
    const params = useParams();
    const [product,setProduct] = useState({});
    const [relatedProduct,setRelatedProduct] = useState([]);
    const navigate = useNavigate(); 
    const getProducts = async()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`);
            if(data?.success){
                setProduct(data.product)
                getSimilarProducts(data?.product._id,data?.product.category._id);   
            }
        } catch (error) {
            
        }
    }
    const getSimilarProducts = async(pid,cid)=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/similar-product/${pid}/${cid}`);
            setRelatedProduct(data?.product);
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        if(params?.slug){
            getProducts()
        }
    },[params?.slug])
  return (
    <Layout>
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4">
                    <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product?._id}`} alt="Product Image" />
                    </div>
                    
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product?.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {product?.category?.name} 
                    </p>
                    <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">${product?.price}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability: </span>
                        <span className="text-gray-600 dark:text-gray-300">{product?.quantity}</span>
                    </div>
                    </div>
                    
                    
                    <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        {product?.description}
                    </p>
                    </div>
                    <div className="flex my-6 justify-center items-center mb-4">
                    <div className="px-2">
                        <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='flex justify-center items-center text-[2.5rem] text-white font-bold'>
                Similar Products
            </div>
            <div className='text-white w-[80%] flex m-auto justify-center items-center'>
                <div className='flex gap-4 items-center justify-center'>
                    {relatedProduct.map(related=>(
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800" key = {related._id}>
                        <div className="h-56 w-full">
                           
                            <img className="mx-auto hidden h-full dark:block" src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${related._id}`}  />
                            {/* </a> */}
                        </div>
                        <div className="pt-6">
                            <div className="mb-4 flex items-center justify-between gap-4">
                            <div className="flex items-center justify-end gap-1">
                                <button type="button" data-tooltip-target="tooltip-quick-look" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only"> Quick look </span>
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeWidth={2} d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                    <path stroke="currentColor" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                </button>
                                <div id="tooltip-quick-look" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top" style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: 0, transform: 'translate3d(269.333px, -1416px, 0px)'}}>
                                Quick look
                                <div className="tooltip-arrow" data-popper-arrow style={{position: 'absolute', left: 0, transform: 'translate3d(43.3333px, 0px, 0px)'}} />
                                </div>
                                <button type="button" data-tooltip-target="tooltip-add-to-favorites" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only"> Add to Favorites </span>
                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z" />
                                </svg>
                                </button>
                                <button  
                                onClick = {()=>{
                                    navigate(`/product/${related.slug}`)
                                }}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-auto ">
                                More Details 
                                </button>
                                <div id="tooltip-add-to-favorites" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700" data-popper-placement="top" style={{position: 'absolute', inset: 'auto auto 0px 0px', margin: 0, transform: 'translate3d(291.333px, -1416px, 0px)'}}>
                                Add to favorites
                                <div className="tooltip-arrow" data-popper-arrow style={{position: 'absolute', left: 0, transform: 'translate3d(61.3333px, 0px, 0px)'}} />
                                </div>
                            </div>
                            </div>
                            <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white">{related.name}</a>
                            <div className="mt-2 flex items-center gap-2">
                            </div>
                            <ul className="mt-2 flex items-center gap-4">
                            <li className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                </svg>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                            </li>
                            </ul>
                            <div className="mt-4 flex items-center justify-between gap-4">
                            <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${related.price}</p>
                            <button type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                </svg>
                                Add to cart
                            </button>
                            </div>
                        </div>
                        </div>

                    ))}
                </div>
            </div>
            </div>


    </Layout>
  )
}

export default ProductDetails