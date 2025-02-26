import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth.jsx'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import {Button, Checkbox, Radio} from 'antd'
import { prices } from '../components/Prices.js';
import { useCart } from '../context/cart.jsx';

function HomePage() {
  const [auth,setAuth] = useAuth();
  const [cart,setCart] = useCart();
  const [products,setProducts] = useState([]);
  const [categories,setCategories] = useState([]);
  const [checked,setChecked] = useState([]);
  const [radio,setRadio] = useState(""); 
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllProducts = async()=>{
    try {
      setLoading(true);
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }
  const getTotal = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/total-product`);
      if(data?.success){
        setTotal(data.totalLength);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getAllCategory = async ()=>{
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/all-category`)
        if(data?.success){
            setCategories(data.category);
        }
    } catch (error) {
        console.log(error)
    }
}

  const load = async()=>{
    try {
      setLoading(true);
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products,...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  const handleFilter = async(value,id)=>{
    let all = [...checked];
    if(value){
      all.push(id);
    }
    else{
      //id removed after it is unchecked
      all = all.filter(category => category!==id);
    }
    setChecked(all);
  }
  useEffect(()=>{
    if(page === 1) return;
    load();
  },[page])
  useEffect(()=>{
    getAllCategory();
    getTotal()
  },[])
  useEffect(()=>{
    if(checked!=null && radio!=null && checked.length == 0 && radio.length == 0){
      getAllProducts();
    } 
  },[checked?.length,radio?.length])
  useEffect(()=>{
    if((checked!=null && checked.length) || (radio!=null && radio.length)) filterProduct();
  },[checked,radio]);
  const filterProduct = async()=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`,{checked,radio});
      if(data?.success){
        setProducts(data.products);
        console.log(data.products);
      }
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    localStorage.setItem("cart",JSON.stringify(cart)); 
  },[cart])
  return (
    <Layout title={"Best Offers"}> 
        <div className='flex mt-3 py-10 justify-center items-start w-[100%] m-auto'>
          <div className='flex flex-col w-[50%] items-center justify-start'>
            <h1 className='text-[1.5rem]'>Filter by category</h1>
            <div className='flex flex-col justify-center width-[80%] items-start text-center'>
            {categories?.map((category)=>(
              <Checkbox key= {category._id} checked = {checked.includes(category._id)} onChange={(e)=>{
                  handleFilter(e.target.checked,category._id);
                }}>{category.name}</Checkbox>
              ))}
            </div>
            <h1 className='text-[1.5rem]'>Filter by price</h1>
            <div className='flex flex-col'>
              <Radio.Group value = {radio} onChange={(e)=>{
                    setRadio(e.target.value);
                  }}>
                {prices?.map(price =>(
                  <div key = {price._id}> 
                    <Radio value={price.array}>
                    {price.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className='flex flex-col'>
            <button
              onClick={() => {
                setChecked([]);
                setRadio([])}}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Reset Filters
            </button>
            </div>
          </div>
          <div className='flex flex-col'>
            <h1 className='text-center text-[2rem]'>All Products </h1>
            <div className='flex flex-wrap justify-center items-center '>
              <h1> Products </h1>
              <div className='flex flex-wrap flex-row justify-center items-center gap-4 mt-5'>
                    {products?.map((product)=>{
                        return (
                            // <Link key = {product._id}  to={`${product.slug}`}>
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

                                <button 
                                onClick = {()=>{
                                  setCart([...cart,product]);
                                }}
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 w-auto ">
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
                    })}
                    </div>
            </div>
              <div className='m-2 p-3'>
                {products && products.length<total && (
                  <button  
                  onClick={async(e)=>{
                    e.preventDefault();
                    setPage((prev)=>prev+1)
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-green-300 w-auto ">
                   {loading?"Loading...":"Loadmore"}
                  </button>
                )}

              </div>
          </div>

        </div>
    </Layout> 
  )
}

export default HomePage