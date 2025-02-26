import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';

function Cart() {
    const [cart,setCart] = useCart();
    const [user,setUser] = useState(true);
    let cntMap = new Map();
    const verifyUser = async()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`);
            if(data?.ok){
                setUser(true);
            }
            else{
                setUser(false)
            }
        } catch (error) {
            
        }
    }
    const getCart = (id)=>{
        let arr = cart;
        console.log(id);
        arr = arr.filter((cat)=>(cat._id !== id));
        setCart(arr);
        localStorage.setItem("cart",JSON.stringify(arr));
    }
    useEffect(()=>{
        verifyUser()
    },[user]);
    // useEffect(()=>{

    // },[cart]);
  return (
    <Layout>
        <div>
            Cart
        </div>
        {
        !user?"Login To CheckOut"
        :<div className='flex flex-wrap flex-row justify-center items-center gap-4 mt-5'>
        {cart?.map((product)=>(
            cntMap[product._id] >= 1?(
                <div>
                    hello
                </div>
            ):(
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-2 h-120 flex flex-col justify-evenly" key = {product._id}>
                <div className="">
                    <a href="#">
                        <img className="rounded-t-lg" src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`} alt = {product.name} />
                    </a>
                    <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{product.name}</h5>
                    </a>
                    <div>
                    {cntMap[product._id]++};
                    <p className="overflow-hidden  w-60 mb-3 font-normal text-gray-700 ">{product?.description?.substring(0,30)}...</p>
                    <p className="overflow-hidden w-60 mb-3 font-normal text-gray-700 ">{product.price}$</p>
                    </div>
                    
                </div>
                <div className='flex justify-between items-center w-[100%] m-auto'>
                <button  
                onClick={()=>{
                    getCart(product._id);
                }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 w-auto">
                Remove
                </button>
                <button  
                onClick ={()=>{
                    navigate(`/product/${product.slug}`)
                }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-auto ">
                More Details 
                </button>
                </div>
            </div>
            )
        ))}
        </div>}
        
    </Layout>
  )
}

export default Cart