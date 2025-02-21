import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

function AdminRoute() {
    const [ok, setOk] = useState(false);
    const [role,setRole] = useState(0);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async ()=>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/admin-auth`,
            {
                headers:{
                    Authorization: auth?.token,
                }
            })
            if(res.data.ok){
                setOk(true);
                setRole(1);
            }
            else{
                setOk(false);
                setRole(0);
            }
        }
        if(auth?.token){
            authCheck();
        }
    }, [auth?.token]);

    return ok && role ? <Outlet/> : <Spinner path = "/"/>
    
}

export default AdminRoute