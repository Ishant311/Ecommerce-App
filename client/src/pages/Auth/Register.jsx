import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import {toast} from "react-toastify"
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [address,setAddress] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const sendData = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`,{name,email,password,phone,address,answer})
            if(sendData.data.success){
                toast.success(sendData.data.message);
                setTimeout(()=>{
                    navigate('/login');
                },3000);
            }
            else{
                toast.error(sendData.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout title="Register">
            <section className="bg-gray-50 dark:bg-gray-900 p-10">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <i className="fa-solid fa-cart-shopping text-white sm:text-2xl"></i> 
                        Ecommerce
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create an account
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ishant Arora" required />
                                </div>
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
                                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone no.</label>
                                    <input 
                                    type="text"
                                    id="phone" 
                                    value = {phone}
                                    onChange = {(e)=>{
                                        setPhone(e.target.value);
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="70XXXXXX89" required />
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="India" required />
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
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Security-question</label>
                                    <input 
                                    type="text" 
                                    id="answer" 
                                    value = {answer}
                                    onChange = {(e)=>{
                                        setAnswer(e.target.value);
                                    }}
                                    placeholder="What is Your Favourite Sports?" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <button 
                                type="submit"
                                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to ="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Register