import {Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Policy from "./pages/Policy"
import Pagenotfound from "./pages/Pagenotfound"
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import Dashboard from "./pages/user/Dashboard"
import Private from "./components/Routes/Private"
import ForgetPass from "./pages/Auth/ForgetPass"
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard"
import Createcategory from "./pages/Admin/Createcategory"
import CreateProduct from "./pages/Admin/CreateProduct"
import Users from "./pages/Admin/Users"
import Order from "./pages/user/Order"
import Profile from "./pages/user/Profile"
import Products from "./pages/Admin/Products"
import { ToastContainer } from "react-toastify"
import UpdateProduct from "./pages/Admin/UpdateProduct"
import Search from "./pages/Search"
import ProductDetails from "./pages/ProductDetails"
import Categories from "./pages/Categories"
import SingleCategory from "./pages/SingleCategory"
import Cart from "./pages/Cart"
import OrderStatus from "./pages/Admin/OrderStatus"
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path = "/product/:slug" element = {<ProductDetails/>}/>
      <Route path = "/cart" element = {<Cart/>}/>
      <Route path="/search" element = {<Search/>} />
      <Route path="/category" element = {<Categories/>} />
      <Route path = "/category/:slug" element ={<SingleCategory/>} />
      <Route path="/about" element = {<About/>}/>
      <Route path = "/dashboard" element = {<Private/>}>
        <Route path = "" element = {<Dashboard/>}/>
        <Route path = "order" element = {<Order/>}/>
        <Route path = "profile" element = {<Profile/>}/>
      </Route>
      <Route path = "/admin-dashboard" element = {<AdminRoute/>}>
        <Route path = "" element = {<AdminDashboard/>}/>
        <Route path = "product" element = {<Products/>}/>
        <Route path = "create-category" element = {<Createcategory/>}/>
        <Route path = "add-product" element = {<CreateProduct/>}/>
        <Route path = "product/:slug" element = {<UpdateProduct/>}/>
        <Route path = "users" element = {<Users/>}/>
        <Route path = "order/:id" element = {<OrderStatus/>}/>
      </Route>
      <Route path="/contact" element = {<Contact/>}/>
      <Route path="/policy" element = {<Policy/>}/>
      <Route path="/forgot-password" element = {<ForgetPass/>}/>
      <Route path="/register" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
      <Route path="*" element = {<Pagenotfound/>}/>  
    </Routes>
    </>
  )
}

export default App
