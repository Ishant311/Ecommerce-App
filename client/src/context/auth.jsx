import axios from 'axios';
import {useState,useContext,createContext, useEffect} from 'react'

const AuthContext = createContext();


const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    })

    axios.defaults.headers.common["Authorization"] = auth?.token;
    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("auth"));
        if(data){
            setAuth({
                ...auth,
                user:data.user,
                token:data.token
            })
        }
    },[])
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext);

export {useAuth,AuthProvider}