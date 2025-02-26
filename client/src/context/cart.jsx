import React, { createContext, useContext, useEffect, useState } from "react"

const CartContext = createContext();

const CartProvider = ({children})=>{ 
    const [cart,setCart] = useState([])
    useEffect(()=>{
        const cartItem = localStorage.getItem("cart");
        if(cartItem && cartItem.length>0){
            setCart(JSON.parse(cartItem))
        }
    },[])
    return(
    <CartContext.Provider value = {[cart,setCart]}>
        {children}
    </CartContext.Provider>)
}
export const useCart = () => useContext(CartContext);

export default CartProvider

