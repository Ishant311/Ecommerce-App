import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';

function Private() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
        const authCheck = async ()=>{
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/user-auth`,
            {
                headers:{
                    Authorization: auth?.token,
                }
            })
            if(res?.data?.ok){
                setOk(true);
            }
            else{
                setOk(false);
            }
        }
        if(auth?.token){
            authCheck();
        }
    }, [auth?.token]);

    return ok ?<Outlet/> : <Spinner/>
    
}

export default Private