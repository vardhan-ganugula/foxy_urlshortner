import React, { useEffect } from 'react'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const cookie = new Cookies();
    useEffect(() => {
        cookie.remove('userId');
        cookie.remove('token');
        navigate('/login')
    }, [])
  return (
    <div>Logout</div>
  )
}

export default Logout;