import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select } from 'antd';
import { useEffect } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
const {Option} = Select

function UpdateProduct() {
    const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState(0);
  const [category,setCategory] = useState("");
  const [quantity,setQuantity] = useState(0);
  const [shipping,setShipping] = useState("");
  const [photo,setPhoto] = useState("");
  const [preview,setPreview] = useState(null);
  const [id,setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async()=>{
    try {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`)
        if(data?.success){
            setName(data.product.name);
            setCategory(data.product.category._id)
            setDescription(data.product.description);
            setPrice(data.product.price)
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setId(data.product._id);
            setPreview(`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${data.product._id}`)
        }
        else{
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message);
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
          toast.error(error.message);
      }
  }
  
  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("category",category);
      productData.append("quantity",quantity);
      productData.append("shipping",shipping);
      photo && productData.append("photo",photo);
      const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/product/update-product/${id}`,productData);
      if(data?.success){
        toast.success(data.message, { autoClose: 1000 }); 
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("error in axios hehe")
    }
  }
  const handleDelete = async ()=>{
    try {
        const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/product/delete-product/${id}`);
        if(data.success){
            navigate("/admin-dashboard/product");
        }
    } catch (error) {
        
    }
  }
  const handleFilePreview = (e)=>{
    const file = e.target.files[0];
    if(file){
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
    else{
      setPhoto("");
    }
  }
  useEffect(()=>{
    getAllCategory();
    getSingleProduct();
  },[])
  return (
    <Layout>
        <div className='text-center w-[100%]  m-auto flex justify-start items-start gap-4 py-10'>

        <AdminMenu />
        <div className='w-[50%]'>
        <h1 className='text-[2.5rem]'>
            Update Product
        </h1>
        <div className='m-1'>
           <Select variant={false} placeholder="Select a category" size="large" showSearch className='border-2 border-black rounded-xl w-[100%] text-left focus:outline-none mb-3' value = {category} onChange={(value)=>{
            setCategory(value);
           }}>
            {categories?.map((items)=>(
              <Option key = {items._id} value={items._id}>
                {items.name}
              </Option>
            ))}
           </Select>
           <div className='flex flex-col justify-center items-center '>
            <label htmlFor='upload' className="w-60 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-blue-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-center mt-4"> {photo?photo.name:"Upload File"} </label>
            <input 
            type='file'
            name="photo" 
            id="upload" 
            accept='image/*'
            onChange={handleFilePreview}
            className="hidden"/>
            {photo?
            <div className='mt-4 flex flex-col justify-center items-center'>
              <img src = {preview} className="h-25 w-30 text-center"/>
              <div>
              <button 
              onClick={()=>{
                setPreview(null)
                setPhoto("");
              }}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition mt-10 ml-2">
                Clear
              </button>
              </div>
            </div>:
            <div>
                <img src={preview} ></img>
            </div>}
            <div className='mt-7 w-[100%]'>
              <input type="text" value={name} onChange={(e)=>{
                setName(e.target.value)
              }}
              placeholder='Enter name'
              className='w-[100%] p-2 border-2 border-gray-600 text-gray-700 rounded-xl focus:outline-none'
              />
            </div>
            <div className='mt-7 w-[100%]'>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full p-3 border-2 border-black text-gray-800 rounded-xl focus:outline-none focus:border-black-500 transition duration-300 shadow-sm resize-none"
              rows="6"
            />
            </div>
            <div className='mt-7 w-[100%]'>
              <input type="number" value={price} onChange={(e)=>{
                setPrice(e.target.value)
              }}
              placeholder='Enter price'
              className='w-[100%] p-2 border-2 border-gray-600 text-gray-700 rounded-xl focus:outline-none'
              />
            </div>
            <div className='mt-7 w-[100%]'>
              <input type="number" value={quantity} onChange={(e)=>{
                setQuantity(e.target.value)
              }}
              placeholder='Enter quantity'
              className='w-[100%] p-2 border-2 border-gray-600 text-gray-700 rounded-xl focus:outline-none'
              />
            </div>
            <div className='mt-7 w-[100%]'>
              <Select variant={false} placeholder="Select Shipping" size="large" showSearch className='w-[100%] border-2 border-black rounded-xl text-left focus:border-none mb-3 hover:outline-none' value={shipping} onChange={(value)=>{
                setShipping(value);
              }}>
                <Option value={true}>Yes</Option>
                <Option value={false}>No</Option>
              </Select>
            </div>
            <div className='flex gap-2'>

            <button
              onClick = {handleUpdate}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition mt-10"
            >
              Update Product
            </button>
            <button
              onClick = {handleDelete}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition mt-10"
            >
              Delete Product
            </button>
            </div>
           </div>
        </div>
        </div>

        </div>
    </Layout>
  )
}

export default UpdateProduct