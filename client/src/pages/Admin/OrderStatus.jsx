import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';


function OrderStatus() {
    const params = useParams();
    const [order,setOrder] = useState([]);
    const [delivery,setDelivery] = useState("");
    const options = ["Not Process","Processing","Shipped","delivered","Cancelled"]
    const [status,setStatus] = useState(new Map());
    function formatDate(dateStr) {
        const date = dayjs(dateStr);
        const today = dayjs();
        if (date.isSame(today, 'year')) {
          return date.format(`MMMM D, h:mm a`);
        }
      
        return date.format('MMMM D, YYYY');
      }
    const getOrder = async()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-order/${params.id}`)
            setOrder(data?.order);

        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdateStatus = async()=>{
        try {
            const objArray = [...status].map(([key, value]) => ({ key, value }));
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/order/update-status`,
               {status:objArray}
            )
            setStatus(new Map());
            toast.success(data?.message)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getOrder();
    },[status])
  return (
    <Layout>
        OrderStatus
        {order?.map((item)=>(
            <div className='flex flex-col justify-start items-start  m-auto w-[50%]'>
                <div className="flex flex-row w-[100%] justify-between items-center">
                    <div className='flex flex-col '>

                        <div className='text-[1.3rem] font-bold'>
                            {item.status}
                        </div>
                        <div className='flex justify-between text-gray-600'> 
                         ₹{item.payment} . {formatDate(item.createdAt)}
                        </div>
                    </div>
                    <div className='flex justify-center items-center gap-3'>
                        <select
                        onChange = {(e)=>{
                            const id = item._id;
                            const map = new Map(status);
                            map.set(id,e.target.value);
                            setStatus(map);
                        }}
                        className='bg-gray-200 rounded-xl px-3 py-2'>
                            <option className='hidden'> Update Status </option>
                            {options.map((status)=>(
                                <option key = {status} value = {status}>{status}</option>
                            ))}
                        </select>
                        {status.has(item._id) && <button 
                        onClick = {handleUpdateStatus}
                        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 w-auto'>
                            Update
                        </button>
                        }
                        
                    </div>
                </div>
                <hr/>
                <div className='p-2 flex w-[40%] p-2 justify-start items-start gap-6 overflow-scroll scrollbar-hidden'>
                    {item.products?.map((product,ind)=>(
                            <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product?._id}`} className='h-22 w-22 rounded-xl border-red'/>
                    ))}
                </div>
            </div>
        ))}
    </Layout>
  )
}

export default OrderStatus