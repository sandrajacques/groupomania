import React, {useEffect, useContext} from 'react'
import{ UserContext, initialUser} from '../context/Context';
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const { setUser } = useContext(UserContext);
    let navigate = useNavigate();
    useEffect(() => {
        setUser(initialUser);
        navigate('/');
    },[]);
  return (
    <>  </>
  )
}

