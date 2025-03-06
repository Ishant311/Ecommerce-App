import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth.jsx'
import axios from 'axios';
import banner from "../assets/banner.png";
import { Link, useNavigate } from 'react-router-dom'
import { prices } from '../components/Prices.js';
import { useCart } from '../context/cart.jsx';
import { toast } from 'react-toastify';

function HomePage() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/total-product`);
      if (data?.success) {
        setTotal(data.totalLength);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/all-category`)
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }
  const handleFilter = async (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    }
    else {
      //id removed after it is unchecked
      all = all.filter(category => category !== id);
    }
    setChecked(all);
  }
  useEffect(() => {
    if (page === 1) return;
    load();
  }, [page])
  useEffect(() => {
    getAllCategory();
    getTotal()
  }, [])
  useEffect(() => {
    if (checked != null && radio != null && checked.length == 0 && radio.length == 0) {
      getAllProducts();
    }
  }, [checked?.length, radio?.length])
  useEffect(() => {
    if ((checked != null && checked.length) || (radio != null && radio.length)) filterProduct();
  }, [checked, radio]);
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`, { checked, radio });
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
    }
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart])
  return (
    <Layout title={"Best Offers"}>
      <img src={banner} className='w-full' />
      <div className='flex mt-3 py-10 justify-center items-start w-[100%] m-auto'>
        <div className='flex flex-col w-[50%] items-center justify-start'>
          <div className="flex flex-col justify-center items-start space-y-2 p-4 bg-white shadow-md rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Select Categories
            </h3>
            {categories?.map((category) => (
              <label
                key={category._id}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer w-full md:w-auto"
              >
                <input
                  type="checkbox"
                  checked={checked.includes(category._id)}
                  onChange={(e) => handleFilter(e.target.checked, category._id)}
                  className="text-gray-600 w-4 h-4 cursor-pointer"
                />

                <span className="text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>


          <div className="flex flex-col space-y-2 p-3  mb-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Select Price Range</h3>
            <div className="space-y-2 w-full">
              {prices?.map((price) => (
                <label
                  key={price._id}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                  <input
                    type="radio"
                    name="price"
                    value={JSON.stringify(price.array)}
                    checked={JSON.stringify(radio) === JSON.stringify(price.array)}
                    onChange={(e) => setRadio(JSON.parse(e.target.value))}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">{price.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='flex flex-col'>
            <button
              onClick={() => {
                setChecked([]);
                setRadio([])
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-wrap justify-center items-center '>

            <div className='flex flex-wrap flex-row justify-center items-center gap-4 mt-5'>
              {products?.map((product) => {
                return (
                  // <Link key = {product._id}  to={`${product.slug}`}>
                  <div
                    className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-5 flex flex-col justify-between"
                    key={product._id}
                  >
                    <div>
                      <a href={`/product/${product.slug}`} className="block relative">
                        <img
                          className="w-full h-56 object-cover rounded-xl"
                          src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                          alt={product.name}
                        />
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                      </a>
                      <div className="mt-4">
                        <a href={`/product/${product.slug}`} className="block">
                          <h5 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors duration-200">
                            {product.name}
                          </h5>
                        </a>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {product?.description?.substring(0, 80)}...
                        </p>
                        <p className="mt-3 text-lg font-medium text-green-700">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                    <div className="mt-5">
                      <button
                        onClick={() => {
                          setCart([...cart, product]);
                          toast.success("Product Added Successfully", {
                            autoClose: 1000,
                          });
                        }}
                        className="w-full px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  // </Link>
                )
              })}
            </div>
          </div>
          <div className='m-2 p-3 flex justify-center items-center'>
            {checked.length == 0 && radio.length == 0 && products && products.length < total && (
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  setPage((prev) => prev + 1)
                }}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-700 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-green-300 w-auto ">
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}

          </div>
        </div>

      </div>
    </Layout>
  )
}

export default HomePage