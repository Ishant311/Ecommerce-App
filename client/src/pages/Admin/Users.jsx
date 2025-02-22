import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

function Users() {
  return (
    <Layout>
       <div className='text-center w-[90%] h-[70vh] m-auto flex justify-start items-start gap-4 pt-10'>

        <AdminMenu />
        <h1 className='text-[2.5rem]'>
            Users
        </h1>
      </div>
    </Layout>
  )
}

export default Users