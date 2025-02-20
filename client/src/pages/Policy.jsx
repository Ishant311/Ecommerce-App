import React from 'react'
import Layout from '../components/Layout/Layout'
import policy from "../assets/contactus.jpeg"

function Policy() {
  return (
    <Layout title={"Privacy Policy"}>
        <div className="flex md:flex-row flex-col justify-between items-center p-4 md:w-[70%]  w-[90%] m-auto md:h-[73vh] gap-10">
                  <div className='md:w-[50%] w-[85%]'>
                    <img src={policy}/>
                  </div>
                  <div className='md:w-[50%] w-[85%]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque suscipit amet obcaecati odio nihil voluptatum ipsa, sed vero molestias nostrum earum maiores dolorum consequatur dicta dignissimos, corporis maxime? Facere, sed. Assumenda deleniti libero distinctio magni. Quos repudiandae ea facere doloribus hic perspiciatis. Dignissimos quas esse ab cumque quaerat
                  </div>
                </div>
    </Layout>
  )
}

export default Policy