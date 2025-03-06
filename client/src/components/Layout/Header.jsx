import React, { useEffect, useState } from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {  Link, NavLink,useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import { useCart } from '../../context/cart'


function Header() {
  const [cart] = useCart();
  const [auth,setAuth] = useAuth();
  const [search,setSearch] = useState(false);
  const navigate = useNavigate();
  const categories = useCategory();
  const [value,setValue] = useState(categories?.[0]?.slug || "");
  const navigation = [
  ]
  auth.user === null?
    navigation.push(
      { name: 'Home', href: '/'},
      { name: 'Register', href: '/register'},
      { name: 'Login', href: '/login'},
      { name: 'Cart', href: '/cart'},
      { name: 'Categories',href:'/categories'},
  ):(
    navigation.push(
      { name: 'Home', href: '/'},
      { name: 'Categories',href:'/categories'},
      { name: 'Cart', href: '/cart'},
    )
  )
  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth');
    navigate("/login");
  }
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 flex justify-between nav w-[100%] fixed top-0 z-100">
          {search === false?        
          <div className="mx-auto w-[100%] px-2 md:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex items-center justify-between w-[100%]">
                <div className='flex sm:items-center sm:justify-between sm:w-[10%] w-[5%] items-center justify-evenly'>
                <i className="fa-solid fa-cart-shopping text-white sm:text-2xl"></i> 
                <span className='text-white sm:text-[90%]'>Ecommerce</span>
                </div>
              <div className="flex hidden md:ml-6 md:block flex-1">
                <div className="flex space-x-4 justify-end items-center">
                  <SearchInput/>

                  {navigation.map((item) => 
                    item.name !== "Categories"?(
                      <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `${isActive ? 'bg-gray-900 text-white' : 'text-gray-300  hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 link`
                    }
                    >
                      {item.name === "Cart"?`Cart (${cart?.length})`:item.name}
                    </NavLink>):( 
                      <select key={item.name} className='text-white' value={value} onChange={(e)=>{
                        setValue(e.target.value);
                        if(e.target.value.length !== 0){
                          navigate(`/category/${e.target.value}`);
                        }
                        else{
                          navigate(`/category`);
                        }
                      }}>
                        <option className='hidden' value="">
                          Category
                        </option>
                        <option className="bg-black" value="">
                          All Category
                        </option>
                        {categories.map(category=>(
                          // <Link to = {`/category/${category.slug}`}>
                          <option key = {category._id} value = {category.slug} className='bg-black'>{category.name}</option>
                          
                        ))}
                    </select> )
                  )}
                    
                  {
                    auth?.user?.name?(
                      <select id="options" className='text-white text-center' onChange={(e)=>{
                        e.target.value === "logout"?handleLogout():e.target.value === "dashboard" && auth.user.role === 1?navigate("/admin-dashboard"):navigate("/dashboard")}}>
                          <option value="profile" className='text-black hidden'>{auth.user.name}</option>
                          <option value="dashboard" className='text-black'>Dashboard</option>
                          <option value="logout" className='text-black'>Logout
                          </option>
                        </select>
                  ):null
                }
                </div>
                  
                </div>
              </div>
            </div>
            <div className="sl:hidden fixed right-0 top-16 w-full bg-gray-800 z-10">
                <DisclosurePanel>
                <div className="space-y-1 px-2 pt-2 pb-3 flex flex-col items-end"> 
                  {navigation.map((item) => (
                      <NavLink
                      key={item.name}
                      to = {item.href}
                      className={({ isActive }) =>
                        `${isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                
              </DisclosurePanel>
            </div>
          </div>
    :<SearchInput/>}

      </Disclosure>


    </>
  )
}

export default Header