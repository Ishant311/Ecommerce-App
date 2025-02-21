import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import AdminDetails from '../../components/Layout/AdminDetails'
function AdminDashboard() {
  return (
    <Layout title="admin-dashboard">
        <div>AdminDashboard</div>
        <div className='text-center w-[70%] h-[70vh] m-auto flex justify-start items-center gap-4'>
        <AdminMenu />
        <AdminDetails/>
        </div>
    </Layout>
  )
}

export default AdminDashboard