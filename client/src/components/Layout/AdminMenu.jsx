import React, { use } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'

function AdminMenu() {
    const [auth,setAuth] = useAuth();
    const prefix = "/admin-dashboard"
    const navigator = 
    [
        {title:"Create Category",href:'/create-category'},
        {title:"Add Product",href:'/add-product'},
        {title:"Products",href:'/product'},
        {title:"Users",href:'/users'}
        
    ]
  return (
   
        
        <div className = "flex justify-center items-center text-center flex-col w-[450px]">
        <h1 className='mb-6 text-[1.5rem]'>
        Admin Panel
        </h1>
        {navigator.map((items)=>(
            <NavLink 
            to = {`${prefix}${items.href}`}
            key = {items.title}
            className = {({isActive})=>`${isActive?"bg-blue-600 text-white hover:bg-blue-700":"bg-white hover:bg-gray-200"} border-1 border-gray-300 w-[360px] h-[45px] p-2`}>
                {items.title}
            </NavLink>
        ))}
        </div>
        
    
  )
}

export default AdminMenu