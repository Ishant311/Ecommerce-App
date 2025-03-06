import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CreateProduct() {
  const [categories,setCategories] = useState([]);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState("");
  const [quantity,setQuantity] = useState("");
  const [shipping,setShipping] = useState("");
  const [photo,setPhoto] = useState("");
  const [preview,setPreview] = useState(null);
  const navigate = useNavigate();

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
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("category",category);
      productData.append("quantity",quantity);
      productData.append("shipping",shipping);
      productData.append("photo",photo);
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/create-product`,productData);
      console.log(data);
      if(data?.success){
        toast.success(data.message, { autoClose: 1000 }); 
        setTimeout(() => navigate("/admin-dashboard/product"), 1000);
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("error in axios hehe")
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
  },[])
  return (
    <Layout>
        <div className='text-center w-[100%]  m-auto flex justify-start items-start gap-4 py-10'>

        <AdminMenu />
        <div className='w-[50%]'>
        <h1 className='text-[2.5rem]'>
            Create Product
        </h1>
        <div className='m-1'>
           <select  placeholder="Select a category" className='border-2 border-black rounded-xl w-[100%] text-left focus:outline-none mb-3' onChange={(value)=>{
            setCategory(value);
           }}>
            {categories?.map((items)=>(
              <option key = {items._id} value={items._id}>
                {items.name}
              </option>
            ))}
           </select>
           <div className='flex flex-col justify-center items-center '>
            <label htmlFor='upload' className="w-60 px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-blue-700 bg-gray-100 hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center justify-center mt-4"> {photo && photo.name} {photo?null:"Upload File"} </label>
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
            </div>:null}
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
              <select placeholder="Select Shipping"  className='w-[100%] border-2 border-black rounded-xl text-left focus:border-none mb-3 hover:outline-none' onChange={(value)=>{
                setShipping(value);
              }}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <button
              onClick = {handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition mt-10"
            >
              Create Product
            </button>
           </div>
        </div>
        </div>

        </div>
    </Layout>
  )
}

export default CreateProduct