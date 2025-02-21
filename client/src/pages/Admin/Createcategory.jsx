import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

function Createcategory() {
    return (
        <Layout>

            <div className='text-center w-[70%] h-[70vh] m-auto flex justify-start items-start gap-4 pt-20'>

                <AdminMenu />
                <h1>
                    Create Category
                </h1>
            </div>
        </Layout>
    )
}

export default Createcategory