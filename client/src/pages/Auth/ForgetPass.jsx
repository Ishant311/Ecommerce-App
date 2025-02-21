import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout';
import { toast } from 'react-toastify';
import axios from "axios"
import {Link, useNavigate} from "react-router-dom"


function ForgetPass() {
    const [answer,setAnswer] = useState("");
    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const navigate = useNavigate();
    const handleForgetPassword = async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,{email,answer,newPassword})
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error.data.message);
        }
    }
  return (
    <Layout title="Login">
    <section className="bg-gray-50 dark:bg-gray-900 p-10">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <i className="fa-solid fa-cart-shopping text-white sm:text-2xl"></i> 
                Ecommerce
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Change Password
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleForgetPassword}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input 
                            type="email"
                            id="email" 
                            value = {email}
                            onChange = {(e)=>{
                                setEmail(e.target.value);
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="security-answer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security-answer</label>
                            <input 
                            type="text" 
                            id="security-answer" 
                            value = {answer}
                            onChange = {(e)=>{
                                setAnswer(e.target.value);
                            }}
                            placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input 
                            type="password" 
                            id="password" 
                            value = {newPassword}
                            onChange = {(e)=>{
                                setNewPassword(e.target.value);
                            }}
                            placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button 
                        type="submit"
                        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        
                            Not an Existing User <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </Layout>
  )
}

export default ForgetPass