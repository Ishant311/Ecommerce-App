import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import AddCategory from '../../components/Form/AddCategory';

function Createcategory() {
    const [categories,setCategories] = useState([]);
    const [name,setName] = useState("");
    const [readOnly,setReadOnly] = useState("");
    const [editedValue,setEditedValue] = useState([]);
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/category/create-category`,{
                name
            });
            if(data.success){
                getAllCategory();
                setName("");
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            
        }
    }
    const getAllCategory = async ()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/all-category`)
            if(data.success){
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        getAllCategory();
    },[setCategories])
    return (
        <Layout>

            <div className='text-center w-[90%]  m-auto flex justify-start items-start py-10'>

                <AdminMenu />
                <div className='flex flex-col justify-center items-center w-[60%] gap-6'>

                <h1 className='text-[2.5rem]'>
                    Manage Category
                    
                </h1>
                <div>
                    <AddCategory handleSubmit={handleSubmit} category={name} setCategory={setName} />
                    
                </div>
                <div>
                <table className="w-[30rem] border border-gray-300 rounded-lg shadow-sm">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">No.</th>
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {categories?.map((items, index) => {
                            
                            return (
                            <tr
                                key={items._id}
                                className="border-b border-gray-300 transition duration-200"
                            >
                                <td className="py-3 px-6 text-left">{index + 1}</td>
                                <td className="py-3 px-6 text-left " >
                                    <input type="text" value = {readOnly === items._id?editedValue:items.name}
                                    readOnly = {
                                        readOnly !== items._id
                                    } 
                                    onChange={(e)=>{
                                        setEditedValue(e.target.value);
                                    }}
                                    className={`${(readOnly === items._id)?"w-full px-4 py-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800 transition duration-300":"cursor-context-menu focus:outline-none"}`}/>
                                    </td>
                                <td className="py-3 px-6 text-center">
                                    <div className='flex items-center justify-center gap-3'>

                                {readOnly === items._id?
                                <button 
                                onClick = {async()=>{
                                    setReadOnly("")
                                    try {
                                        
                                        const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/category/update-category/${items._id}`)
                                        if(data.success){
                                            toast.success(data.message);
                                        }
                                    } catch (error) {
                                        toast.error("error in server");
                                    }
                                    
                                }}
                                className='bg-green-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-green-600 transition duration-300'>
                                        Save
                                </button>:
                                <button
                                onClick = {()=>{setReadOnly(items._id)}}
                                className='bg-yellow-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300'
                                >
                                    Edit
                                </button>}
                                <button className="bg-red-500 text-white px-3 py-1.5 rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer">
                                    Delete
                                </button>
                                    </div>
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>

                    
                </div>
                
                </div>
            </div>
        </Layout>
    )
}

export default Createcategory