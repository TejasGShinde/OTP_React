import { createContext,useState } from "react";


const cartContext = createContext();

const MyCart = ({children})=>{
     const [cart,setCart] = useState([]);

     const handleCart = (item)=>{
           setCart(prev=>[...prev,item])
     }

     return (
        <cartContext.Provider value={{ cart , handleCart }} >
            {children}
        </cartContext.Provider>
     )
}

export {cartContext,MyCart}