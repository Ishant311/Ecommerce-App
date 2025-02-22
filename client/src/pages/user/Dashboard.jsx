import React from 'react'
import Layout from "../../components/Layout/Layout"
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';

function Dashboard() {
  const [auth,setAuth] = useAuth();
  return (
    <Layout title = "user-dashboard">
        <div className = "flex items-center justify-center h-[70vh] w-[60%] m-auto "> 
          <UserMenu/>
          <div className='w-[50%] flex items-start justify-start border-2 flex-col items-center p-5 text-gray-600 border-gray-400'>
            <h1>{auth.user.name}</h1>
            <h1>{auth.user.email}</h1>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard