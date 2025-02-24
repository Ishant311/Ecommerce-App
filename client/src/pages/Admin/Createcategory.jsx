import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import AddCategory from '../../components/Form/AddCategory';
import EditableTable from './Categories';

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
            if(data?.success){
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
            if(data?.success){
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
                <EditableTable categories={categories} getAllCategory={getAllCategory}/>

                    
                </div>
                
                </div>
            </div>
        </Layout>
    )
}

export default Createcategory