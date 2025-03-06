import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../public/favicon.ico"

function Cart() {
    const [cart,setCart] = useCart();
    const [user,setUser] = useState(true);
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
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
    const getTotalINR = ()=>{
        let total = 0;
        cart.map((item)=>(total+=item.price));
        return total.toLocaleString("en-US",{
            style:"currency",
            currency:"INR"
        })
    }
    const getTotal = ()=>{
        let total = 0;
        cart.map((item)=>(total+=item.price));
        return total;
    }

    const getCart = (id)=>{
        let arr = [...cart];
        let index = arr.findIndex((item)=>item._id === id);
        arr.splice(index,1);
        setCart(arr);
        localStorage.setItem("cart",JSON.stringify(arr));
    }
    const checkoutHandler = async()=>{
        try {
            setLoading(true);
            const total = getTotal();
            const {data:{key}} = await axios.get(`${import.meta.env.VITE_API_URL}/api/getkey`)  
            const {data:{order}} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/checkout`,{
                cart,total
            })
            const options = {
                key, 
                amount: order.amount, 
                currency: "INR",
                name: "Ishant arora", 
                description: "Tutorial of razorpay",
                image: logo,
                order_id: order.id, 
                callback_url: `${import.meta.env.VITE_API_URL}/api/v1/product/paymentverification`,
                prefill: { 
                    name: auth?.user.name,
                    email: auth?.user.email,
                    contact: auth?.user.phone 
                },
                notes: {
                    address: "Razorpay Corporate Office",
                },
                theme: {
                    "color": "#121212"
                },
                handler:async function (response) {
                    console.log("Payment Response:", response);
                    
                    axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/paymentverification`, {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                        cart,
                        total
                    }).then(res => {
                        navigate('/dashboard/order');
                        setLoading(false);
                        setCart([]);
                        localStorage.removeItem("cart");
                    }).catch(err => {
                        toast.error("Payment Failed!");
                        setLoading(false);
                    });
                }
            };
            const razor = new window.Razorpay(options);
            razor.open();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(()=>{
        verifyUser()
    },[user]);
    useEffect(()=>{
        getTotal();
    },[cart]);
  return (
    <Layout>
        <div>
            Cart
        </div>
        <div className='flex justify-start items-start p-5'>
            <div className='flex-2'>
            {
                !user?"Login To CheckOut"
                :<div className='flex flex-wrap flex-row justify-center items-center gap-4 mt-5'>
            {cart?.map((product)=>(
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
            ))}

            </div>}
            </div>
            <div className='flex h-[15rem] text-center flex-col justify-between items-center'>
                <div className='text-[2.5rem]'>
                    Cart Summary
                </div>
                <div className='flex'>
                    <div>
                        Total | 
                    </div>
                    <div>
                        Checkout | 
                    </div>
                    <div>
                        Payment
                    </div>
                </div>
                <div>
                    Total: {getTotalINR()}
                </div>
                {auth?.user?.address ? (
                    <>
                    <div className='mb-3'>
                        <h4>Current Address </h4>
                        <h5>{auth?.user?.address}</h5>
                        <button className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-green-300 w-auto'
                        onClick={()=>navigate('/dashboard/profile')}>Update Address</button>
                    </div>
                    </>
                ):(
                    <div className="mb-3">
                        {auth?.token ? (
                            <button 
                            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-green-300 w-auto'
                            onClick={()=>{navigate('/dashboard/profile')}}> 
                                Update Address 
                            </button>
                        ):(<button 
                        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-green-300 w-auto'
                        onClick={()=>{navigate('/login',{
                            state:"/cart",
                        })}}> 
                        Please Login to Checkout 
                    </button>)}
                    </div>
                )}
                <div className="mt-2">
                    {auth?.user?
                    <button
                    onClick={checkoutHandler}
                    className = "inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-auto"
                    disabled = {loading}>
                        {loading?"Processing....":"Make Payment"}
                    </button>:null
                    }
                
                    
                        
                </div>
            </div>
        </div>
        
    </Layout>
  )
}

export default Cart