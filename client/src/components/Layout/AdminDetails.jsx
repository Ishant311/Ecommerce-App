import React from 'react'
import { useAuth } from '../../context/auth';
function AdminDetails() {
    const [auth,setAuth] = useAuth();
  return (
    <div className="flex flex-col items-start justify-center w-[60%] h-[40%] border-2 border-gray-400 p-2">
        <h1 className='text-[2vw] text-gray-700'> Admin Name : {auth?.user?.name}</h1>
        <h1 className='text-[2vw] text-gray-700'> Admin Mail : {auth?.user?.email}</h1>
        <h1 className='text-[2vw] text-gray-700'> Admin Phone : {auth?.user?.phone}</h1>
    </div>
  )
}

export default AdminDetails