import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

function Users() {
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();
  const getUsers = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/all-users`)
      setUsers(data?.allUsers);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUsers();
  },[])
  return (
    <Layout>
       <div className='text-center w-[90%] p-5 m-auto flex justify-start items-start gap-4 pt-10'>

        <AdminMenu />
        <div className='flex flex-col justify-start items-start w-[100%]'>
        <h1 className='text-[2.5rem]'>
            Users
        </h1>
        <div className="flex justify-center items-center gap-3 flex-col w-[100%]">
          {users?.map((user)=>(
            <div className='p-3 flex justify-between items-center w-[100%] rounded-xl shadow-xl'>
              <div className="bg-white border-red-400 flex justify-start items-start flex-col w-[40%]">
                <div className='text-[2.5rem]'>{user.name}</div>
                <div>{user.email}</div>
                <div className='flex items-center justify-between w-[80%]'>
                  <div>{user.address}</div>
                  <div>Phone:{user.phone}</div>
                </div>
              </div>
              <div className='flex justify-evenly items-center w-[50%]'>
                <button 
                onClick={()=>{
                  navigate(`/admin-dashboard/order/${user._id}`)
                }}
                className='px-3 py-2 bg-blue-600 items-center text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition'>
                  Orders
                </button>
                <button 
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 w-auto'>
                  Delete User
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users