import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';

function Order() {
  const [orders,setOrders] = useState([]);
  const [orderedProducts,setOrderedProducts] = useState([]);
  const [cntMap,setCntMap] = useState(new Map());
  const [delivery,setDelivery] = useState(new Map());
  const getOrders = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-order`);
      setOrders(data?.order);
    } catch (error) {
      console.log(error);
    }
  }
  const getProductDetails = async(products)=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product`,{
        products
      })
      setOrderedProducts(data?.productDetails);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getOrders();
  },[])
  useEffect(()=>{
    // console.log("hello",orders);
    const map = new Map();
    const delivered = new Map();
    if(orders.length>0){
      let products = [];
      for(let i = 0;i<orders.length;i++){
        for(let j = 0;j<orders[i].products.length;j++){
          products.push(orders[i].products[j]);
          map.set(orders[i].products[j], (map.get(orders[i].products[j]) || 0)+1);
          
          delivered.set(orders[i].products[j],orders[i].status)
        }
      }
      setDelivery(delivered);
      setCntMap(map);
      getProductDetails(products);
    }
  },[orders && orders.length > 0]);
  return (
    <Layout>
        <div>Order</div>
        <div className='flex flex-wrap flex-row justify-start items-start gap-4 mt-5'>
        <UserMenu/>
        <div className='flex-2 flex gap-5 flex-wrap'>
            {orderedProducts?.map((product)=>{
              return (
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
                            
                            </div>
                            <div className='flex justify-between '>
                            <p className=" mb-3 font-normal text-gray-700 ">
                              {product.price}$  
                            </p> 
                            <div className='bg-yellow-300 w-15 text-center flex justify-center items-center text-white text-[1rem] font-bold rounded-xl mb-4'>
                               {cntMap.get(product._id)} 
                            </div>
                            </div>
                            <div>
                              
                              Delivery Status: <span className={`${delivery.get(product._id) === "Not Process"?"bg-red-500":"bg-blue-300"} w-105 p-2 text-center text-white rounded-xl`}>{delivery.get(product._id)}</span>
                            </div>
                        </div>
                    </div>
                )
              })}
            </div>
            </div>
    </Layout>
  )
}
export default Order
