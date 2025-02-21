import React from 'react'
import Layout from "../../components/Layout/Layout"
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth';

function Dashboard() {
  const [auth,setAuth] = useAuth();
  return (
    <Layout title = "user-dashboard">
        <div className = "flex items-center justify-center h-[70vh]"> 
          <UserMenu/>
          <div>
            <h1>{auth.user.name}</h1>
            <h1>{auth.user.email}</h1>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard