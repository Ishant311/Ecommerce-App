import React, { use } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'

function UserMenu() {
    const [auth,setAuth] = useAuth();
    const prefix = "/dashboard"
    const navigator = 
    [
        {title:"Profile",href:'/profile'},
        {title:"Orders",href:'/order'},
    ]
  return (
        <div className='flex justify-center items-center flex-1 flex-col'>
            <h1 className='mb-10'>
            Dashboard
            </h1>
            {navigator.map((items)=>(
                <NavLink 
                to = {`${prefix}${items.href}`}
                key = {items.title}
                className = {({isActive})=>`${isActive?"bg-blue-600 text-white hover:bg-blue-700":"bg-white hover:bg-gray-200"} border-1 border-gray-300 w-[200px] h-[45px] p-2 flex flex-col`}>
                    {items.title}
                </NavLink>
            ))}
        </div>
        
    
  )
}

export default UserMenu