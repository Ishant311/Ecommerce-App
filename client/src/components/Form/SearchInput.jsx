import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchInput() {
    const [values,setValues] = useSearch();
    const navigate = useNavigate()
    const handleSearch = async(e)=>{
        e.preventDefault();
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/search-product/${values.keyword}`)
            if(data?.success){
                setValues({...values,results:data.product});
                navigate("/search");
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
        <>
        <div className='block lg:hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7 mr-2">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="hidden lg:block w-[20%] [800px]:w-[30%] max-w-sm min-w-[20%]">
            <div className="relative">
            <input 
            className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" 
            value = {values.keyword}
            onChange={(e)=>setValues({...values,keyword:e.target.value})}
            placeholder="Search Products" />
            <button 
            onClick={handleSearch}
            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                </svg>
                Search
            </button> 
            </div>
        </div>
    </>
  )
}

export default SearchInput