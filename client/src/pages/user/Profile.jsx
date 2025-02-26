import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import {useAuth} from "../../context/auth"
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  const [auth,setAuth] = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [address,setAddress] = useState("");
  const handleSubmit = async (e)=>{ 
      e.preventDefault();
      try {
          const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/auth/profile`,{name,email,password,phone,address})
          if(data?.success){
              setAuth({...auth,user : data?.updatedUser})
              let ls = localStorage.getItem("auth");
              ls = JSON.parse(ls);
              ls.user = data?.updatedUser
              localStorage.setItem("auth",JSON.stringify(ls));
              toast.success("User Updated Successfully");
          }
          else{
              toast.error(data?.error);
          }
      } catch (error) {
          console.log(error);
          toast.error("Something went wrong")
      }
  }
  useEffect(()=>{
    const {name,email,phone,address} = auth.user;
    setPhone(phone);
    setEmail(email);
    setName(name);
    setAddress(address);
  },[auth?.user])
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <UserMenu/>
        <section className="flex-2 bg-gray-50 dark:bg-gray-900 p-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Update Profile
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input 
                                    type="text"
                                    id="name" 
                                    value = {name}
                                    onChange = {(e)=>{
                                      setName(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ishant Arora" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Your email</label>
                                    <input 
                                    type="email"
                                    id="email" 
                                    value = {email}
                                    onChange = {(e)=>{
                                      setEmail(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" disabled/>
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone no.</label>
                                    <input 
                                    type="text"
                                    id="phone" 
                                    value = {phone}
                                    onChange = {(e)=>{
                                      setPhone(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="70XXXXXX89" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                    <input 
                                    type="text" 
                                    id="address" 
                                    value = {address}
                                    onChange = {(e)=>{
                                      setAddress(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="India" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input 
                                    type="password" 
                                    id="password" 
                                    value = {password}
                                    onChange = {(e)=>{
                                      setPassword(e.target.value);
                                    }}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                </div>
                                <button 
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Account</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
      </div>
    </Layout>
  )
}

export default Profile