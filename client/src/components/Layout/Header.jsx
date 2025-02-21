import React from 'react'

import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {  NavLink,useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth'


function Header() {
  const cartVal = 0;
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const navigation = [
  ]
  auth.user === null?
    navigation.push(
      { name: 'Home', href: '/'},
      { name: 'Register', href: '/register'},
      { name: 'Login', href: '/login'},
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
      <Disclosure as="nav" className="bg-gray-800 flex justify-between nav">
        <div className="mx-auto w-[100%] px-2 md:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 right-0 flex items-center md:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-between">
                <div className='flex sm:items-center sm:justify-between sm:w-[10vw] w-26 items-center justify-evenly'>
                <i className="fa-solid fa-cart-shopping text-white sm:text-2xl"></i> 
                <span className='text-white sm:text-3xl'>Ecommerce</span>
                </div>
              <div className="hidden md:ml-6 md:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className={({ isActive }) =>
                        `${isActive ? 'bg-gray-900 text-white' : 'text-gray-300  hover:bg-gray-700 hover:text-white'} rounded-md px-3 py-2 link`
                      }
                    >
                      {item.name === "Cart"?`Cart (${cartVal})`:item.name}
                    </NavLink>
                  ))}
                  {
                  auth?.user?.name?(
                        <select id="options" name="options" className='text-white text-center' onChange={(e)=>{
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
        </div>

      </Disclosure>


    </>
  )
}

export default Header