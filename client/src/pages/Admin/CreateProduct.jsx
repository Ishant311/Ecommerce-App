import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

function CreateProduct() {
  return (
    <Layout>
        <div className='text-center w-[90%] h-[70vh] m-auto flex justify-start items-start gap-4 pt-10'>

        <AdminMenu />
        <h1 className='text-[2.5rem]'>
            Create Product
        </h1>
        </div>
    </Layout>
  )
}

export default CreateProduct